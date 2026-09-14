import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import express from "express";
import { createGuideDownloads, GUIDE_DOWNLOAD_LIFETIME_SECONDS } from "../server/guideDownloads.js";
import { getGuideAsset } from "../server/guideAssets.js";
import { guides } from "../shared/guides.js";

const assetDirectory = join(dirname(dirname(fileURLToPath(import.meta.url))), "server", "assets", "guides");

function hash(bytes) {
    return createHash("sha256").update(bytes).digest("hex");
}

async function setup(t, overrides = {}) {
    const directory = await mkdtemp(join(tmpdir(), "corvell-download-test-"));
    t.after(() => rm(directory, { recursive: true, force: true }));
    const options = { directory, assetDirectory, ...overrides };
    const downloads = createGuideDownloads(options);
    await downloads.start();
    return { downloads, directory, options };
}

async function serve(t, downloads) {
    const app = express();
    app.use("/api/guides/download", downloads.router);
    const server = await new Promise((resolve) => {
        const instance = app.listen(0, "127.0.0.1", () => resolve(instance));
    });
    t.after(() => new Promise((resolve) => server.close(resolve)));
    const origin = `http://127.0.0.1:${server.address().port}`;

    return (url, options) => {
        const parsed = new URL(url, origin);
        return fetch(`${origin}${parsed.pathname}${parsed.search}`, options);
    };
}

test("signed downloads serve exactly the four original PDF files with private response headers", async (t) => {
    const { downloads } = await setup(t);
    const get = await serve(t, downloads);

    for (const guide of guides) {
        const url = downloads.createUrl(guide.id);
        const response = await get(url);
        const expected = await readFile(join(assetDirectory, `${guide.id}-guide.pdf`));
        const actual = Buffer.from(await response.arrayBuffer());
        assert.equal(response.status, 200);
        assert.equal(hash(actual), hash(expected));
        assert.equal(response.headers.get("content-type"), "application/pdf");
        assert.equal(response.headers.get("content-disposition"), `attachment; filename="${guide.id.toUpperCase()} guide.pdf"`);
        assert.equal(response.headers.get("cache-control"), "no-store");
        assert.equal(response.headers.get("x-content-type-options"), "nosniff");
        assert.equal(response.headers.get("referrer-policy"), "no-referrer");
        assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow, nosnippet");
        assert.equal(Number(response.headers.get("content-length")), expected.length);
    }
});

test("HEAD requests and byte ranges retain authorization and attachment semantics", async (t) => {
    const { downloads } = await setup(t);
    const get = await serve(t, downloads);
    const url = downloads.createUrl("eb-2");
    const head = await get(url, { method: "HEAD" });
    assert.equal(head.status, 200);
    assert.equal(await head.text(), "");
    assert.ok(Number(head.headers.get("content-length")) > 5);
    const range = await get(url, { headers: { Range: "bytes=0-4" } });
    assert.equal(range.status, 206);
    assert.equal(await range.text(), "%PDF-");
    assert.match(range.headers.get("content-range"), /^bytes 0-4\//);
    assert.equal(range.headers.get("cache-control"), "no-store");
    const invalidRange = await get(url, { headers: { Range: "bytes=9999999999-" } });
    assert.equal(invalidRange.status, 416);
    assert.equal(invalidRange.headers.get("content-disposition"), null);
    assert.ok((await invalidRange.text()).includes("PDF attached to your email"));
});

test("download URLs contain only allowlisted guide id, expiration and a fresh random signed token", async (t) => {
    const timestamp = Date.UTC(2026, 8, 13, 10);
    const { downloads } = await setup(t, { now: () => timestamp });
    const first = new URL(downloads.createUrl("perm"));
    const second = new URL(downloads.createUrl("perm"));
    assert.equal(first.origin, "https://corvellimmigration.com");
    assert.equal(first.pathname, "/api/guides/download/perm");
    assert.deepEqual([...first.searchParams.keys()], ["expires", "token"]);
    assert.equal(Number(first.searchParams.get("expires")), Math.floor(timestamp / 1000) + 90 * 24 * 60 * 60);
    assert.equal(GUIDE_DOWNLOAD_LIFETIME_SECONDS, 90 * 24 * 60 * 60);
    assert.match(first.searchParams.get("token"), /^v1\.[A-Za-z0-9_-]{22}\.[A-Za-z0-9_-]{43}$/);
    assert.notEqual(first.searchParams.get("token"), second.searchParams.get("token"));
    assert.equal(first.href.includes("@"), false);
    assert.equal(first.href.includes("email"), false);
    assert.equal(first.href.includes("name"), false);
    assert.throws(() => downloads.createUrl("../../.env"), { code: "GUIDE_UNAVAILABLE" });
});

test("unsigned, modified, duplicate and oversized parameters never expose a PDF", async (t) => {
    const { downloads } = await setup(t);
    const get = await serve(t, downloads);
    const valid = new URL(downloads.createUrl("eb-2"));
    const changedGuide = new URL(valid);
    changedGuide.pathname = "/api/guides/download/h-1b";
    const changedExpiry = new URL(valid);
    changedExpiry.searchParams.set("expires", String(Number(valid.searchParams.get("expires")) + 1));
    const changedSignature = new URL(valid);
    const token = valid.searchParams.get("token");
    changedSignature.searchParams.set("token", `${token.slice(0, -1)}${token.at(-1) === "A" ? "B" : "A"}`);
    const changedNonce = new URL(valid);
    changedNonce.searchParams.set("token", `${token.slice(0, 3)}${token[3] === "A" ? "B" : "A"}${token.slice(4)}`);
    const extraParameter = new URL(valid);
    extraParameter.searchParams.set("file", "../../.env");
    const duplicateToken = new URL(valid);
    duplicateToken.searchParams.append("token", token);
    const duplicateExpiry = new URL(valid);
    duplicateExpiry.searchParams.append("expires", valid.searchParams.get("expires"));
    const oversized = new URL(valid);
    oversized.searchParams.set("token", "a".repeat(2000));

    for (const url of [
        "/api/guides/download/eb-2",
        "/api/guides/download/eb-2-guide.pdf",
        "/api/guides/download/%2e%2e%2f.env",
        "/api/guides/download/%E0%A4%A",
        "/api/guides/download/",
        changedGuide,
        changedExpiry,
        changedSignature,
        changedNonce,
        extraParameter,
        duplicateToken,
        duplicateExpiry,
        oversized
    ]) {
        const response = await get(url);
        assert.equal(response.status, 403, String(url));
        assert.match(response.headers.get("content-type"), /^text\/plain/);
        assert.equal(response.headers.get("cache-control"), "no-store");
        assert.ok((await response.text()).includes("PDF attached to your email"));
    }
});

test("signed links expire after ninety days without depending on outbox records", async (t) => {
    let timestamp = Date.UTC(2026, 8, 13, 10);
    const { downloads, directory } = await setup(t, { now: () => timestamp });
    const get = await serve(t, downloads);
    const url = downloads.createUrl("h-2b");
    timestamp += (GUIDE_DOWNLOAD_LIFETIME_SECONDS - 1) * 1000;
    const valid = await get(url);
    assert.equal(valid.status, 200);
    await valid.arrayBuffer();
    assert.deepEqual(await readdir(directory), ["signing-key"]);
    timestamp += 1000;
    const expired = await get(url);
    assert.equal(expired.status, 410);
    assert.ok((await expired.text()).includes("expired"));
    assert.equal(expired.headers.get("cache-control"), "no-store");
});

test("the private signing key persists across restarts and concurrent initialization", async (t) => {
    const directory = await mkdtemp(join(tmpdir(), "corvell-download-key-test-"));
    t.after(() => rm(directory, { recursive: true, force: true }));
    const options = { directory, assetDirectory };
    const first = createGuideDownloads(options);
    const second = createGuideDownloads(options);
    await Promise.all([first.start(), first.start(), second.start()]);
    const url = first.createUrl("h-1b");
    const initialKey = await readFile(join(directory, "signing-key"));
    assert.equal(initialKey.length, 32);
    assert.deepEqual(await readdir(directory), ["signing-key"]);
    const getSecond = await serve(t, second);
    const accepted = await getSecond(url);
    assert.equal(accepted.status, 200);
    await accepted.arrayBuffer();
    const restarted = createGuideDownloads(options);
    await restarted.start();
    assert.deepEqual(await readFile(join(directory, "signing-key")), initialKey);
    const getRestarted = await serve(t, restarted);
    const afterRestart = await getRestarted(url);
    assert.equal(afterRestart.status, 200);
    await afterRestart.arrayBuffer();

    if (process.platform !== "win32") {
        assert.equal((await stat(directory)).mode & 0o777, 0o700);
        assert.equal((await stat(join(directory, "signing-key"))).mode & 0o777, 0o600);
    }
});

test("invalid canonical origins are refused while HTTPS and local loopback HTTP are supported", async (t) => {
    const { directory } = await setup(t);

    for (const siteUrl of [
        "http://corvellimmigration.com",
        "http://localhost.evil.example",
        "https://user:password@example.com",
        "https://example.com?token=value",
        "https://example.com?",
        "https://example.com#fragment",
        "https://example.com#",
        "https://example.com/subdirectory",
        "file:///tmp/file",
        "javascript:alert(1)",
        "not a URL",
        null
    ]) {
        const downloads = createGuideDownloads({ siteUrl, directory });
        await assert.rejects(downloads.start(), { code: "GUIDE_DOWNLOAD_UNAVAILABLE" });
        assert.throws(() => downloads.createUrl("eb-2"), { code: "GUIDE_DOWNLOAD_UNAVAILABLE" });
    }

    for (const siteUrl of ["https://example.com", "https://www.corvellimmigration.com/", "http://127.0.0.1:5276", "http://localhost:5276", "http://[::1]:5276"]) {
        const downloads = createGuideDownloads({ siteUrl, directory });
        await downloads.start();
        assert.equal(new URL(downloads.createUrl("eb-2")).origin, new URL(siteUrl).origin);
    }
});

test("uninitialized services and corrupt signing keys fail closed without replacing an existing key", async (t) => {
    const { directory } = await setup(t);
    const corrupt = Buffer.from("invalid key");
    await writeFile(join(directory, "signing-key"), corrupt);
    const downloads = createGuideDownloads({ directory });
    assert.throws(() => downloads.createUrl("eb-2"), { code: "GUIDE_DOWNLOAD_UNAVAILABLE" });
    const get = await serve(t, downloads);
    const unavailable = await get("/api/guides/download/eb-2");
    assert.equal(unavailable.status, 503);
    assert.ok((await unavailable.text()).includes("PDF attached to your email"));
    await assert.rejects(downloads.start(), { code: "GUIDE_DOWNLOAD_UNAVAILABLE" });
    assert.deepEqual(await readFile(join(directory, "signing-key")), corrupt);
});

test("missing assets produce safe errors and unsupported methods do not disclose files", async (t) => {
    const { downloads } = await setup(t, { assetDirectory: join(tmpdir(), "missing-corvell-pdf-assets") });
    const get = await serve(t, downloads);
    const url = downloads.createUrl("eb-2");
    const missing = await get(url);
    assert.equal(missing.status, 503);
    const message = await missing.text();
    assert.ok(message.includes("PDF attached to your email"));
    assert.equal(message.includes("ENOENT"), false);
    assert.equal(message.includes("missing-corvell-pdf-assets"), false);
    const post = await get(url, { method: "POST" });
    assert.equal(post.status, 405);
    assert.equal(post.headers.get("allow"), "GET, HEAD");
    assert.equal(post.headers.get("cache-control"), "no-store");
    await assert.rejects(getGuideAsset("../.env"), { code: "GUIDE_UNAVAILABLE" });
});
