import { createHash, randomUUID } from "node:crypto";
import { chmod, mkdir, open, readFile, readdir, rename, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getGuide } from "../shared/guides.js";
import { validateGuideRequest } from "../shared/guideValidation.js";
import { getGuideAsset } from "./guideAssets.js";

const rootDirectory = dirname(dirname(fileURLToPath(import.meta.url)));
const hour = 60 * 60 * 1000;
const retention = 7 * 24 * hour;
const retryDelays = [60000, 300000, 900000, hour, 6 * hour, 24 * hour];
const jobFilename = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.json$/;
const temporaryFilename = /^[0-9a-f-]{36}\.[0-9a-f-]{36}\.tmp$/;

export class GuideRequestError extends Error {
    constructor(code, status = 503) {
        super(code);
        this.code = code;
        this.status = status;
    }
}

function hash(value) {
    return createHash("sha256").update(value).digest("hex");
}

function deliveryState(timestamp) {
    return { status: "pending", attempts: 0, nextAttemptAt: timestamp };
}

function safeError(error) {
    const knownCodes = ["EAUTH", "ECONNECTION", "ECONNRESET", "ECONNREFUSED", "ETIMEDOUT", "ETLS", "ESOCKET", "EENVELOPE", "EMESSAGE", "EDNS", "ENOENT", "EACCES", "GUIDE_UNAVAILABLE", "GUIDE_DOWNLOAD_UNAVAILABLE"];
    return {
        code: knownCodes.includes(error.code) ? error.code : "DELIVERY_ERROR",
        responseCode: Number.isInteger(error.responseCode) ? error.responseCode : undefined
    };
}

export function createGuideOutbox({
    mailer,
    directory = join(rootDirectory, "var", "guide-requests"),
    assetDirectory = join(rootDirectory, "server", "assets", "guides"),
    now = Date.now,
    logger = console,
    autoProcess = true,
    recipientLimit = 4,
    maxJobs = 2000
} = {}) {
    const jobs = new Map();
    const pendingWrites = new Set();
    let ready = false;
    let timer;
    let processing;
    let enqueuing = Promise.resolve();

    async function persist(job) {
        const temporary = join(directory, `${job.id}.${randomUUID()}.tmp`);

        if (jobs.has(job.id)) {
            pendingWrites.add(job.id);
        }

        try {
            const handle = await open(temporary, "wx", 0o600);
            try {
                await handle.writeFile(JSON.stringify(job));
                await handle.sync();
            } finally {
                await handle.close();
            }

            await rename(temporary, join(directory, `${job.id}.json`));

            if (process.platform !== "win32") {
                const folder = await open(directory, "r");
                try {
                    await folder.sync();
                } finally {
                    await folder.close();
                }
            }

            pendingWrites.delete(job.id);
        } catch (error) {
            await unlink(temporary).catch(() => {});
            throw error;
        }
    }

    async function getAttachment(guideId) {
        try {
            return (await getGuideAsset(guideId, { directory: assetDirectory })).path;
        } catch {
            throw new GuideRequestError("GUIDE_UNAVAILABLE");
        }
    }

    async function cleanup() {
        for (const [id, job] of jobs) {
            if (!job.finishedAt && now() - job.createdAt >= retention) {
                for (const state of Object.values(job.deliveries)) {
                    if (state.status === "pending") {
                        state.status = "failed";
                        state.error = { code: "DELIVERY_EXPIRED" };
                    }
                }

                job.status = "failed";
                job.finishedAt = now();
                delete job.data;
                await persist(job);
                logger.error("Guide request expired before all messages were delivered", { requestId: job.id });
            }

            if (job.finishedAt && now() - job.finishedAt >= retention) {
                await unlink(join(directory, `${id}.json`));
                jobs.delete(id);
            }
        }
    }

    async function deliver(job) {
        for (const kind of ["administrator", "client"]) {
            const state = job.deliveries[kind];

            if (state.status !== "pending" || state.nextAttemptAt > now()) {
                continue;
            }

            if (now() - job.createdAt >= retention) {
                state.status = "failed";
                state.error = { code: "DELIVERY_EXPIRED" };
                await persist(job);
                continue;
            }

            state.attempts += 1;
            state.nextAttemptAt = now() + retryDelays[Math.min(state.attempts - 1, retryDelays.length - 1)];
            await persist(job);

            try {
                const guide = getGuide(job.guideId);
                const messageId = `<guide-${job.id}-${kind}@corvellimmigration.com>`;

                if (kind === "administrator") {
                    await mailer.sendGuideAdministratorMessage(job.data, guide, messageId);
                } else {
                    const attachment = await getAttachment(job.guideId);
                    await mailer.sendGuideClientMessage(job.data, guide, attachment, messageId);
                }

                state.status = "sent";
                state.sentAt = now();
                delete state.error;
            } catch (error) {
                state.error = safeError(error);
                const permanent = error.responseCode >= 500 && error.code !== "EAUTH";

                if (permanent || state.attempts >= 10) {
                    state.status = "failed";
                }

                logger.error("Guide mail delivery failed", { requestId: job.id, delivery: kind, ...state.error });
            }

            await persist(job);
        }

        const states = Object.values(job.deliveries);

        if (states.every((state) => state.status !== "pending")) {
            job.finishedAt = now();
            job.status = states.every((state) => state.status === "sent") ? "sent" : "failed";
            delete job.data;
            await persist(job);
        }
    }

    function processPending() {
        if (processing) {
            return processing;
        }

        processing = (async () => {
            if (!ready) {
                return;
            }

            for (const id of pendingWrites) {
                await persist(jobs.get(id));
            }

            await cleanup();

            if (!mailer) {
                return;
            }

            for (const job of jobs.values()) {
                if (!job.finishedAt) {
                    await deliver(job);
                }
            }
        })().finally(() => {
            processing = undefined;
        });

        return processing;
    }

    function schedule() {
        processPending().catch(() => logger.error("Guide outbox processing failed"));
    }

    async function enqueueValidated(values) {
        if (!mailer) {
            throw new GuideRequestError("MAIL_SERVICE_UNAVAILABLE");
        }

        if (!ready) {
            throw new GuideRequestError("QUEUE_UNAVAILABLE");
        }

        const validation = validateGuideRequest(values);

        if (!validation.isValid || validation.data.website) {
            throw new GuideRequestError("VALIDATION_ERROR", 400);
        }

        const { requestId, guideId, website, ...data } = validation.data;
        const digest = hash(JSON.stringify({ guideId, ...data }));
        const existing = jobs.get(requestId);

        if (existing) {
            if (existing.digest !== digest) {
                throw new GuideRequestError("REQUEST_CONFLICT", 409);
            }

            if (existing.status === "failed") {
                throw new GuideRequestError("MAIL_DELIVERY_FAILED");
            }

            return { status: existing.status };
        }

        await getAttachment(guideId);
        const recipientHash = hash(data.workEmail);
        const recent = [...jobs.values()].filter((job) => job.recipientHash === recipientHash && now() - job.createdAt < hour);

        if (recent.length >= recipientLimit) {
            throw new GuideRequestError("RATE_LIMITED", 429);
        }

        if (jobs.size >= maxJobs) {
            throw new GuideRequestError("QUEUE_UNAVAILABLE");
        }

        const timestamp = now();
        const job = {
            id: requestId,
            guideId,
            digest,
            recipientHash,
            data,
            status: "queued",
            createdAt: timestamp,
            deliveries: {
                administrator: deliveryState(timestamp),
                client: deliveryState(timestamp)
            }
        };

        await persist(job);
        jobs.set(job.id, job);

        if (autoProcess) {
            schedule();
        }

        return { status: "queued" };
    }

    return {
        async start() {
            if (ready) {
                return;
            }

            await mkdir(directory, { recursive: true, mode: 0o700 });
            await chmod(directory, 0o700);

            for (const filename of await readdir(directory)) {
                if (temporaryFilename.test(filename)) {
                    await unlink(join(directory, filename));
                    continue;
                }

                if (!jobFilename.test(filename)) {
                    continue;
                }

                const job = JSON.parse(await readFile(join(directory, filename), "utf8"));

                if (`${job.id}.json` !== filename || !getGuide(job.guideId) || !job.deliveries?.administrator || !job.deliveries?.client) {
                    throw new GuideRequestError("QUEUE_UNAVAILABLE");
                }

                jobs.set(job.id, job);
            }

            ready = true;

            if (autoProcess) {
                timer = setInterval(schedule, 20000);
                timer.unref();
                schedule();
            }
        },
        async stop() {
            clearInterval(timer);
            await enqueuing.catch(() => {});
            await processing;
            ready = false;
        },
        enqueue(values) {
            const pending = enqueuing.then(() => enqueueValidated(values));
            enqueuing = pending.catch(() => {});
            return pending;
        },
        processPending
    };
}
