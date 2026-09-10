import { createServer } from "vite";
import { validateBlocks } from "../src/lib/content/contentModel.js";

const server = await createServer({
    server: { middlewareMode: true, hmr: false, watch: null },
    appType: "custom",
    logLevel: "silent"
});

try {
    const pages = await server.ssrLoadModule("/src/content/pages.js");
    const { industryPages } = await server.ssrLoadModule("/src/content/industryPages/index.js");
    const { insightArticles } = await server.ssrLoadModule("/src/content/insightArticles/index.js");

    for (const [name, blocks] of Object.entries(pages)) {
        validateBlocks(blocks, `src/content/pages.js → ${name}`);
    }

    console.log(`Контент проверен: ${Object.keys(pages).length} страниц, ${industryPages.length} отраслевых подстраниц, ${insightArticles.length} статей.`);
} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
} finally {
    await server.close();
}
