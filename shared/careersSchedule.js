export const CAREERS_REFRESH_ANCHOR = "2026-09-12T00:00:00.000Z";
export const CAREERS_REFRESH_INTERVAL_DAYS = 15;

const refreshInterval = CAREERS_REFRESH_INTERVAL_DAYS * 24 * 60 * 60 * 1000;
const anchorTime = Date.parse(CAREERS_REFRESH_ANCHOR);

const dateFormats = {
    long: new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }),
    short: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
};

export function getCareersDate(now = new Date()) {
    const currentTime = new Date(now).getTime();

    if (!Number.isFinite(currentTime)) {
        throw new TypeError("A valid date is required for the careers schedule.");
    }

    const cycle = Math.floor((currentTime - anchorTime) / refreshInterval);
    const updatedTime = anchorTime + cycle * refreshInterval;

    return {
        updatedAt: new Date(updatedTime).toISOString().slice(0, 10),
        nextUpdateAt: new Date(updatedTime + refreshInterval).toISOString(),
        serverTime: new Date(currentTime).toISOString()
    };
}

export function isCareersDateSnapshot(value) {
    if (!value || typeof value.serverTime !== "string" || !Number.isFinite(Date.parse(value.serverTime))) {
        return false;
    }

    const expected = getCareersDate(value.serverTime);

    return value.updatedAt === expected.updatedAt && value.nextUpdateAt === expected.nextUpdateAt;
}

export function formatCareersDate(date, format = "long") {
    return dateFormats[format].format(new Date(`${date}T00:00:00.000Z`));
}
