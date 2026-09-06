export class ContactRequestError extends Error {
    constructor(code, fields = {}) {
        super(code);
        this.code = code;
        this.fields = fields;
    }
}

export async function sendContactForm(data) {
    let response;

    try {
        response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    } catch {
        throw new ContactRequestError("NETWORK_ERROR");
    }

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new ContactRequestError(result.code || "REQUEST_FAILED", result.fields);
    }

    return result;
}
