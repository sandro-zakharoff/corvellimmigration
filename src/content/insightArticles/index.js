const articleModules = import.meta.glob("./entries/*.js", { eager: true });

export const insightArticles = createContentCollection(articleModules, "src/content/insightArticles/entries");

export function getInsightArticle(slug) {
    return insightArticles.find((article) => article.slug === slug);
}
import { createContentCollection } from "../../lib/content/contentModel.js";
