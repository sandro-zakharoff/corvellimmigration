import { Router } from "express";
import { getCareersDate } from "../shared/careersSchedule.js";

export function createCareersRouter({ now = () => new Date() } = {}) {
    const router = Router();

    router.get("/", (request, response) => {
        response.set("Cache-Control", "no-store");
        response.json(getCareersDate(now()));
    });

    return router;
}
