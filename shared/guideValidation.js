import { getGuide } from "./guides.js";

export const guideFieldLimits = {
    fullName: 100,
    jobTitle: 100,
    company: 150,
    workEmail: 254
};

const requestIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

function normalize(value) {
    return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

export function validateGuideRequest(values) {
    const source = values && typeof values === "object" && !Array.isArray(values) ? values : {};
    const data = {
        guideId: normalize(source.guideId),
        requestId: normalize(source.requestId).toLowerCase(),
        fullName: normalize(source.fullName),
        jobTitle: normalize(source.jobTitle),
        company: normalize(source.company),
        workEmail: normalize(source.workEmail).toLowerCase(),
        website: normalize(source.website)
    };
    const errors = {};

    for (const field of ["fullName", "jobTitle", "company"]) {
        if (data[field].length < 2 || data[field].length > guideFieldLimits[field] || /[\u0000-\u001f\u007f]/.test(source[field] || "")) {
            errors[field] = "invalid";
        }
    }

    if (!emailPattern.test(data.workEmail) || data.workEmail.length > guideFieldLimits.workEmail || data.workEmail.split("@")[0].length > 64 || /[\u0000-\u001f\u007f]/.test(source.workEmail || "")) {
        errors.workEmail = "invalid";
    }

    if (!getGuide(data.guideId)) {
        errors.guideId = "invalid";
    }

    if (!requestIdPattern.test(data.requestId)) {
        errors.requestId = "invalid";
    }

    return { data, errors, isValid: Object.keys(errors).length === 0 };
}
