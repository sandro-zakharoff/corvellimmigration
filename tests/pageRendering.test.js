import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { createServer } from "vite";
import { blockDefinitions } from "../src/lib/content/blockDefinitions.js";

test("shared page renderer supports all published content and flexible compositions", async (context) => {
    const server = await createServer({
        server: { middlewareMode: true, hmr: false, watch: null },
        appType: "custom",
        logLevel: "silent"
    });

    try {
        const { default: PageBlocks, blockRenderers } = await server.ssrLoadModule("/src/components/common/PageBlocks/PageBlocks.jsx");
        const pages = await server.ssrLoadModule("/src/content/pages.js");
        const { industryPages } = await server.ssrLoadModule("/src/content/industryPages/index.js");
        const { insightArticles } = await server.ssrLoadModule("/src/content/insightArticles/index.js");
        const render = (blocks) => renderToStaticMarkup(createElement(StaticRouter, { location: "/" }, createElement(PageBlocks, { blocks })));

        await context.test("every validated block type has exactly one registered renderer", () => {
            assert.deepEqual(Object.keys(blockRenderers).sort(), Object.keys(blockDefinitions).sort());
        });

        for (const [name, blocks] of Object.entries(pages)) {
            await context.test(name, () => {
                const html = render(blocks);
                assert.match(html, /<section/);
                assert.doesNotMatch(html, /\[object Object\]|<p[^>]*class=|\saria-/);
            });
        }

        await context.test("all guide collections use the same four popup triggers", async () => {
            const { guides } = await server.ssrLoadModule("/shared/guides.js");
            let collections = 0;

            for (const blocks of Object.values(pages)) {
                const html = render(blocks);
                if (!html.includes('class="guide-card"')) continue;
                collections += 1;
                assert.equal((html.match(/<button class="guide-card__link" type="button"/g) || []).length, 4);
                assert.doesNotMatch(html, /href="\/insights\/guides\//);
                for (const guide of guides) assert.ok(html.includes(guide.title));
            }

            assert.equal(collections, 2);
        });

        for (const entry of [...industryPages, ...insightArticles]) {
            await context.test(entry.slug, () => {
                const html = render(entry.blocks);
                assert.equal((html.match(/<h1\b/g) || []).length, 1);
                assert.doesNotMatch(html, /\[object Object\]|<p[^>]*class=|\saria-/);
            });
        }

        await context.test("article and industry blocks can share text, images, tables and buttons", () => {
            const routeBlock = industryPages[0].blocks.find((block) => block.type === "industry-routes");
            const blocks = [
                { type: "paragraph", text: "Before routes" },
                { type: "image", src: "/sample.jpg", alt: "Sample", caption: "Image caption" },
                routeBlock,
                { type: "content", blocks: [
                    { type: "timeline", items: [{ date: "2026", text: "Milestone" }] },
                    { type: "section", blocks: [
                        { type: "heading", level: 4, text: "Custom heading" },
                        { type: "paragraph", text: [{ text: "Highlighted", accent: true }, { text: " link", path: "/contact" }] },
                        { type: "table", columns: ["One", "Two"], rows: [["A", "B"]] },
                        { type: "link", appearance: "button", label: "Contact button", path: "/contact" },
                        { type: "paragraph", text: "Hidden text", hidden: true }
                    ] }
                ] },
                { type: "action-banner", title: "Custom CTA", link: { label: "Ask us", path: "/contact" } }
            ];
            const html = render(blocks);
            assert.ok(html.indexOf("Before routes") < html.indexOf("Temporary crews"));
            assert.ok(html.indexOf("Temporary crews") < html.indexOf("Custom heading"));
            assert.match(html, /<figcaption[^>]*>Image caption<\/figcaption>/);
            assert.match(html, /<h4[^>]*>Custom heading<\/h4>/);
            assert.match(html, /rich-text__accent/);
            assert.match(html, /rich-text__link/);
            assert.match(html, /class="button-link" href="\/contact"/);
            assert.doesNotMatch(html, /Hidden text/);
            assert.ok(html.includes("repeat(2, minmax(0, 1fr))"));
        });

        await context.test("empty or hidden content creates no blank sections", () => {
            assert.equal(render([]), "");
            assert.equal(render([{ type: "content", blocks: [] }]), "");
            assert.equal(render([{ type: "content", blocks: [{ type: "paragraph", text: "Hidden", hidden: true }] }]), "");
        });

        await context.test("headings and rich text stay escaped without raw HTML", () => {
            const html = render([{ type: "paragraph", text: "<script>alert(1)</script>" }]);
            assert.match(html, /&lt;script&gt;/);
            assert.doesNotMatch(html, /<script>/);
        });
    } finally {
        await server.close();
    }
});
