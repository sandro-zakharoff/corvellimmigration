import assert from "node:assert/strict";
import test from "node:test";
import { FormRequestError, postForm } from "./formRequest.js";

test("form requests send JSON with an abort signal", async (t) => {
    const controller = new AbortController();
    t.mock.method(globalThis, "fetch", async (url, options) => {
        assert.equal(url, "/api/example");
        assert.equal(options.method, "POST");
        assert.equal(options.headers["Content-Type"], "application/json");
        assert.equal(options.body, JSON.stringify({ company: "Example" }));
        assert.ok(options.signal instanceof AbortSignal);
        assert.equal(options.signal.aborted, false);
        return new Response(JSON.stringify({ ok: true, status: "queued" }));
    });

    assert.deepEqual(await postForm("/api/example", { company: "Example" }, { signal: controller.signal }), { ok: true, status: "queued" });
});

test("form requests expose structured validation errors", async (t) => {
    t.mock.method(globalThis, "fetch", async () => new Response(JSON.stringify({ ok: false, code: "VALIDATION_ERROR", fields: { workEmail: "invalid" } }), { status: 400 }));

    await assert.rejects(postForm("/api/example", {}), (error) => {
        assert.ok(error instanceof FormRequestError);
        assert.equal(error.code, "VALIDATION_ERROR");
        assert.deepEqual(error.fields, { workEmail: "invalid" });
        return true;
    });
});

test("form requests never treat HTML or malformed success responses as sent", async (t) => {
    const fetch = t.mock.method(globalThis, "fetch", async () => new Response("<html>Unavailable</html>"));
    await assert.rejects(postForm("/api/example", {}), { code: "REQUEST_FAILED" });
    fetch.mock.mockImplementation(async () => new Response(JSON.stringify({ message: "unavailable" })));
    await assert.rejects(postForm("/api/example", {}), { code: "REQUEST_FAILED" });
});

test("form requests recognize proxy rate limits without JSON", async (t) => {
    t.mock.method(globalThis, "fetch", async () => new Response("Too many requests", { status: 429 }));
    await assert.rejects(postForm("/api/example", {}), { code: "RATE_LIMITED" });
});

test("form requests preserve cancellation and normalize network failures", async (t) => {
    const fetch = t.mock.method(globalThis, "fetch", async () => { throw new TypeError("Failed to fetch"); });
    await assert.rejects(postForm("/api/example", {}), { code: "NETWORK_ERROR" });
    fetch.mock.mockImplementation(async () => { throw new DOMException("Cancelled", "AbortError"); });
    await assert.rejects(postForm("/api/example", {}), { name: "AbortError" });
});

test("form requests propagate caller cancellation", async (t) => {
    const controller = new AbortController();
    t.mock.method(globalThis, "fetch", async (url, options) => new Promise((resolve, reject) => {
        options.signal.addEventListener("abort", () => reject(options.signal.reason), { once: true });
    }));
    const request = postForm("/api/example", {}, { signal: controller.signal });
    controller.abort();
    await assert.rejects(request, { name: "AbortError" });
});

test("form requests time out while waiting for response headers", async (t) => {
    t.mock.method(globalThis, "fetch", async (url, options) => new Promise((resolve, reject) => {
        options.signal.addEventListener("abort", () => reject(options.signal.reason), { once: true });
    }));
    await assert.rejects(postForm("/api/example", {}, { timeoutMs: 10 }), { code: "REQUEST_TIMEOUT" });
});

test("form request timeout also covers an unfinished response body", async (t) => {
    t.mock.method(globalThis, "fetch", async (url, options) => ({
        ok: true,
        status: 200,
        json: () => new Promise((resolve, reject) => {
            options.signal.addEventListener("abort", () => reject(options.signal.reason), { once: true });
        })
    }));
    await assert.rejects(postForm("/api/example", {}, { timeoutMs: 10 }), { code: "REQUEST_TIMEOUT" });
});
