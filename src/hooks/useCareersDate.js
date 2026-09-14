import { useEffect, useState } from "react";
import { formatCareersDate, getCareersDate, isCareersDateSnapshot } from "../../shared/careersSchedule.js";

const retryDelay = 5 * 60 * 1000;
const requestTimeout = 15 * 1000;

function useCareersDate() {
    const [updatedAt, setUpdatedAt] = useState(() => getCareersDate().updatedAt);

    useEffect(() => {
        let stopped = false;
        let refreshTimer;
        let activeRequest;
        let serverOffset = 0;

        async function refresh() {
            clearTimeout(refreshTimer);
            activeRequest?.abort();

            const controller = new AbortController();
            const startedAt = Date.now();
            const timeout = setTimeout(() => controller.abort(), requestTimeout);
            activeRequest = controller;

            let snapshot;
            let retry = false;

            try {
                const response = await fetch("/api/careers/date", { cache: "no-store", signal: controller.signal });

                if (!response.ok) {
                    throw new Error("The careers date is unavailable.");
                }

                snapshot = await response.json();

                if (!isCareersDateSnapshot(snapshot)) {
                    throw new Error("The careers date is invalid.");
                }

                if (stopped || activeRequest !== controller) {
                    return;
                }

                serverOffset = Date.parse(snapshot.serverTime) + (Date.now() - startedAt) / 2 - Date.now();
            } catch {
                snapshot = getCareersDate(Date.now() + serverOffset);
                retry = true;
            } finally {
                clearTimeout(timeout);
            }

            if (stopped || activeRequest !== controller) {
                return;
            }

            setUpdatedAt(snapshot.updatedAt);

            const boundaryDelay = Math.max(1000, Date.parse(snapshot.nextUpdateAt) - Date.now() - serverOffset + 100);
            refreshTimer = setTimeout(refresh, retry ? Math.min(boundaryDelay, retryDelay) : boundaryDelay);
        }

        function handleVisibility() {
            if (!document.hidden) {
                refresh();
            }
        }

        refresh();
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            stopped = true;
            clearTimeout(refreshTimer);
            activeRequest?.abort();
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, []);

    return {
        updatedAt,
        longDate: formatCareersDate(updatedAt),
        shortDate: formatCareersDate(updatedAt, "short")
    };
}

export default useCareersDate;
