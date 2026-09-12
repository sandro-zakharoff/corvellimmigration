import { contactDetails } from "../../shared/company.js";
import { guideEmailCopy } from "./guideContent.js";
import { emailTheme, escapeEmailHtml as escape } from "./emailTheme.js";

const { colors, fonts } = emailTheme;

function renderLogo(footer = false) {
    const size = footer ? 16 : 22;
    return `<span style="font-family:${fonts.heading};font-size:${size}px;font-weight:700;color:${footer ? colors.footerBrand : colors.ink};letter-spacing:-0.3px;">Corvell</span><span style="font-family:${fonts.body};font-size:${size}px;font-weight:700;color:${colors.accent};">.</span><span style="font-family:${fonts.mono};font-size:${footer ? 10 : 11}px;color:${footer ? colors.footerText : colors.tagline};letter-spacing:3px;margin-left:${footer ? 10 : 12}px;vertical-align:middle;">IMMIGRATION</span>`;
}

function renderHeader() {
    return `<tr><td height="4" bgcolor="${colors.accent}" style="height:4px;font-size:0;line-height:0%;">&nbsp;</td></tr>
<tr><td class="email__inset" bgcolor="${colors.paper}" style="padding-top:26px;padding-right:40px;padding-bottom:22px;padding-left:40px;border-bottom:1px solid ${colors.border};">${renderLogo()}</td></tr>`;
}

function renderFooterLink(href, lines, color) {
    return `<a href="${escape(href)}" style="color:${color}!important;text-decoration:none!important;word-wrap:break-word;"><span style="color:${color};">${lines.map(escape).join("<br>")}</span></a>`;
}

function renderFooter(year) {
    const addressUrl = new URL("https://www.google.com/maps/search/");
    addressUrl.searchParams.set("api", "1");
    addressUrl.searchParams.set("query", contactDetails.address.join(", "));

    return `<tr><td class="email__inset" bgcolor="${colors.dark}" style="padding-top:34px;padding-right:40px;padding-bottom:34px;padding-left:40px;border-bottom-right-radius:2px;border-bottom-left-radius:2px;">
<p style="margin-top:0;margin-right:0;margin-bottom:20px;margin-left:0;line-height:130%;">${renderLogo(true)}</p>
<p style="margin-top:0;margin-right:0;margin-bottom:18px;margin-left:0;font-family:${fonts.mono};font-size:12px;line-height:166.667%;color:${colors.footerText};">${renderFooterLink(addressUrl.href, contactDetails.address, colors.footerText)}<br>${renderFooterLink(`tel:${contactDetails.phoneHref}`, [contactDetails.phone], colors.footerText)}<br>${renderFooterLink(`mailto:${contactDetails.email}`, [contactDetails.email], colors.accent)}</p>
<p style="margin-top:0;margin-right:0;margin-bottom:14px;margin-left:0;font-family:${fonts.body};font-size:12px;line-height:158.333%;color:${colors.footerText};">${escape(guideEmailCopy.disclaimer)}</p>
<p style="margin:0;font-family:${fonts.body};font-size:12px;line-height:158.333%;color:${colors.copyright};">© ${year} ${escape(guideEmailCopy.copyright)}</p>
</td></tr>`;
}

export function renderEmailLayout({ subject, preheader, body, year }) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${escape(subject)}</title>
<style>
body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;}
table{border-spacing:0;}
body{width:100%!important;margin:0!important;padding:0!important;}
a{text-decoration:none;}
@media only screen and (max-width:620px){
.email__container{width:100%!important;}
.email__inset{padding-left:26px!important;padding-right:26px!important;}
.email__heading{font-size:30px!important;line-height:113.333%!important;}
}
@media only screen and (max-width:380px){
.email__inset{padding-left:20px!important;padding-right:20px!important;}
.email__card-content{padding:20px!important;}
.email__button{width:100%!important;max-width:232px!important;}
.email__button-link{letter-spacing:1px!important;}
}
@media (prefers-color-scheme:dark){
.email,.email__shell{background-color:${colors.dark}!important;}
}
</style>
</head>
<body class="email" style="margin:0;padding:0;background-color:${colors.shell};font-family:${fonts.body};">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:100%;color:${colors.shell};opacity:0;">${escape(preheader)}${"&nbsp;&zwnj;".repeat(8)}</div>
<table class="email__shell" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${colors.shell}"><tr><td align="center" style="padding-top:32px;padding-right:12px;padding-bottom:32px;padding-left:12px;">
<table class="email__container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;table-layout:fixed;">
${renderHeader()}
${body}
<tr><td height="36" bgcolor="${colors.paper}" style="height:36px;font-size:0;line-height:0%;">&nbsp;</td></tr>
${renderFooter(year)}
</table></td></tr></table>
</body>
</html>`;
}
