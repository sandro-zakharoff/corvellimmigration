import nodemailer from "nodemailer";
import { contactDetails } from "../shared/company.js";
import { renderGuideEmail } from "./emails/guideEmail.js";
import { GuideDownloadError } from "./guideDownloads.js";

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function createMessage(data) {
    const fields = [
        ["Full name", data.fullName],
        ["Work email", data.workEmail],
        ["Company", data.company],
        ["Team size", data.teamSize],
        ["Message", data.message]
    ].filter(([, value]) => value);

    return {
        text: fields.map(([label, value]) => `${label}:\n${value}`).join("\n\n"),
        html: fields
            .map(
                ([label, value]) =>
                    `<div style="margin-bottom:20px"><strong>${label}</strong><br>${escapeHtml(value).replaceAll("\n", "<br>")}</div>`
            )
            .join("")
    };
}

export function createMailer(smtpConfig, suppliedTransporter, { guideDownloads } = {}) {
    if (smtpConfig.missing.length > 0) {
        return null;
    }

    const transporter = suppliedTransporter || nodemailer.createTransport({
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure,
        requireTLS: !smtpConfig.secure,
        auth: {
            user: smtpConfig.user,
            pass: smtpConfig.pass
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000
    });

    return {
        async sendContactMessage(data) {
            const message = createMessage(data);

            await transporter.sendMail({
                from: smtpConfig.from,
                to: smtpConfig.recipient,
                replyTo: data.workEmail,
                subject: `New workforce inquiry · ${data.company}`,
                text: message.text,
                html: message.html
            });
        },
        async sendGuideAdministratorMessage(data, guide, messageId) {
            const fields = [
                ["Guide", guide.title],
                ["Full name", data.fullName],
                ["Job title", data.jobTitle],
                ["Company", data.company],
                ["Work email", data.workEmail]
            ];

            await transporter.sendMail({
                from: smtpConfig.from,
                to: smtpConfig.recipient,
                replyTo: data.workEmail,
                subject: `Guide request · ${guide.title}`,
                messageId,
                text: fields.map(([label, value]) => `${label}:\n${value}`).join("\n\n"),
                html: fields.map(([label, value]) => `<div style="margin-bottom:20px"><strong>${label}</strong><br>${escapeHtml(value)}</div>`).join("")
            });
        },
        async sendGuideClientMessage(data, guide, attachmentPath, messageId) {
            if (!guideDownloads) throw new GuideDownloadError();
            const message = renderGuideEmail({
                guideId: guide.id,
                fullName: data.fullName,
                downloadUrl: guideDownloads.createUrl(guide.id)
            });

            await transporter.sendMail({
                from: smtpConfig.from,
                to: { address: data.workEmail },
                replyTo: contactDetails.email,
                subject: message.subject,
                messageId,
                text: message.text,
                html: message.html,
                attachments: [{
                    filename: `${guide.id.toUpperCase()} guide.pdf`,
                    path: attachmentPath,
                    contentType: "application/pdf"
                }],
                disableUrlAccess: true
            });
        }
    };
}
