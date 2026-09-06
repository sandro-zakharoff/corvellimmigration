import nodemailer from "nodemailer";

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

export function createMailer(smtpConfig) {
    if (smtpConfig.missing.length > 0) {
        return null;
    }

    const transporter = nodemailer.createTransport({
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure,
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
        }
    };
}
