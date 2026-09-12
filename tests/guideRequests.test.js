import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import express from "express";
import nodemailer from "nodemailer";
import { guides, getGuide } from "../shared/guides.js";
import { validateGuideRequest } from "../shared/guideValidation.js";
import { createGuideOutbox } from "../server/guideOutbox.js";
import { createGuideRouter } from "../server/guideRoute.js";
import { createMailer } from "../server/mailer.js";
import { createGuideDownloads } from "../server/guideDownloads.js";
import { guideEmailContent, guideEmailCopy } from "../server/emails/guideContent.js";
import { contactDetails } from "../shared/company.js";

const realAssetDirectory = join(dirname(dirname(fileURLToPath(import.meta.url))), "server", "assets", "guides");

function downloadHref(html) {
    const href = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]).find((value) => value.includes("/api/guides/download/"));
    assert.ok(href, "The HTML email must contain a guide download link");
    return href.replaceAll("&amp;", "&");
}

function mimeHtml(mime) {
    const part = mime.match(/Content-Type: text\/html[^\r\n]*\r?\n([\s\S]*?)\r?\n\r?\n([\s\S]*?)(?=\r?\n--)/);
    assert.ok(part, "The MIME message must include an HTML alternative");
    assert.match(part[1], /Content-Transfer-Encoding: quoted-printable/);
    return part[2].replace(/=\r?\n/g, "").replace(/=([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)));
}

function mimePdf(mime) {
    const attachment = mime.match(/Content-Type: application\/pdf[^\r\n]*\r?\n[\s\S]*?Content-Transfer-Encoding: base64[\s\S]*?\r?\n\r?\n([\s\S]*?)(?=\r?\n--)/);
    assert.ok(attachment, "The MIME message must contain a PDF attachment");
    return Buffer.from(attachment[1].replace(/\s/g, ""), "base64");
}

function hash(bytes) {
    return createHash("sha256").update(bytes).digest("hex");
}

function request(overrides = {}) {
    return {
        requestId: randomUUID(),
        guideId: "eb-2",
        fullName: "Jane Smith",
        jobTitle: "HR Director",
        company: "Example Company",
        workEmail: "jane@example.com",
        website: "",
        ...overrides
    };
}

async function setup(t, overrides = {}) {
    const directory = await mkdtemp(join(tmpdir(), "corvell-guide-test-"));
    const assetDirectory = join(directory, "assets");
    const queueDirectory = join(directory, "queue");
    const delivered = [];
    const failures = [];
    await mkdir(assetDirectory);

    for (const guide of guides) {
        await writeFile(join(assetDirectory, `${guide.id}-guide.pdf`), `%PDF-1.7\n${guide.id}\n%%EOF`);
    }

    const options = {
        directory: queueDirectory,
        assetDirectory,
        autoProcess: false,
        logger: { error: (...values) => failures.push(values) },
        mailer: {
            sendGuideAdministratorMessage: async (...values) => delivered.push(["administrator", ...values]),
            sendGuideClientMessage: async (...values) => delivered.push(["client", ...values])
        },
        ...overrides
    };
    const outbox = createGuideOutbox(options);
    await outbox.start();
    t.after(async () => {
        await outbox.stop();
        await rm(directory, { recursive: true, force: true });
    });

    return {
        outbox,
        options,
        delivered,
        failures,
        assetDirectory,
        queueDirectory,
        readJob: async (id) => JSON.parse(await readFile(join(queueDirectory, `${id}.json`), "utf8"))
    };
}

test("guide validation normalizes manager fields and allows only known guides", () => {
    const result = validateGuideRequest(request({
        fullName: "  Jane   Smith ",
        workEmail: " JANE@EXAMPLE.COM ",
        company: " Example   Company "
    }));
    assert.equal(result.isValid, true);
    assert.equal(result.data.fullName, "Jane Smith");
    assert.equal(result.data.workEmail, "jane@example.com");
    assert.equal(result.data.company, "Example Company");
    assert.deepEqual(guides.map((guide) => guide.id), ["eb-2", "perm", "h-1b", "h-2b"]);
    assert.equal(getGuide("../../.env"), undefined);
    assert.equal(validateGuideRequest(request({ guideId: "../../.env" })).isValid, false);
});

test("guide validation rejects malformed bodies, multiple addresses and header injection", () => {
    for (const values of [undefined, null, [], "text", 2]) {
        assert.equal(validateGuideRequest(values).isValid, false);
    }

    for (const workEmail of ["jane@example.com,other@example.com", "Jane <jane@example.com>", "jane@example.com;other@example.com", "jane@example.com\r\nBcc: other@example.com", "jane@example.com\n", "jane@-example.com", ["jane@example.com"], {}, "a".repeat(65) + "@example.com"]) {
        assert.equal(validateGuideRequest(request({ workEmail })).isValid, false);
    }

    for (const field of ["fullName", "jobTitle", "company"]) {
        assert.equal(validateGuideRequest(request({ [field]: "Jane\r\nBcc: victim@example.com" })).isValid, false);
        assert.equal(validateGuideRequest(request({ [field]: {} })).isValid, false);
    }

    assert.equal(validateGuideRequest(request({ requestId: "../../file" })).isValid, false);
    assert.equal(validateGuideRequest(request({ website: "bot" })).data.website, "bot");
});

test("guide requests are persisted before acknowledgement and completed records contain no customer fields", async (t) => {
    const { outbox, delivered, readJob } = await setup(t);
    const data = request();
    assert.deepEqual(await outbox.enqueue(data), { status: "queued" });
    assert.equal(delivered.length, 0);
    assert.equal((await readJob(data.requestId)).data.workEmail, data.workEmail);
    await outbox.processPending();
    assert.equal(delivered.length, 2);
    assert.equal(delivered[0][0], "administrator");
    assert.equal(delivered[1][0], "client");
    const completed = await readJob(data.requestId);
    assert.equal(completed.status, "sent");
    assert.equal(completed.data, undefined);
    const serialized = JSON.stringify(completed);
    assert.equal(serialized.includes(data.workEmail), false);
    assert.equal(serialized.includes(data.fullName), false);
    assert.deepEqual(await outbox.enqueue(data), { status: "sent" });
    await outbox.processPending();
    assert.equal(delivered.length, 2);
});

test("request identifiers deduplicate concurrent submissions and reject different payloads", async (t) => {
    const { outbox, queueDirectory } = await setup(t);
    const data = request();
    await Promise.all([outbox.enqueue(data), outbox.enqueue(data), outbox.enqueue(data)]);
    assert.equal((await readdir(queueDirectory)).length, 1);
    await assert.rejects(outbox.enqueue({ ...data, guideId: "perm" }), { code: "REQUEST_CONFLICT", status: 409 });
});

test("partial SMTP failure retries only the unfinished delivery after a restart", async (t) => {
    let timestamp = Date.UTC(2026, 8, 12);
    let administratorAttempts = 0;
    let clientAttempts = 0;
    const { outbox, options, readJob, failures } = await setup(t, {
        now: () => timestamp,
        mailer: {
            async sendGuideAdministratorMessage() {
                administratorAttempts += 1;
                if (administratorAttempts === 1) {
                    throw Object.assign(new Error("secret jane@example.com"), { code: "ETIMEDOUT" });
                }
            },
            async sendGuideClientMessage() {
                clientAttempts += 1;
            }
        }
    });
    const data = request();
    await outbox.enqueue(data);
    await outbox.processPending();
    assert.equal(administratorAttempts, 1);
    assert.equal(clientAttempts, 1);
    assert.equal((await readJob(data.requestId)).deliveries.client.status, "sent");
    await outbox.processPending();
    assert.equal(administratorAttempts, 1);
    await outbox.stop();
    timestamp += 61000;
    const resumed = createGuideOutbox(options);
    await resumed.start();
    t.after(() => resumed.stop());
    await resumed.processPending();
    assert.equal(administratorAttempts, 2);
    assert.equal(clientAttempts, 1);
    assert.equal((await readJob(data.requestId)).status, "sent");
    assert.equal(JSON.stringify(failures).includes("secret"), false);
    assert.equal(JSON.stringify(failures).includes("jane@example.com"), false);
});

test("permanent SMTP rejection does not retry forever and redacts terminal records", async (t) => {
    let clientAttempts = 0;
    const { outbox, readJob } = await setup(t, {
        mailer: {
            async sendGuideAdministratorMessage() {},
            async sendGuideClientMessage() {
                clientAttempts += 1;
                throw Object.assign(new Error("Recipient rejected"), { code: "EENVELOPE", responseCode: 550 });
            }
        }
    });
    const data = request();
    await outbox.enqueue(data);
    await outbox.processPending();
    await outbox.processPending();
    const job = await readJob(data.requestId);
    assert.equal(clientAttempts, 1);
    assert.equal(job.status, "failed");
    assert.equal(job.data, undefined);
    assert.equal(job.deliveries.administrator.status, "sent");
    await assert.rejects(outbox.enqueue(data), { code: "MAIL_DELIVERY_FAILED" });
});

test("a temporary client delivery error preserves the administrator delivery and message identifier", async (t) => {
    let timestamp = Date.UTC(2026, 8, 12);
    let administratorAttempts = 0;
    const messageIds = [];
    const { outbox, readJob } = await setup(t, {
        now: () => timestamp,
        mailer: {
            async sendGuideAdministratorMessage() {
                administratorAttempts += 1;
            },
            async sendGuideClientMessage(data, guide, attachment, messageId) {
                messageIds.push(messageId);
                if (messageIds.length === 1) {
                    throw Object.assign(new Error("Try later"), { responseCode: 451 });
                }
            }
        }
    });
    const data = request();
    await outbox.enqueue(data);
    await outbox.processPending();
    assert.equal((await readJob(data.requestId)).deliveries.administrator.status, "sent");
    timestamp += 61000;
    await outbox.processPending();
    assert.equal(administratorAttempts, 1);
    assert.equal(messageIds.length, 2);
    assert.equal(messageIds[0], messageIds[1]);
    assert.equal((await readJob(data.requestId)).status, "sent");
});

test("SMTP and attachment availability are checked before queueing", async (t) => {
    const missingMailer = await setup(t, { mailer: null });
    await assert.rejects(missingMailer.outbox.enqueue(request()), { code: "MAIL_SERVICE_UNAVAILABLE" });
    assert.deepEqual(await readdir(missingMailer.queueDirectory), []);
    const missingAsset = await setup(t);
    await rm(join(missingAsset.assetDirectory, "eb-2-guide.pdf"));
    await assert.rejects(missingAsset.outbox.enqueue(request()), { code: "GUIDE_UNAVAILABLE" });
    await writeFile(join(missingAsset.assetDirectory, "eb-2-guide.pdf"), "not a PDF");
    await assert.rejects(missingAsset.outbox.enqueue(request()), { code: "GUIDE_UNAVAILABLE" });
    assert.deepEqual(await readdir(missingAsset.queueDirectory), []);
});

test("recipient throttling survives restart, allows different recipients and expires", async (t) => {
    let timestamp = Date.UTC(2026, 8, 12);
    const { outbox, options } = await setup(t, { recipientLimit: 2, now: () => timestamp });
    await outbox.enqueue(request());
    await outbox.enqueue(request({ guideId: "perm" }));
    await assert.rejects(outbox.enqueue(request({ guideId: "h-1b" })), { code: "RATE_LIMITED", status: 429 });
    await outbox.stop();
    const resumed = createGuideOutbox(options);
    await resumed.start();
    t.after(() => resumed.stop());
    await assert.rejects(resumed.enqueue(request()), { code: "RATE_LIMITED" });
    await resumed.enqueue(request({ workEmail: "other@example.com" }));
    timestamp += 3600001;
    await resumed.enqueue(request());
});

test("completed metadata expires and queue size stays bounded", async (t) => {
    let timestamp = Date.UTC(2026, 8, 12);
    const { outbox, queueDirectory } = await setup(t, { maxJobs: 1, now: () => timestamp });
    await outbox.enqueue(request());
    await assert.rejects(outbox.enqueue(request({ workEmail: "other@example.com" })), { code: "QUEUE_UNAVAILABLE" });
    await outbox.processPending();
    timestamp += 7 * 24 * 3600000 + 1;
    await outbox.processPending();
    assert.deepEqual(await readdir(queueDirectory), []);
    await outbox.enqueue(request());
});

test("pending customer data expires even if SMTP is removed before a restart", async (t) => {
    let timestamp = Date.UTC(2026, 8, 12);
    const { outbox, options, readJob, queueDirectory } = await setup(t, { now: () => timestamp });
    const data = request();
    await outbox.enqueue(data);
    await outbox.stop();
    const abandoned = `${randomUUID()}.${randomUUID()}.tmp`;
    await writeFile(join(queueDirectory, abandoned), JSON.stringify({ data }));
    timestamp += 7 * 24 * 3600000 + 1;
    const resumed = createGuideOutbox({ ...options, mailer: null });
    await resumed.start();
    t.after(() => resumed.stop());
    await resumed.processPending();
    const job = await readJob(data.requestId);
    assert.equal(job.status, "failed");
    assert.equal(job.data, undefined);
    assert.equal(job.deliveries.client.error.code, "DELIVERY_EXPIRED");
    assert.equal((await readdir(queueDirectory)).includes(abandoned), false);
});

test("each guide sends a separate administrator message and exactly its own PDF to the client", async (t) => {
    const { assetDirectory, queueDirectory } = await setup(t);
    const messages = [];
    const smtp = { missing: [], from: "Corvell <sender@example.com>", recipient: "admin@example.com" };
    const guideDownloads = createGuideDownloads({ directory: join(queueDirectory, "downloads"), assetDirectory });
    await guideDownloads.start();
    const mailer = createMailer(smtp, { sendMail: async (message) => messages.push(message) }, { guideDownloads });
    const data = request({ fullName: "Jane <script>", company: "Example & Company" });

    for (const guide of guides) {
        const attachmentPath = join(assetDirectory, `${guide.id}-guide.pdf`);
        await mailer.sendGuideAdministratorMessage(data, guide, "<admin@test>");
        await mailer.sendGuideClientMessage(data, guide, attachmentPath, "<client@test>");
        const client = messages.at(-1);
        const administrator = messages.at(-2);
        assert.equal(administrator.to, "admin@example.com");
        assert.equal(administrator.replyTo, data.workEmail);
        assert.equal(administrator.attachments, undefined);
        assert.ok(administrator.text.includes(data.jobTitle));
        assert.ok(administrator.text.includes(guide.title));
        assert.ok(administrator.html.includes("Jane &lt;script&gt;"));
        assert.ok(administrator.html.includes("Example &amp; Company"));
        assert.deepEqual(client.to, { address: data.workEmail });
        assert.equal(client.subject, guideEmailContent[guide.id].subject);
        assert.ok(client.text.includes(guideEmailContent[guide.id].heading));
        assert.ok(client.text.includes("Hi Jane,"));
        assert.ok(client.text.includes(guideEmailCopy.downloadLabel));
        assert.ok(client.text.includes(guideEmailCopy.disclaimer));
        assert.ok(client.html.includes(guideEmailContent[guide.id].heading));
        assert.ok(client.html.includes("Hi Jane,"));
        assert.equal(client.html.includes("<script>"), false);
        assert.equal(client.replyTo, contactDetails.email);
        assert.ok(client.html.includes(contactDetails.email));
        assert.ok(client.text.includes(contactDetails.phone));
        const url = new URL(downloadHref(client.html));
        assert.equal(url.pathname, `/api/guides/download/${guide.id}`);
        assert.equal(url.protocol, "https:");
        assert.ok(client.text.includes(url.href));
        assert.equal(client.html.includes("admin@example.com"), false);
        assert.equal(client.text.includes(data.company), false);
        assert.equal(client.text.includes(data.jobTitle), false);
        assert.equal(client.cc, undefined);
        assert.equal(client.bcc, undefined);
        assert.equal(client.attachments.length, 1);
        assert.equal(client.attachments[0].path, attachmentPath);
        assert.equal(client.attachments[0].contentType, "application/pdf");
    }

    const transport = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: "unix" });
    let mime;
    const streamedMailer = createMailer(smtp, { sendMail: async (message) => { mime = (await transport.sendMail(message)).message.toString(); } }, { guideDownloads });
    await streamedMailer.sendGuideClientMessage(data, guides[0], join(assetDirectory, "eb-2-guide.pdf"), "<client@test>");
    assert.match(mime, /Content-Type: application\/pdf/);
    assert.match(mime, /Content-Type: text\/plain/);
    assert.match(mime, /Content-Type: text\/html/);
    assert.match(mime, /Content-Type: multipart\/alternative/);
    assert.equal(new URL(downloadHref(mimeHtml(mime))).pathname, "/api/guides/download/eb-2");
    assert.deepEqual(mimePdf(mime), Buffer.from("%PDF-1.7\neb-2\n%%EOF"));
    assert.equal(mime.includes("admin@example.com"), false);
});

test("client mail fails closed without a ready download service and never sends a broken button", async (t) => {
    const { assetDirectory, queueDirectory } = await setup(t);
    const sent = [];
    const smtp = { missing: [], from: "sender@example.com", recipient: "admin@example.com" };
    const transporter = { sendMail: async (message) => sent.push(message) };
    const missing = createMailer(smtp, transporter);
    await assert.rejects(missing.sendGuideClientMessage(request(), guides[0], join(assetDirectory, "eb-2-guide.pdf"), "<missing@test>"), { code: "GUIDE_DOWNLOAD_UNAVAILABLE" });
    const guideDownloads = createGuideDownloads({ directory: join(queueDirectory, "downloads"), assetDirectory });
    const notStarted = createMailer(smtp, transporter, { guideDownloads });
    await assert.rejects(notStarted.sendGuideClientMessage(request(), guides[0], join(assetDirectory, "eb-2-guide.pdf"), "<not-started@test>"), { code: "GUIDE_DOWNLOAD_UNAVAILABLE" });
    assert.deepEqual(sent, []);
});

test("download service recovery retries only the queued client email", async (t) => {
    let timestamp = Date.UTC(2026, 8, 13);
    const directory = await mkdtemp(join(tmpdir(), "corvell-guide-recovery-test-"));
    t.after(() => rm(directory, { recursive: true, force: true }));
    const guideDownloads = createGuideDownloads({ directory: join(directory, "downloads"), now: () => timestamp });
    const messages = [];
    const mailer = createMailer({ missing: [], from: "sender@example.com", recipient: "admin@example.com" }, {
        sendMail: async (message) => messages.push(message)
    }, { guideDownloads });
    const { outbox, readJob } = await setup(t, { mailer, now: () => timestamp });
    const data = request();
    await outbox.enqueue(data);
    await outbox.processPending();
    const waiting = await readJob(data.requestId);
    assert.equal(waiting.deliveries.administrator.status, "sent");
    assert.equal(waiting.deliveries.client.status, "pending");
    assert.equal(messages.length, 1);
    assert.equal(messages[0].to, "admin@example.com");
    await guideDownloads.start();
    timestamp += 61000;
    await outbox.processPending();
    const completed = await readJob(data.requestId);
    assert.equal(completed.status, "sent");
    assert.equal(completed.data, undefined);
    assert.equal(messages.length, 2);
    assert.deepEqual(messages[1].to, { address: data.workEmail });
    assert.equal(messages[1].messageId, `<guide-${data.requestId}-client@corvellimmigration.com>`);
    assert.equal(new URL(downloadHref(messages[1].html)).pathname, "/api/guides/download/eb-2");
    await outbox.processPending();
    assert.equal(messages.length, 2);
});

test("a real guide request produces MIME with a functioning signed button and the identical attached PDF", async (t) => {
    let timestamp = Date.now();
    const directory = await mkdtemp(join(tmpdir(), "corvell-guide-mail-integration-"));
    t.after(() => rm(directory, { recursive: true, force: true }));
    const guideDownloads = createGuideDownloads({ directory: join(directory, "downloads"), now: () => timestamp });
    await guideDownloads.start();
    const messages = [];
    const transport = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: "unix" });
    const mailer = createMailer({ missing: [], from: "sender@example.com", recipient: "admin@example.com" }, {
        async sendMail(message) {
            const result = await transport.sendMail(message);
            messages.push({ message, mime: result.message.toString() });
            return result;
        }
    }, { guideDownloads });
    const outbox = createGuideOutbox({
        mailer,
        directory: join(directory, "outbox"),
        autoProcess: false,
        now: () => timestamp,
        logger: { error() {} }
    });
    await outbox.start();
    t.after(() => outbox.stop());
    const app = express();
    app.use(express.json());
    app.use("/api/guides/download", guideDownloads.router);
    app.use("/api/guides", createGuideRouter(outbox));
    const server = await new Promise((resolve) => {
        const instance = app.listen(0, "127.0.0.1", () => resolve(instance));
    });
    t.after(() => new Promise((resolve) => server.close(resolve)));
    const origin = `http://127.0.0.1:${server.address().port}`;
    const downloadUrls = [];

    for (const guide of guides) {
        const data = request({ guideId: guide.id });
        const accepted = await fetch(`${origin}/api/guides`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        assert.equal(accepted.status, 202);
        assert.deepEqual(await accepted.json(), { ok: true, status: "queued" });
        await outbox.processPending();
        const administrator = messages.at(-2);
        const client = messages.at(-1);
        assert.equal(administrator.message.to, "admin@example.com");
        assert.deepEqual(client.message.to, { address: data.workEmail });
        const url = new URL(downloadHref(mimeHtml(client.mime)));
        downloadUrls.push(url);
        assert.equal(url.href, downloadHref(client.message.html));
        assert.equal(url.pathname, `/api/guides/download/${guide.id}`);
        assert.equal(url.origin, "https://corvellimmigration.com");
        const downloaded = await fetch(`${origin}${url.pathname}${url.search}`);
        assert.equal(downloaded.status, 200);
        const downloadedBytes = Buffer.from(await downloaded.arrayBuffer());
        const originalBytes = await readFile(join(realAssetDirectory, `${guide.id}-guide.pdf`));
        assert.equal(hash(downloadedBytes), hash(originalBytes));
        assert.equal(hash(mimePdf(client.mime)), hash(originalBytes));
        assert.equal(client.message.attachments.length, 1);
        assert.equal(client.mime.includes("admin@example.com"), false);
    }

    assert.equal(messages.length, 8);
    timestamp += 8 * 24 * 3600000;
    await outbox.processPending();
    assert.deepEqual(await readdir(join(directory, "outbox")), []);

    for (const url of downloadUrls) {
        const stillAvailable = await fetch(`${origin}${url.pathname}${url.search}`);
        assert.equal(stillAvailable.status, 200);
        await stillAvailable.arrayBuffer();
    }
});

async function httpServer(t, outbox, options) {
    const app = express();
    app.use(express.json());
    app.use("/api/guides", createGuideRouter(outbox, options));
    const server = await new Promise((resolve) => {
        const instance = app.listen(0, "127.0.0.1", () => resolve(instance));
    });
    t.after(() => new Promise((resolve) => server.close(resolve)));
    const endpoint = `http://127.0.0.1:${server.address().port}/api/guides`;
    return (body) => fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
}

test("guide endpoint returns validated queued states, idempotency conflicts and honeypot acknowledgements", async (t) => {
    const { outbox, queueDirectory } = await setup(t);
    const post = await httpServer(t, outbox);
    const invalid = await post({});
    assert.equal(invalid.status, 400);
    assert.equal((await invalid.json()).code, "VALIDATION_ERROR");
    const bot = await post({ website: "https://spam.example" });
    assert.equal(bot.status, 202);
    assert.deepEqual(await readdir(queueDirectory), []);
    const data = request();
    const accepted = await post(data);
    assert.equal(accepted.status, 202);
    assert.equal(accepted.headers.get("cache-control"), "no-store");
    assert.deepEqual(await accepted.json(), { ok: true, status: "queued" });
    const conflict = await post({ ...data, company: "Different Company" });
    assert.equal(conflict.status, 409);
    assert.equal((await conflict.json()).code, "REQUEST_CONFLICT");
});

test("guide endpoint limits repeated IP requests and reports unavailable SMTP", async (t) => {
    const { outbox } = await setup(t, { mailer: null });
    const post = await httpServer(t, outbox, { requestLimit: 1 });
    const unavailable = await post(request());
    assert.equal(unavailable.status, 503);
    assert.equal((await unavailable.json()).code, "MAIL_SERVICE_UNAVAILABLE");
    const limited = await post(request());
    assert.equal(limited.status, 429);
    assert.equal((await limited.json()).code, "RATE_LIMITED");
});
