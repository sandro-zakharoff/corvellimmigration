const industryModules = import.meta.glob("./entries/*.js", { eager: true });

export const industryPages = createContentCollection(industryModules, "src/content/industryPages/entries");

export function getIndustryPage(slug) {
    return industryPages.find((industry) => industry.slug === slug);
}
import { createContentCollection } from "../../lib/content/contentModel.js";
