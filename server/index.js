import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { config } from "./config.js";
import { createContactRouter } from "./contactRoute.js";
import { createMailer } from "./mailer.js";
import { createGuideOutbox } from "./guideOutbox.js";
import { createGuideRouter } from "./guideRoute.js";
import { createCareersRouter } from "./careersRoute.js";
import { createGuideDownloads } from "./guideDownloads.js";

const app = express();
const guideDownloads = createGuideDownloads({ siteUrl: config.siteUrl });
const mailer = createMailer(config.smtp, undefined, { guideDownloads });
const guideOutbox = createGuideOutbox({ mailer });
const currentDirectory = dirname(fileURLToPath(import.meta.url));
const distDirectory = join(currentDirectory, "..", "dist");

app.disable("x-powered-by");
app.set("trust proxy", "loopback");
app.use(express.json({ limit: "20kb", strict: true }));
app.get("/api/health", (request, response) => {
    response.json({ ok: true });
});
app.use("/api/contact", createContactRouter(mailer));
app.use("/api/guides/download", guideDownloads.router);
app.use("/api/guides", createGuideRouter(guideOutbox));
app.use("/api/careers/date", createCareersRouter());

if (existsSync(distDirectory)) {
    app.use(express.static(distDirectory));
    app.get(/^(?!\/api(?:\/|$)).*/, (request, response) => {
        response.sendFile(join(distDirectory, "index.html"));
    });
}

app.use((error, request, response, next) => {
    if (error instanceof SyntaxError && error.status === 400) {
        response.status(400).json({
            ok: false,
            code: "INVALID_JSON"
        });
        return;
    }

    next(error);
});

let outboxStartup = Promise.resolve();
const server = app.listen(config.port, config.host, (error) => {
    if (error) {
        console.error("Server could not listen", { code: error.code, host: config.host, port: config.port });
        process.exitCode = 1;
        return;
    }

    outboxStartup = guideDownloads.start().catch(() => {
        console.error("Guide downloads are unavailable. Check SITE_URL and var directory write permissions.");
    }).then(() => guideOutbox.start()).catch(() => {
        console.error("Guide outbox is unavailable. Check the var directory and service write permissions.");
    });
    console.log(`Corvell server is running at http://${config.host}:${config.port}`);

    if (config.smtp.missing.length > 0) {
        console.log(`SMTP is not configured. Missing: ${config.smtp.missing.join(", ")}`);
    }
});

let stopping = false;

async function shutdown() {
    if (stopping) return;
    stopping = true;
    const timeout = setTimeout(() => process.exit(1), 55000);
    timeout.unref();

    try {
        await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
        await outboxStartup;
        await guideOutbox.stop();
        clearTimeout(timeout);
    } catch {
        console.error("Server shutdown did not complete cleanly");
        process.exitCode = 1;
    }
}

process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
