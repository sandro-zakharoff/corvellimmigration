import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { config } from "./config.js";
import { createContactRouter } from "./contactRoute.js";
import { createMailer } from "./mailer.js";

const app = express();
const mailer = createMailer(config.smtp);
const currentDirectory = dirname(fileURLToPath(import.meta.url));
const distDirectory = join(currentDirectory, "..", "dist");

app.disable("x-powered-by");
app.set("trust proxy", "loopback");
app.use(express.json({ limit: "20kb", strict: true }));
app.get("/api/health", (request, response) => {
    response.json({ ok: true });
});
app.use("/api/contact", createContactRouter(mailer));

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

app.listen(config.port, config.host, () => {
    console.log(`Corvell server is running at http://${config.host}:${config.port}`);

    if (config.smtp.missing.length > 0) {
        console.log(`SMTP is not configured. Missing: ${config.smtp.missing.join(", ")}`);
    }
});
