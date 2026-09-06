import dotenv from "dotenv";

dotenv.config();

function parsePort(value, fallback) {
    const port = Number.parseInt(value, 10);
    return Number.isInteger(port) && port > 0 && port <= 65535 ? port : fallback;
}

const smtp = {
    host: process.env.SMTP_HOST || "",
    port: parsePort(process.env.SMTP_PORT, 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.SMTP_FROM || "",
    recipient: process.env.CONTACT_TO_EMAIL || ""
};

const requiredSmtpValues = {
    SMTP_HOST: smtp.host,
    SMTP_USER: smtp.user,
    SMTP_PASS: smtp.pass,
    SMTP_FROM: smtp.from,
    CONTACT_TO_EMAIL: smtp.recipient
};

export const config = {
    host: process.env.SERVER_HOST || "127.0.0.1",
    port: parsePort(process.env.SERVER_PORT, 5174),
    smtp: {
        ...smtp,
        missing: Object.keys(requiredSmtpValues).filter((name) => !requiredSmtpValues[name])
    }
};
