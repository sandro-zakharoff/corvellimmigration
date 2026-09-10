const industryModules = import.meta.glob("./entries/*.js", { eager: true });

export const industryPages = Object.values(industryModules).map((module) => module.default);

export function getIndustryPage(slug) {
    return industryPages.find((industry) => industry.slug === slug);
}
