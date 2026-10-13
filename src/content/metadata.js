import { h2bPageMetadata } from "./h2b.js";

const titleSuffix = " | Corvell Immigration";

export const pageMetadata = {
    home: {
        path: "/",
        title: "Corvell Immigration — Employment-Based Immigration for Employers",
        description:
            "AI-powered employment immigration for US employers: H-2B seasonal crews, H-1B, EB-2, EB-3, PERM, and Schedule A green cards, filed to your hiring timeline."
    },
    about: {
        path: "/about",
        title: `About the Firm${titleSuffix}`,
        description:
            "Corvell is an attorney-led employment immigration practice built on its own technology — accountable for every filing, from the first petition to the green card."
    },
    team: {
        path: "/team",
        title: `Our Team${titleSuffix}`,
        description:
            "Meet the attorneys and case team behind Corvell. Every employer immigration case is led by the attorney responsible for it."
    },
    services: {
        path: "/services",
        title: `Employment Immigration Services: EB-2, EB-3, H-1B, H-2B${titleSuffix}`,
        description:
            "Permanent hires through PERM, EB-2, and EB-3, Schedule A shortage occupations, H-1B specialty roles, and H-2B seasonal crews — the visa routes employers file."
    },
    h2b: {
        path: "/h-2b",
        ...h2bPageMetadata
    },
    industries: {
        path: "/industries",
        title: `Industries We Serve${titleSuffix}`,
        description:
            "Immigration programs for construction, hospitality, healthcare, technology, landscaping, manufacturing, senior care, and food processing employers."
    },
    insights: {
        path: "/insights",
        title: `Employer Immigration Insights${titleSuffix}`,
        description:
            "A quarterly read on processing times, priority dates, fees, and policy for employers, plus practical guides for HR and operations teams."
    },
    careers: {
        path: "/careers",
        title: `Careers${titleSuffix}`,
        description:
            "Join a small, attorney-led employment immigration practice built on its own technology. Sharp work, direct responsibility, without the busywork of a large firm."
    },
    contact: {
        path: "/contact",
        title: `Contact Us${titleSuffix}`,
        description:
            "Tell us what your workforce needs. Contact Corvell Immigration about H-2B, H-1B, EB-2, EB-3, and PERM filings for your company."
    }
};

export const notFoundMetadata = {
    path: null,
    title: `Page Not Found${titleSuffix}`,
    description: "The address may be incorrect, or the page may have moved.",
    noindex: true
};

function plainText(value) {
    if (Array.isArray(value)) return value.map(plainText).join("");
    if (value && typeof value === "object") return plainText(value.text);
    return String(value ?? "");
}

export function getIndustryMetadata(industry) {
    const hero = industry.blocks.find((block) => block.type === "industry-hero");

    return {
        path: `/industries/${industry.slug}`,
        title: industry.metadata?.title ?? `${industry.breadcrumb} Immigration${titleSuffix}`,
        description: industry.metadata?.description ?? plainText(hero?.description)
    };
}

export function getArticleMetadata(article) {
    const header = article.blocks.find((block) => block.type === "insight-header");

    return {
        path: `/insights/briefs/${article.slug}`,
        type: "article",
        title: article.metadata?.title ?? `${plainText(header?.title)}${titleSuffix}`,
        description: article.metadata?.description ?? plainText(header?.description)
    };
}

export function getSiteRoutes(industryPages, insightArticles) {
    return [
        ...Object.values(pageMetadata),
        ...industryPages.map(getIndustryMetadata),
        ...insightArticles.map(getArticleMetadata)
    ];
}
