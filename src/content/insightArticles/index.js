const articleModules = import.meta.glob("./entries/*.js", { eager: true });

export const insightArticles = Object.values(articleModules).map((module) => module.default);

export function getInsightArticle(slug) {
    return insightArticles.find((article) => article.slug === slug);
}
