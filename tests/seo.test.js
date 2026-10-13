import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "vite";
import { injectHeadTags, renderHeadTags, renderRobots, renderSitemap } from "../shared/seo.js";

const siteUrl = "https://example.com";

test("every route has a unique title and description", async (context) => {
    const server = await createServer({
        server: { middlewareMode: true, hmr: false, watch: null },
        appType: "custom",
        logLevel: "silent"
    });

    try {
        const { getSiteRoutes, notFoundMetadata } = await server.ssrLoadModule("/src/content/metadata.js");
        const { industryPages } = await server.ssrLoadModule("/src/content/industryPages/index.js");
        const { insightArticles } = await server.ssrLoadModule("/src/content/insightArticles/index.js");
        const routes = getSiteRoutes(industryPages, insightArticles);

        await context.test("covers static pages, industries and articles", () => {
            assert.equal(routes.length, 9 + industryPages.length + insightArticles.length);
            assert.ok(routes.some((route) => route.path === "/industries/construction"));
            assert.ok(routes.some((route) => route.path.startsWith("/insights/briefs/")));
        });

        for (const route of routes) {
            await context.test(route.path, () => {
                assert.match(route.path, /^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/);
                assert.ok(route.title.length >= 10 && route.title.length <= 80, `title length ${route.title.length}`);
                assert.ok(route.description.length >= 50 && route.description.length <= 170, `description length ${route.description.length}`);
                assert.ok(!route.noindex);
            });
        }

        await context.test("titles, descriptions and paths are unique", () => {
            for (const field of ["path", "title", "description"]) {
                assert.equal(new Set(routes.map((route) => route[field])).size, routes.length, field);
            }
        });

        await context.test("404 page is excluded from indexing", () => {
            assert.equal(notFoundMetadata.noindex, true);
            assert.doesNotMatch(renderHeadTags(notFoundMetadata, siteUrl), /canonical/);
            assert.match(renderHeadTags(notFoundMetadata, siteUrl), /name="robots" content="noindex, follow"/);
        });
    } finally {
        await server.close();
    }
});

test("head tags are escaped and injected between markers", () => {
    const metadata = { path: "/about", title: "A & B <C>", description: "Say \"hi\"" };
    const html = injectHeadTags("<head>\n<!-- seo:start --><title>Old</title><!-- seo:end -->\n</head>", metadata, siteUrl);

    assert.match(html, /<title>A &amp; B &lt;C&gt;<\/title>/);
    assert.match(html, /<meta name="description" content="Say &quot;hi&quot;" \/>/);
    assert.match(html, /<link rel="canonical" href="https:\/\/example.com\/about" \/>/);
    assert.match(html, /<meta property="og:url" content="https:\/\/example.com\/about" \/>/);
    assert.doesNotMatch(html, /Old/);
    assert.throws(() => injectHeadTags("<head></head>", metadata, siteUrl), /seo:start/);
});

test("sitemap and robots use absolute site urls", () => {
    const sitemap = renderSitemap([{ path: "/" }, { path: "/h-2b" }], `${siteUrl}/`);

    assert.match(sitemap, /<loc>https:\/\/example.com\/<\/loc>/);
    assert.match(sitemap, /<loc>https:\/\/example.com\/h-2b<\/loc>/);
    assert.match(renderRobots(siteUrl), /Sitemap: https:\/\/example.com\/sitemap.xml/);
    assert.match(renderRobots(siteUrl), /Disallow: \/api\//);
});
