import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { validateGuideRequest } from "../shared/guideValidation.js";
import { GuideRequestError } from "./guideOutbox.js";

export function createGuideRouter(outbox, { requestLimit = 10 } = {}) {
    const router = Router();
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: requestLimit,
        standardHeaders: "draft-8",
        legacyHeaders: false,
        handler: (request, response) => response.status(429).json({ ok: false, code: "RATE_LIMITED" })
    });

    router.post("/", limiter, async (request, response) => {
        response.set("Cache-Control", "no-store");
        const validation = validateGuideRequest(request.body);

        if (validation.data.website) {
            response.status(202).json({ ok: true, status: "queued" });
            return;
        }

        if (!validation.isValid) {
            response.status(400).json({ ok: false, code: "VALIDATION_ERROR", fields: validation.errors });
            return;
        }

        try {
            const result = await outbox.enqueue(validation.data);
            response.status(202).json({ ok: true, status: result.status });
        } catch (error) {
            if (error instanceof GuideRequestError) {
                response.status(error.status).json({ ok: false, code: error.code });
                return;
            }

            console.error("Guide request could not be queued");
            response.status(503).json({ ok: false, code: "QUEUE_UNAVAILABLE" });
        }
    });

    return router;
}
