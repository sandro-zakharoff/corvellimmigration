import assert from "node:assert/strict";
import test from "node:test";
import { CAREERS_REFRESH_INTERVAL_DAYS, formatCareersDate, getCareersDate, isCareersDateSnapshot } from "../shared/careersSchedule.js";

test("careers use one anchored fifteen-day cycle for every visitor", () => {
    assert.equal(CAREERS_REFRESH_INTERVAL_DAYS, 15);
    assert.deepEqual(getCareersDate("2026-09-12T00:00:00.000Z"), {
        updatedAt: "2026-09-12",
        nextUpdateAt: "2026-09-27T00:00:00.000Z",
        serverTime: "2026-09-12T00:00:00.000Z"
    });
    assert.equal(getCareersDate("2026-09-20T14:00:00.000Z").updatedAt, "2026-09-12");
    assert.equal(getCareersDate("2026-09-26T23:59:59.999Z").updatedAt, "2026-09-12");
    assert.equal(getCareersDate("2026-09-27T00:00:00.000Z").updatedAt, "2026-09-27");
    assert.equal(getCareersDate("2026-09-27T00:00:00.001Z").updatedAt, "2026-09-27");
});

test("missed visits and server restarts do not restart the refresh schedule", () => {
    const snapshot = getCareersDate("2027-01-01T17:00:00.000Z");
    assert.equal(snapshot.updatedAt, "2026-12-26");
    assert.equal(snapshot.nextUpdateAt, "2027-01-10T00:00:00.000Z");
    assert.deepEqual(getCareersDate(new Date(snapshot.serverTime)), snapshot);
    assert.deepEqual(getCareersDate(Date.parse(snapshot.serverTime)), snapshot);
});

test("time-zone offsets and daylight-saving changes do not move UTC boundaries", () => {
    const values = [
        "2026-10-27T00:00:00.000Z",
        "2026-10-26T20:00:00.000-04:00",
        "2026-10-27T02:00:00.000+02:00"
    ];

    for (const value of values) {
        assert.deepEqual(getCareersDate(value), getCareersDate(values[0]));
    }

    assert.equal(getCareersDate("2026-10-26T23:59:59.999Z").updatedAt, "2026-10-12");
    assert.equal(getCareersDate(values[0]).updatedAt, "2026-10-27");
    assert.equal(getCareersDate(values[0]).nextUpdateAt, "2026-11-11T00:00:00.000Z");
});

test("careers format long and short dates without using the visitor's local zone", () => {
    assert.equal(formatCareersDate("2026-09-12"), "September 12, 2026");
    assert.equal(formatCareersDate("2026-09-12", "short"), "Sep 12, 2026");
    assert.equal(formatCareersDate("2027-01-10"), "January 10, 2027");
});

test("invalid API snapshots cannot replace the shared fallback schedule", () => {
    const snapshot = getCareersDate("2026-09-12T17:00:00.000Z");
    assert.equal(isCareersDateSnapshot(snapshot), true);
    assert.equal(isCareersDateSnapshot({ ...snapshot, updatedAt: "2026-09-11" }), false);
    assert.equal(isCareersDateSnapshot({ ...snapshot, nextUpdateAt: "2026-09-28T00:00:00.000Z" }), false);
    assert.equal(isCareersDateSnapshot({ ...snapshot, serverTime: "not a date" }), false);
    assert.equal(isCareersDateSnapshot(null), false);
    assert.equal(isCareersDateSnapshot({}), false);
    assert.throws(() => getCareersDate("not a date"), /valid date/);
});
