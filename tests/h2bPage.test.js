import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { createServer } from "vite";
import { validateBlocks } from "../src/lib/content/contentModel.js";

const expectedRows = [
    ["Wage determination", "Form ETA-9141", "DOL sets the minimum wage for that role in your county. Nothing else in the case can be filed until it comes back — so for an April 1 start the request goes in around September, and for October 1 around March."],
    ["Temporary labor certification", "Form ETA-9142B + job order", "We file the application together with the job order that offers the roles to U.S. workers first. The filing window is three days long and cannot be extended."],
    ["Randomization", "Results within days of filing", "Group A goes to a DOL analyst straight away — this is the path that works. Group B queues behind it for capacity that rarely opens. Anything past B will not be reached before the season starts."],
    ["If you are not in Group A", "Supplemental cap", "We move to the supplemental cap — an additional allocation Congress has released on top of the statutory 66,000 in each of the last four years. For the summer season it usually opens in April. We keep your file current so we can file the day it does."],
    ["USCIS petition", "Form I-129", "With the certification approved, we petition USCIS for the workers. One petition covers the whole group, so headcount does not multiply this stage."],
    ["Consular filing, per worker", "DS-160 + interview", "Each worker gets their own visa application and a prepared interview at the U.S. embassy. We file and prepare; they attend, and travel once the visa is issued."],
    ["At filing", "Per application", "Wage determination request, the ETA-9142B, the job order, and the full recruitment file assembled and filed."],
    ["Only if Group A", "Per application in Group A", "The recruitment period, DOL certification, and the I-129 petition carried through to approval. If your application does not land in Group A, this is never charged."],
    ["Consular stage", "Per worker", "Visa application for each worker who will travel, plus preparation for the embassy interview."],
    ["Department of Labor", "Both filings", "Neither the wage determination request nor the labor certification carries a filing fee."],
    ["USCIS", "Per petition, not per worker", "Petition, asylum program fee and fraud prevention fee combined. Employers with 25 or fewer staff pay the reduced rate. Premium processing is optional at $1,780."],
    ["U.S. Embassy", "Per worker", "The visa application fee, paid before the interview and not refundable if the visa is refused."],
    ["You upload", "Documents you already hold", "Company registration, tax and payroll records, worksite details. No forms to complete and nothing to look up."],
    ["We fill", "Every field we can source", "We take the details out of your documents and populate the forms ourselves, rather than sending you a questionnaire to retype them into."],
    ["You confirm", "One review pass", "You approve applications. That is the last we need from you until the crew is booked."]
];

function text(value) {
    function flatten(part) {
        if (Array.isArray(part)) return part.map(flatten).join("");
        if (part && typeof part === "object") return flatten(part.text);
        return String(part ?? "");
    }

    return flatten(value).replace(/\s+/g, " ").trim();
}

function renderedText(html) {
    return html.replace(/<[^>]*>/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, " ")
        .trim();
}

test("H-2B is a standalone page composed from reusable site blocks", async (context) => {
    const server = await createServer({
        server: { middlewareMode: true, hmr: false, watch: null },
        appType: "custom",
        logLevel: "silent"
    });

    try {
        const { default: PageBlocks } = await server.ssrLoadModule("/src/components/common/PageBlocks/PageBlocks.jsx");
        const { default: DetailList } = await server.ssrLoadModule("/src/components/common/DetailList/DetailList.jsx");
        const { h2bPageBlocks } = await server.ssrLoadModule("/src/content/pages.js");
        const render = (blocks) => renderToStaticMarkup(createElement(StaticRouter, { location: "/h-2b" }, createElement(PageBlocks, { blocks })));
        const html = render(h2bPageBlocks);
        const sections = h2bPageBlocks.filter((block) => block.type === "detail-section");
        const rows = sections.flatMap((section) => section.groups.flatMap((group) => group.items));

        await context.test("the root route renders one hero and five semantic sections", async () => {
            const app = await readFile(new URL("../src/app/App.jsx", import.meta.url), "utf8");
            assert.match(app, /<Route\s+path="\/h-2b"\s+element=/);
            assert.deepEqual(h2bPageBlocks.map((block) => block.type), ["image-hero", "detail-section", "detail-section", "detail-section", "action-banner"]);
            assert.equal((html.match(/<h1\b/g) || []).length, 1);
            assert.equal((html.match(/<section\b/g) || []).length, 5);
            assert.doesNotMatch(html, /\[object Object\]|<p[^>]*class=|\saria-|<(?:dl|dt|dd)\b/);
            assert.doesNotMatch(html, /1200 Brickell|555-0140|\/services\/h-2b/);
        });

        await context.test("all fifteen rows retain the supplied titles, labels and complete descriptions", () => {
            assert.equal(rows.length, 15);
            assert.deepEqual(rows.map((row) => [text(row.title), text(row.label), text(row.description)]), expectedRows);
            const visibleText = renderedText(html);
            for (const row of expectedRows) {
                for (const value of row) assert.ok(visibleText.includes(value), value);
            }
        });

        await context.test("the hero, section introductions and closing call to action retain the supplied copy", () => {
            const hero = h2bPageBlocks[0];
            const cta = h2bPageBlocks.at(-1);
            assert.equal(text(hero.titleParts ?? hero.title), "Your seasonal crew, start to finish.");
            assert.equal(text(hero.eyebrow), "H-2B · Seasonal & peak-demand crews");
            assert.equal(text(hero.description), "H-2B runs on fixed federal dates and a lottery nobody can influence. Here is every step of it, what each stage costs, and the ten minutes we need from you.");
            assert.equal(text(sections[0].title), "Six steps.");
            assert.equal(text(sections[0].eyebrow), "01 — How we work");
            assert.equal(text(sections[1].title), "What it actually costs.");
            assert.equal(text(sections[2].eyebrow), "03 — Intake");
            assert.equal(text(cta.title), "Happy to discuss over a call.");
            assert.equal(text(cta.description), "Tell us the roles, the headcount and the months you need covered. We will map the dates and the cost before you commit to anything.");
        });

        await context.test("amounts, filing windows and the original intake wording are preserved", () => {
            assert.deepEqual(rows.flatMap((row) => row.metrics.map((metric) => text(metric.value))), [
                "6–8 wks", "Jan 1–3", "Jul 3–5", "33,000", "April", "15 days", "Per head",
                "$1,500", "$3,500", "$150", "$0", "$1,330", "$205", "5 min", "0 min", "10 min"
            ]);
            assert.deepEqual(rows.flatMap((row) => row.metrics.map((metric) => text(metric.label))), [
                "current DOL wait", "for April 1 starts", "for October 1 starts", "visas per half-year",
                "usual opening, summer season", "15 business days on premium processing", "the only stage that scales with crew size",
                "due when we file", "due after the draw", "per head", "no filing fee", "per petition · $910 small employer", "per head",
                "", "nothing needed from you here", ""
            ]);
            assert.equal(text(sections[2].title), "Ten minutes on your side.");
            assert.equal(text(sections[2].description), "You send what you already have. We do the filling, and you check it once.");
            assert.ok(renderedText(html).includes("$910 small employer"));
            assert.ok(renderedText(html).includes("15 business days on premium processing"));
            assert.ok(renderedText(html).includes("We're in the same boat as you — we don't charge the full cost upfront."));
        });

        await context.test("highlighted phrases and selected rows remain deliberate", () => {
            assert.match(html, /<span[^>]+class="[^"]*(?:highlight|accent)[^"]*"[^>]*>start to finish\.<\/span>/);
            assert.match(html, /<span[^>]+class="[^"]*(?:highlight|accent)[^"]*"[^>]*>actually<\/span>/);
            assert.deepEqual(rows.filter((row) => row.highlighted).map((row) => text(row.title)), ["If you are not in Group A", "Only if Group A"]);
            assert.equal(rows[9].metrics[0].tone, "success");
            assert.match(html, /detail-list__metric-value--success[^>]*>\$0<\/span>/);
            assert.match(html, /rich-text__strong[^>]*>Group A<\/span>/);
            assert.match(html, /rich-text__strong[^>]*>Group B<\/span>/);
        });

        await context.test("fee groups and row headings have a consistent hierarchy", () => {
            assert.match(html, /<h3[^>]*>Attorney fee<\/h3>/);
            assert.match(html, /<h3[^>]*>Government fees<\/h3>/);
            assert.match(html, /<h4[^>]*>At filing<\/h4>/);
            assert.match(html, /<h4[^>]*>Department of Labor<\/h4>/);
            assert.match(html, /<h3[^>]*>Wage determination<\/h3>/);
            assert.match(html, /<h3[^>]*>You upload<\/h3>/);
        });

        await context.test("the shared hero and CTA support the new page without changing their defaults", () => {
            assert.match(html, /image-hero--image-right/);
            assert.match(html, /image-hero--prominent/);
            assert.match(html, /href="\/contact"[^>]*>Book a consultation<\/a>/);
            assert.match(html, /href="mailto:hello@corvellimmigration\.com"[^>]*>hello@corvellimmigration\.com<\/a>/);
            assert.ok(renderedText(html).includes("Or email hello@corvellimmigration.com"));
            const hero = { image: "/example.jpg", imageAlt: "Example", title: "Shared hero", titleParts: [{ text: "Shared hero" }] };
            assert.equal(render([{ type: "image-hero", ...hero }]), render([{ type: "industries-hero", ...hero }]));
            const legacyBanner = render([{ type: "action-banner", title: "Contact", link: { label: "Write", path: "/contact" } }]);
            assert.doesNotMatch(legacyBanner, /action-banner__actions|action-banner__secondary/);
            assert.match(legacyBanner, /class="button-link action-banner__link" href="\/contact"/);
        });

        await context.test("existing two-column lists retain their original markup and heading level", () => {
            const legacyList = renderToStaticMarkup(createElement(DetailList, {
                interactive: true,
                items: [{ title: "Permanent hires", label: "EB-2 · EB-3 · PERM", description: "Existing description" }]
            }));
            assert.match(legacyList, /detail-list--interactive/);
            assert.match(legacyList, /<h3 class="detail-list__title">Permanent hires<\/h3>/);
            assert.doesNotMatch(legacyList, /detail-list__metric|detail-list--metrics|<h4/);
        });
    } finally {
        await server.close();
    }
});

test("detail sections validate their groups, rows, metrics and visual options", () => {
    const item = { title: "Stage", description: "Details", metrics: [{ value: "$0", tone: "success" }] };
    const block = { type: "detail-section", title: "Costs", groups: [{ items: [item] }] };
    const withItem = (replacement) => ({ ...block, groups: [{ items: [replacement] }] });
    validateBlocks([block]);

    assert.throws(() => validateBlocks([{ ...block, groups: "Fees" }]), /blocks\[0\].groups/);
    assert.throws(() => validateBlocks([{ ...block, groups: [null] }]), /blocks\[0\].groups\[0\]/);
    assert.throws(() => validateBlocks([{ ...block, groups: [{}] }]), /groups\[0\].items/);
    assert.throws(() => validateBlocks([withItem(null)]), /groups\[0\].items\[0\]/);
    assert.throws(() => validateBlocks([withItem({ ...item, title: undefined })]), /items\[0\].title/);
    assert.throws(() => validateBlocks([withItem({ ...item, metrics: "Amount" })]), /items\[0\].metrics/);
    assert.throws(() => validateBlocks([withItem({ ...item, metrics: [{}] })]), /metrics\[0\].value/);
    assert.throws(() => validateBlocks([withItem({ ...item, metrics: [{ value: "$0", tone: "neon" }] })]), /metrics\[0\].tone/);
    assert.throws(() => validateBlocks([withItem({ ...item, highlighted: "yes" })]), /items\[0\].highlighted/);
    validateBlocks([{ ...block, surface: true, prominent: false }]);
    assert.throws(() => validateBlocks([{ ...block, surface: "true" }]), /blocks\[0\].surface/);
    assert.throws(() => validateBlocks([{ ...block, prominent: 1 }]), /blocks\[0\].prominent/);
});

test("shared image heroes accept either title format and validate layout options", () => {
    const block = { type: "image-hero", image: "/example.jpg", imageAlt: "Example" };
    validateBlocks([
        { ...block, title: "A shared hero", imagePosition: "left", prominent: false },
        { ...block, titleParts: [{ text: "A highlighted hero", accent: true }], imagePosition: "right", prominent: true }
    ]);
    assert.throws(() => validateBlocks([block]), /blocks\[0\].title/);
    assert.throws(() => validateBlocks([{ ...block, title: "Hero", imagePosition: "center" }]), /blocks\[0\].imagePosition/);
    assert.throws(() => validateBlocks([{ ...block, title: "Hero", prominent: "true" }]), /blocks\[0\].prominent/);
});

test("shared banners reject incomplete or unsafe secondary links", () => {
    const block = { type: "action-banner", title: "Contact" };
    validateBlocks([{ ...block, secondaryLink: { prefix: "Or email", label: "Email", path: "mailto:hello@example.com" } }]);
    assert.throws(() => validateBlocks([{ ...block, secondaryLink: { label: "Email" } }]), /secondaryLink.path/);
    assert.throws(() => validateBlocks([{ ...block, secondaryLink: { path: "/contact" } }]), /secondaryLink.label/);
    assert.throws(() => validateBlocks([{ ...block, secondaryLink: { label: "Unsafe", path: "javascript:alert(1)" } }]), /secondaryLink.path/);
});
