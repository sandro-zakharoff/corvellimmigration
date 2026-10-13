import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createServer } from "vite";
import { config } from "../server/config.js";
import { injectHeadTags, renderRobots, renderSitemap } from "../shared/seo.js";

const distDirectory = join(import.meta.dirname, "..", "dist");

function routeFile(path) {
    return path === "/" ? "index.html" : `${path.slice(1)}.html`;
}

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
    const template = await readFile(join(distDirectory, "index.html"), "utf8");

    for (const route of routes) {
        if (!route.title || !route.description) {
            throw new Error(`SEO: у страницы ${route.path} нет заголовка или описания`);
        }
    }

    for (const route of routes) {
        const file = join(distDirectory, routeFile(route.path));
        await mkdir(dirname(file), { recursive: true });
        await writeFile(file, injectHeadTags(template, route, config.siteUrl));
    }

    await writeFile(join(distDirectory, "404.html"), injectHeadTags(template, notFoundMetadata, config.siteUrl));
    await writeFile(join(distDirectory, "sitemap.xml"), renderSitemap(routes, config.siteUrl));
    await writeFile(join(distDirectory, "robots.txt"), renderRobots(config.siteUrl));

    console.log(`SEO: ${routes.length} страниц, sitemap.xml и robots.txt для ${config.siteUrl}`);
} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
} finally {
    await server.close();
}
