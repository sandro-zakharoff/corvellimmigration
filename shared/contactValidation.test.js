import assert from "node:assert/strict";
import test from "node:test";
import { validateContactForm } from "./contactValidation.js";

test("normalizes and accepts a valid contact form", () => {
    const validation = validateContactForm({
        fullName: "  Jane   Smith ",
        workEmail: " JANE@EXAMPLE.COM ",
        company: " Example   Group ",
        teamSize: "20–50",
        message: "  We need help with an employment visa program.  "
    });

    assert.equal(validation.isValid, true);
    assert.deepEqual(validation.errors, {});
    assert.equal(validation.data.fullName, "Jane Smith");
    assert.equal(validation.data.workEmail, "jane@example.com");
    assert.equal(validation.data.company, "Example Group");
});

test("returns field errors for an invalid contact form", () => {
    const validation = validateContactForm({
        fullName: "J",
        workEmail: "not-an-email",
        company: "",
        message: "Too short"
    });

    assert.equal(validation.isValid, false);
    assert.deepEqual(Object.keys(validation.errors), ["fullName", "workEmail", "company", "message"]);
});

test("keeps the honeypot value for server-side spam handling", () => {
    const validation = validateContactForm({ website: "https://spam.example" });

    assert.equal(validation.data.website, "https://spam.example");
});
