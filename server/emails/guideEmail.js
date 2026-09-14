import { contactDetails } from "../../shared/company.js";
import { getGuide } from "../../shared/guides.js";
import { guideEmailContent, guideEmailCopy } from "./guideContent.js";
import { renderEmailLayout } from "./emailLayout.js";
import { emailTheme, escapeEmailHtml as escape } from "./emailTheme.js";

const { colors, fonts } = emailTheme;
const inset = `background-color:${colors.paper};padding-right:40px;padding-left:40px;`;
const labelStyle = `margin:0;font-family:${fonts.mono};font-size:11px;line-height:118.182%;letter-spacing:3px;color:${colors.label};text-transform:uppercase;`;

function paragraph(text, size = 16, spacing = 16, lineHeight = 162.5) {
    return `<p style="margin-top:0;margin-right:0;margin-bottom:${spacing}px;margin-left:0;font-family:${fonts.body};font-size:${size}px;line-height:${lineHeight}%;color:${colors.ink};overflow-wrap:anywhere;word-wrap:break-word;">${escape(text)}</p>`;
}

function renderGuideCard(guide, downloadUrl) {
    return `<tr><td class="email__inset" bgcolor="${colors.paper}" style="${inset}padding-top:16px;padding-bottom:8px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${colors.card}" style="border-radius:2px;"><tr><td class="email__card-content" style="padding:30px;">
<p style="margin-top:0;margin-right:0;margin-bottom:16px;margin-left:0;font-family:${fonts.mono};font-size:10px;line-height:120%;letter-spacing:3px;color:${colors.accent};text-transform:uppercase;">${escape(guideEmailCopy.label)}</p>
<p style="margin-top:0;margin-right:0;margin-bottom:26px;margin-left:0;font-family:${fonts.heading};font-size:23px;line-height:121.739%;font-weight:700;color:${colors.cardText};">${escape(guide.title)}</p>
<table class="email__button" width="232" cellpadding="0" cellspacing="0" border="0" style="width:232px;max-width:100%;"><tr><td height="45" align="center" bgcolor="${colors.accent}" style="height:45px;border-radius:2px;">
<a class="email__button-link" href="${escape(downloadUrl)}" style="display:block;padding-top:15px;padding-right:8px;padding-bottom:15px;padding-left:8px;font-family:${fonts.mono};font-size:13px;line-height:115.385%;font-weight:500;letter-spacing:2px;color:${colors.ink};text-decoration:none;text-transform:uppercase;border-radius:2px;">${escape(guideEmailCopy.downloadLabel)}</a>
</td></tr></table>
</td></tr></table>
</td></tr>`;
}

function renderContents(items) {
    return `<tr><td class="email__inset" bgcolor="${colors.paper}" style="${inset}padding-top:30px;padding-bottom:8px;">
<p style="${labelStyle}margin-bottom:18px;">${escape(guideEmailCopy.contentsLabel)}</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0">${items.map((item, index) => {
        const padding = index === items.length - 1 ? 4 : 12;
        return `<tr><td width="24" valign="top" style="width:24px;padding-bottom:${padding}px;"><p style="margin:0;font-family:${fonts.body};font-size:15px;line-height:153.333%;font-weight:700;color:${colors.accent};">—</p></td><td valign="top" style="padding-bottom:${padding}px;">${paragraph(item, 15, 0, 153.333)}</td></tr>`;
    }).join("")}</table>
</td></tr>`;
}

function renderNote() {
    return `<tr><td class="email__inset" bgcolor="${colors.paper}" style="${inset}padding-top:26px;padding-bottom:10px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${colors.border};"><tr><td height="26" style="height:26px;font-size:0;line-height:0%;">&nbsp;</td></tr></table>
${paragraph(guideEmailCopy.note, 15, 16, 160)}
${paragraph(guideEmailCopy.reply, 15, 22, 160)}
${paragraph(guideEmailCopy.signature, 15, 0, 160)}
</td></tr>`;
}

export function renderGuideEmail({ guideId, fullName, downloadUrl, year = new Date().getUTCFullYear() }) {
    const guide = getGuide(guideId);
    const content = guideEmailContent[guideId];
    if (!guide || !content) throw new TypeError("Unknown email guide.");
    const url = new URL(downloadUrl);
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if ((url.protocol !== "https:" && !(url.protocol === "http:" && local)) || url.username || url.password) {
        throw new TypeError("The guide download URL must use HTTPS.");
    }
    if (!Number.isInteger(year) || year < 2000 || year > 9999) throw new TypeError("Invalid email year.");
    const firstName = typeof fullName === "string" ? fullName.trim().split(/\s+/u)[0] : "";
    const greeting = firstName ? `Hi ${firstName},` : "Hi,";
    const body = `<tr><td class="email__inset" bgcolor="${colors.paper}" style="${inset}padding-top:38px;padding-bottom:8px;">
<p style="${labelStyle}margin-bottom:18px;">${escape(guideEmailCopy.label)}</p>
<h1 class="email__heading" style="margin-top:0;margin-right:0;margin-bottom:22px;margin-left:0;font-family:${fonts.heading};font-size:36px;line-height:111.111%;font-weight:700;color:${colors.ink};letter-spacing:-0.5px;">${escape(content.heading)}</h1>
${paragraph(greeting)}
${paragraph(content.intro)}
</td></tr>
${renderGuideCard(guide, url.href)}
${renderContents(content.items)}
${renderNote()}`;

    return {
        subject: content.subject,
        html: renderEmailLayout({ subject: content.subject, preheader: content.preheader, body, year }),
        text: [
            content.heading,
            greeting,
            content.intro,
            `${guide.title}\n${guideEmailCopy.downloadLabel}\n${url.href}`,
            `${guideEmailCopy.contentsLabel}\n${content.items.map((item) => `— ${item}`).join("\n")}`,
            guideEmailCopy.note,
            guideEmailCopy.reply,
            guideEmailCopy.signature,
            ["Corvell Immigration", ...contactDetails.address, contactDetails.phone, contactDetails.email].join("\n"),
            guideEmailCopy.disclaimer,
            `© ${year} ${guideEmailCopy.copyright}`
        ].join("\n\n")
    };
}
