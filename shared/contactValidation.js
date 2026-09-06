export const contactFieldLimits = {
    fullName: 100,
    workEmail: 254,
    company: 150,
    teamSize: 80,
    message: 3000
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function normalizeSingleLine(value) {
    return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function normalizeMessage(value) {
    return typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim() : "";
}

export function validateContactForm(values = {}) {
    const data = {
        fullName: normalizeSingleLine(values.fullName),
        workEmail: normalizeSingleLine(values.workEmail).toLowerCase(),
        company: normalizeSingleLine(values.company),
        teamSize: normalizeSingleLine(values.teamSize),
        message: normalizeMessage(values.message),
        website: normalizeSingleLine(values.website)
    };
    const errors = {};

    if (data.fullName.length < 2 || data.fullName.length > contactFieldLimits.fullName) {
        errors.fullName = "invalid";
    }

    if (!emailPattern.test(data.workEmail) || data.workEmail.length > contactFieldLimits.workEmail) {
        errors.workEmail = "invalid";
    }

    if (data.company.length < 2 || data.company.length > contactFieldLimits.company) {
        errors.company = "invalid";
    }

    if (data.teamSize.length > contactFieldLimits.teamSize) {
        errors.teamSize = "invalid";
    }

    if (data.message.length < 20 || data.message.length > contactFieldLimits.message) {
        errors.message = "invalid";
    }

    return {
        data,
        errors,
        isValid: Object.keys(errors).length === 0
    };
}
