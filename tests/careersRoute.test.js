import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import express from "express";
import { createCareersRouter } from "../server/careersRoute.js";

test("careers endpoint responds from server time and never caches an obsolete date", async () => {
    let now = "2026-09-26T23:59:59.999Z";
    const app = express();
    app.use("/api/careers/date", createCareersRouter({ now: () => new Date(now) }));
    const server = app.listen(0, "127.0.0.1");
    await once(server, "listening");
    const url = `http://127.0.0.1:${server.address().port}/api/careers/date`;

    try {
        const before = await fetch(url);
        assert.equal(before.status, 200);
        assert.equal(before.headers.get("cache-control"), "no-store");
        assert.deepEqual(await before.json(), {
            updatedAt: "2026-09-12",
            nextUpdateAt: "2026-09-27T00:00:00.000Z",
            serverTime: now
        });

        now = "2026-09-27T00:00:00.000Z";
        const after = await fetch(url);
        assert.deepEqual(await after.json(), {
            updatedAt: "2026-09-27",
            nextUpdateAt: "2026-10-12T00:00:00.000Z",
            serverTime: now
        });
    } finally {
        server.closeAllConnections();
        await new Promise((resolve) => server.close(resolve));
    }
});
