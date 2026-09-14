export class FormRequestError extends Error {
    constructor(code, fields = {}) {
        super(code);
        this.name = "FormRequestError";
        this.code = code;
        this.fields = fields && typeof fields === "object" && !Array.isArray(fields) ? fields : {};
    }
}

export async function postForm(url, data, { signal, timeoutMs = 30000 } = {}) {
    const controller = new AbortController();
    let timedOut = false;
    const abort = () => controller.abort(signal.reason);

    if (signal?.aborted) {
        abort();
    } else {
        signal?.addEventListener("abort", abort, { once: true });
    }

    const timeout = setTimeout(() => {
        timedOut = true;
        controller.abort();
    }, timeoutMs);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal: controller.signal
        });
        const result = await response.json().catch((error) => {
            if (controller.signal.aborted) {
                throw error;
            }

            return null;
        });

        if (!response.ok || result?.ok !== true) {
            throw new FormRequestError(
                result?.code || (response.status === 429 ? "RATE_LIMITED" : "REQUEST_FAILED"),
                result?.fields
            );
        }

        return result;
    } catch (error) {
        if (signal?.aborted) {
            throw signal.reason || error;
        }

        if (timedOut) {
            throw new FormRequestError("REQUEST_TIMEOUT");
        }

        if (error instanceof FormRequestError || error.name === "AbortError") {
            throw error;
        }

        throw new FormRequestError("NETWORK_ERROR");
    } finally {
        clearTimeout(timeout);
        signal?.removeEventListener("abort", abort);
    }
}
