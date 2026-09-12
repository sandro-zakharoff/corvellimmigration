import assert from "node:assert/strict";
import test from "node:test";
import { contactDetails } from "../shared/company.js";
import { guides } from "../shared/guides.js";
import { renderGuideEmail } from "../server/emails/guideEmail.js";
import { renderEmailLayout } from "../server/emails/emailLayout.js";
import { emailTheme, escapeEmailHtml } from "../server/emails/emailTheme.js";
import { guideEmailContent, guideEmailCopy } from "../server/emails/guideContent.js";

const expectedCopy = {
    label: "PDF · Guide",
    contentsLabel: "What's inside",
    downloadLabel: "Download the PDF ↓",
    note: "Most companies we work with already have immigration counsel. If it's useful, you can run a single filing alongside your existing firm and see how we handle it before changing anything — no switch required.",
    reply: "Just reply to this email if you'd like to talk it through.",
    signature: "— The Corvell Immigration team",
    disclaimer: "Attorney advertising. This email is for general information only and is not legal advice. Reading it does not create an attorney–client relationship.",
    copyright: "Corvell Immigration. All rights reserved."
};

const expectedGuides = {
    "eb-2": {
        subject: "Your EB-2 guide is ready",
        heading: "Your EB-2 guide is ready.",
        preheader: "Your guide to sponsoring an EB-2 employee is ready to download.",
        intro: "Thanks for requesting the guide. It walks through sponsoring an employee for an EB-2 green card in plain language — written for the HR and legal-ops people who actually run the process, not for lawyers.",
        items: [
            "Who qualifies for EB-2 — advanced degree or exceptional ability, and how each is shown.",
            "Where PERM labor certification fits, and the recruitment it requires.",
            "The I-140 petition and the evidence that supports it.",
            "Priority dates and the Visa Bulletin — what determines the wait.",
            "Government fees and a realistic stage-by-stage timeline.",
            "The documents to gather before you start."
        ]
    },
    perm: {
        subject: "Your PERM guide is ready",
        heading: "Your PERM guide is ready.",
        preheader: "Your guide to how PERM labor certification works is ready to download.",
        intro: "Thanks for requesting the guide. It walks through the PERM labor certification process in plain language — written for the HR and legal-ops people who actually run it, not for lawyers.",
        items: [
            "What PERM is, and why it comes before the green-card petition.",
            "The prevailing-wage determination and what it sets.",
            "The recruitment steps, and the timing rules that govern them.",
            "The audit file you keep, and what DOL can ask for.",
            "A realistic view of the DOL timeline at each stage.",
            "The records to have ready before you file."
        ]
    },
    "h-1b": {
        subject: "Your H-1B guide is ready",
        heading: "Your H-1B guide is ready.",
        preheader: "Your guide to sponsoring an H-1B specialty worker is ready to download.",
        intro: "Thanks for requesting the guide. It walks through sponsoring an H-1B specialty worker in plain language — written for the HR and legal-ops people who actually run the process, not for lawyers.",
        items: [
            "What counts as a specialty occupation, and how the role and the candidate are assessed.",
            "The registration and cap-season timeline — what to prepare, and when.",
            "The LCA and prevailing-wage steps, and the records you keep on file.",
            "A realistic view of government fees and how long each stage takes.",
            "The documents to gather before you file."
        ]
    },
    "h-2b": {
        subject: "Your H-2B guide is ready",
        heading: "Your H-2B guide is ready.",
        preheader: "Your guide to running a compliant H-2B seasonal program is ready to download.",
        intro: "Thanks for requesting the guide. It walks through running a compliant H-2B seasonal program in plain language — written for the HR and legal-ops people who actually run it, not for lawyers.",
        items: [
            "How to establish a temporary need — seasonal, peak-load, or one-time.",
            "The prevailing-wage and temporary labor certification steps.",
            "The recruitment DOL requires, and the timing that drives your start date.",
            "The semi-annual cap, and how it affects when you file.",
            "Government fees and a realistic timeline for each stage.",
            "The records to keep for compliance."
        ]
    }
};

function input(overrides = {}) {
    return {
        guideId: "eb-2",
        fullName: "Jane Smith",
        downloadUrl: "https://corvellimmigration.com/api/guides/download/eb-2?expires=1790000000&token=fixture-token",
        year: 2026,
        ...overrides
    };
}

function htmlText(value) {
    return value.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

test("all four guide variants preserve the supplied HTML source copy exactly", () => {
    assert.deepEqual(guideEmailContent, expectedGuides);
    assert.deepEqual(guideEmailCopy, expectedCopy);
    assert.deepEqual(Object.keys(expectedGuides).sort(), guides.map((guide) => guide.id).sort());
    const subjects = new Set();

    for (const guide of guides) {
        const expected = expectedGuides[guide.id];
        const result = renderGuideEmail(input({ guideId: guide.id }));
        const decoded = htmlText(result.html);
        subjects.add(result.subject);
        assert.equal(result.subject, expected.subject);
        assert.ok(decoded.includes(`<title>${expected.subject}</title>`));
        assert.ok(decoded.includes(expected.preheader));
        assert.ok(decoded.includes(expected.heading));
        assert.ok(decoded.includes(expected.intro));
        assert.ok(decoded.includes(guide.title));
        assert.ok(decoded.includes("Hi Jane,"));
        assert.equal((decoded.match(/<h1\b/g) || []).length, 1);
        assert.equal((decoded.match(/PDF · Guide/g) || []).length, 2);
        assert.equal((decoded.match(/What's inside/g) || []).length, 1);
        assert.equal((decoded.match(/Download the PDF ↓/g) || []).length, 1);

        let previousPosition = decoded.indexOf(expectedCopy.contentsLabel);

        for (const item of expected.items) {
            const position = decoded.indexOf(item);
            assert.ok(position > previousPosition, `${guide.id}: ${item}`);
            previousPosition = position;
        }

        for (const key of ["note", "reply", "signature", "disclaimer", "copyright"]) {
            assert.ok(decoded.includes(expectedCopy[key]), `${guide.id}: ${key}`);
        }
    }

    assert.equal(subjects.size, 4);
});

test("every variant uses the same layout header and footer with current shared company details", () => {
    const marker = "EMAIL_BODY_FIXTURE";
    const [prefix, suffix] = renderEmailLayout({ subject: "EMAIL_SUBJECT_FIXTURE", preheader: "EMAIL_PREHEADER_FIXTURE", body: marker, year: 2026 }).split(marker);

    for (const guide of guides) {
        const result = renderGuideEmail(input({ guideId: guide.id }));
        const normalized = result.html
            .replace(escapeEmailHtml(expectedGuides[guide.id].subject), "EMAIL_SUBJECT_FIXTURE")
            .replace(escapeEmailHtml(expectedGuides[guide.id].preheader), "EMAIL_PREHEADER_FIXTURE");
        assert.ok(normalized.startsWith(prefix));
        assert.ok(normalized.endsWith(suffix));

        for (const detail of [...contactDetails.address, contactDetails.phone, contactDetails.email]) {
            assert.ok(htmlText(result.html).includes(detail));
            assert.ok(result.text.includes(detail));
        }

        assert.ok(result.html.includes(`href="tel:${contactDetails.phoneHref}"`));
        assert.ok(result.html.includes(`href="mailto:${contactDetails.email}"`));
        assert.doesNotMatch(result.html, /1200 Brickell Avenue|Suite 1950|\+1 \(305\) 555-0140/);
    }
});

test("HTML and plain-text alternatives carry the same content and usable download address", () => {
    for (const guide of guides) {
        const values = input({ guideId: guide.id, downloadUrl: `https://corvellimmigration.com/api/guides/download/${guide.id}?expires=1790000000&token=fixture-token` });
        const result = renderGuideEmail(values);
        const expected = expectedGuides[guide.id];
        const paragraphs = result.text.split("\n\n");
        assert.deepEqual(paragraphs, [
            expected.heading,
            "Hi Jane,",
            expected.intro,
            `${guide.title}\n${expectedCopy.downloadLabel}\n${values.downloadUrl}`,
            `${expectedCopy.contentsLabel}\n${expected.items.map((item) => `— ${item}`).join("\n")}`,
            expectedCopy.note,
            expectedCopy.reply,
            expectedCopy.signature,
            ["Corvell Immigration", ...contactDetails.address, contactDetails.phone, contactDetails.email].join("\n"),
            expectedCopy.disclaimer,
            `© 2026 ${expectedCopy.copyright}`
        ]);
        assert.ok(result.html.includes(`href="${escapeEmailHtml(values.downloadUrl)}"`));
        assert.doesNotMatch(result.text, /<\/?[a-z][^>]*>|&(?:amp|quot|lt|gt|nbsp);|&#\d+;/i);
    }
});

test("personalization escapes HTML without changing name punctuation or case", () => {
    for (const [fullName, expectedGreeting] of [
        ["  Mary-Jane   Smith  ", "Hi Mary-Jane,"],
        ["D'Arcy Jones", "Hi D'Arcy,"],
        ["Élodie Dupont", "Hi Élodie,"],
        ["jANE Smith", "Hi jANE,"],
        ['<svg/onload=alert(1)>&\'" Smith', 'Hi <svg/onload=alert(1)>&\'",']
    ]) {
        const result = renderGuideEmail(input({ fullName }));
        assert.ok(result.html.includes(escapeEmailHtml(expectedGreeting)));
        assert.ok(result.text.includes(expectedGreeting));
        assert.doesNotMatch(result.html, /<svg|<script|\sonload\s*=/i);
    }

    assert.equal(escapeEmailHtml(`&<>"'`), "&amp;&lt;&gt;&quot;&#39;");
});

test("shared layout escapes its subject and preview text", () => {
    const subject = '<script>alert("subject")</script>';
    const preheader = '<img src=x onerror="alert(1)">&preview';
    const html = renderEmailLayout({ subject, preheader, body: "<tr><td>Body</td></tr>", year: 2026 });
    assert.ok(html.includes(`<title>${escapeEmailHtml(subject)}</title>`));
    assert.ok(html.includes(escapeEmailHtml(preheader)));
    assert.doesNotMatch(html, /<script|<img\b/i);
});

test("missing or non-text names use the neutral greeting without placeholders", () => {
    for (const fullName of [undefined, null, "", "   ", 42, [], {}]) {
        const result = renderGuideEmail(input({ fullName }));
        assert.ok(result.html.includes(">Hi,</p>"));
        assert.ok(result.text.includes("\n\nHi,\n\n"));
        assert.doesNotMatch(result.html, /\{\{first_name\}\}|Hi undefined|Hi null|Hi ,/);
    }
});

test("download URL attribute escaping prevents new attributes or elements", () => {
    const downloadUrl = `https://corvellimmigration.com/api/guides/download/eb-2?expires=1790000000&token=a'"<script>&extra=1`;
    const normalizedUrl = new URL(downloadUrl).href;
    const result = renderGuideEmail(input({ downloadUrl }));
    assert.ok(result.html.includes(`href="${escapeEmailHtml(normalizedUrl)}"`));
    assert.ok(result.text.includes(normalizedUrl));
    assert.doesNotMatch(result.html, /<script|\son[a-z]+\s*=/i);
    assert.equal((result.html.match(/href="/g) || []).length, 4);
});

test("invalid guide IDs, unsafe download URLs and invalid years are rejected", () => {
    for (const guideId of [undefined, null, "", "eb2", "../.env", "__proto__", [], {}]) {
        assert.throws(() => renderGuideEmail(input({ guideId })), TypeError);
    }

    for (const downloadUrl of [
        undefined, null, "", "/relative/path", "not a URL",
        "javascript:alert(1)", "data:text/html,test", "file:///etc/passwd", "ftp://example.com/file.pdf",
        "http://corvellimmigration.com/file.pdf", "http://localhost.evil.example/file.pdf",
        "https://username:password@example.com/file.pdf"
    ]) {
        assert.throws(() => renderGuideEmail(input({ downloadUrl })), TypeError);
    }

    for (const year of [null, "2026", 1999, 10000, 2026.5, NaN, Infinity, "<script>"]) {
        assert.throws(() => renderGuideEmail(input({ year })), TypeError);
    }

    for (const downloadUrl of ["https://example.com/file.pdf", "http://127.0.0.1:5274/file.pdf", "http://localhost:5274/file.pdf", "http://[::1]:5274/file.pdf"]) {
        assert.ok(renderGuideEmail(input({ downloadUrl })).html.includes(escapeEmailHtml(new URL(downloadUrl).href)));
    }

    assert.ok(renderGuideEmail(input({ year: 2027 })).text.includes("© 2027"));
    assert.ok(renderGuideEmail(input({ year: undefined })).text.includes(`© ${new Date().getUTCFullYear()}`));
});

test("renderer ignores unrelated private fields and produces only passive email markup", () => {
    const values = input({
        workEmail: "private-customer@example.invalid",
        company: "PRIVATE_COMPANY_SENTINEL",
        jobTitle: "PRIVATE_JOB_SENTINEL",
        adminEmail: "private-admin@example.invalid",
        smtpPassword: "PRIVATE_PASSWORD_SENTINEL",
        attachmentPath: "/private/server/assets/secret-guide.pdf"
    });
    const result = renderGuideEmail(values);

    for (const key of ["workEmail", "company", "jobTitle", "adminEmail", "smtpPassword", "attachmentPath"]) {
        assert.equal(result.html.includes(values[key]), false);
        assert.equal(result.text.includes(values[key]), false);
        assert.equal(result.subject.includes(values[key]), false);
    }

    assert.doesNotMatch(result.html, /<!--|\saria-[\w-]+\s*=|<p\b[^>]*\sclass\s*=|<(?:script|iframe|form|input|video|audio)\b|\{\{[\w_]+\}\}/i);
    assert.doesNotMatch(result.html, /display\s*:\s*(?:grid|flex)|<link\b|@import/i);
    assert.match(result.html, /^<!DOCTYPE html>/);
    assert.match(result.html, /<html lang="en">/);
    assert.match(result.html, /<meta name="viewport"/);
    assert.match(result.html, /max-width:620px/);
    assert.match(result.html, /max-width:380px/);
});

test("shared email colors retain the source HTML palette", () => {
    assert.deepEqual(emailTheme.colors, {
        shell: "#e4e2d9",
        dark: "#0e1f25",
        paper: "#fbfaf6",
        ink: "#13262e",
        card: "#13272f",
        cardText: "#f4f2ea",
        accent: "#d9a03d",
        border: "#d8d6cd",
        label: "#3e7c87",
        tagline: "#5e6e72",
        footerBrand: "#e9e6dd",
        footerText: "#8ca0a2",
        copyright: "#5f7574"
    });
});

test("footer contacts use explicit styled links instead of email-client blue auto-links", () => {
    for (const guide of guides) {
        const { html } = renderGuideEmail(input({ guideId: guide.id }));
        const links = [...html.matchAll(/<a href="([^"]+)" style="([^"]+)"><span style="([^"]+)">([\s\S]*?)<\/span><\/a>/g)];
        assert.equal(links.length, 3);
        const [address, phone, email] = links;
        const mapUrl = new URL(htmlText(address[1]));
        assert.equal(mapUrl.origin, "https://www.google.com");
        assert.equal(mapUrl.pathname, "/maps/search/");
        assert.equal(mapUrl.searchParams.get("api"), "1");
        assert.equal(mapUrl.searchParams.get("query"), contactDetails.address.join(", "));
        assert.equal(address[4], contactDetails.address.map(escapeEmailHtml).join("<br>"));
        assert.equal(phone[1], `tel:${contactDetails.phoneHref}`);
        assert.equal(email[1], `mailto:${contactDetails.email}`);

        for (const [link, color] of [[address, emailTheme.colors.footerText], [phone, emailTheme.colors.footerText], [email, emailTheme.colors.accent]]) {
            assert.ok(link[2].includes(`color:${color}!important;`));
            assert.ok(link[2].includes("text-decoration:none!important;"));
            assert.ok(link[3].includes(`color:${color};`));
        }
    }
});
