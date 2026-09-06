import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { validateContactForm } from "../shared/contactValidation.js";

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (request, response) => {
        response.status(429).json({
            ok: false,
            code: "RATE_LIMITED"
        });
    }
});

export function createContactRouter(mailer) {
    const router = Router();

    router.post("/", contactLimiter, async (request, response) => {
        const validation = validateContactForm(request.body);

        if (validation.data.website) {
            response.json({ ok: true });
            return;
        }

        if (!validation.isValid) {
            response.status(400).json({
                ok: false,
                code: "VALIDATION_ERROR",
                fields: validation.errors
            });
            return;
        }

        if (!mailer) {
            response.status(503).json({
                ok: false,
                code: "MAIL_SERVICE_UNAVAILABLE"
            });
            return;
        }

        try {
            await mailer.sendContactMessage(validation.data);
            response.json({ ok: true });
        } catch (error) {
            console.error("Contact mail delivery failed", {
                code: error.code,
                command: error.command,
                responseCode: error.responseCode
            });
            response.status(502).json({
                ok: false,
                code: "MAIL_DELIVERY_FAILED"
            });
        }
    });

    return router;
}
