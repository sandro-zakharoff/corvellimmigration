import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";
import test from "node:test";

test("server startup reports an occupied port instead of logging false success", { timeout: 15000 }, async (t) => {
    const reserved = createServer();
    await new Promise((resolve, reject) => {
        reserved.once("error", reject);
        reserved.listen({ host: "127.0.0.1", port: 0, exclusive: true }, resolve);
    });
    t.after(() => new Promise((resolve, reject) => reserved.close((error) => error ? reject(error) : resolve())));

    const port = reserved.address().port;
    const child = spawn(process.execPath, [fileURLToPath(new URL("../server/index.js", import.meta.url))], {
        cwd: fileURLToPath(new URL("..", import.meta.url)),
        env: {
            ...process.env,
            SERVER_HOST: "127.0.0.1",
            SERVER_PORT: String(port),
            SMTP_HOST: "",
            SMTP_USER: "",
            SMTP_PASS: "",
            SMTP_FROM: "",
            CONTACT_TO_EMAIL: ""
        },
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true
    });
    t.after(() => {
        if (child.exitCode === null && child.signalCode === null) {
            child.kill("SIGKILL");
        }
    });

    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });

    const result = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            child.kill("SIGKILL");
            reject(new Error("Server did not exit after failing to bind its port."));
        }, 8000);

        child.once("error", (error) => {
            clearTimeout(timeout);
            reject(error);
        });
        child.once("close", (code, signal) => {
            clearTimeout(timeout);
            resolve({ code, signal });
        });
    });

    assert.equal(result.code, 1);
    assert.equal(result.signal, null);
    assert.match(stderr, /Server could not listen/);
    assert.match(stderr, /EADDRINUSE/);
    assert.doesNotMatch(stdout, /Corvell server is running/);
    assert.doesNotMatch(stderr, /Guide outbox/);
});
