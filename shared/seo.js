export const siteName = "Corvell Immigration";
export const defaultSiteUrl = "https://corvellimmigration.com";

const headStartMarker = "<!-- seo:start -->";
const headEndMarker = "<!-- seo:end -->";

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

export function absoluteUrl(siteUrl, path) {
    return new URL(path, `${siteUrl.replace(/\/+$/, "")}/`).href;
}

export function getHeadTags(metadata, siteUrl) {
    const url = metadata.path ? absoluteUrl(siteUrl, metadata.path) : null;
    const tags = [
        { element: "meta", attributes: { name: "description", content: metadata.description } },
        { element: "meta", attributes: { name: "robots", content: metadata.noindex ? "noindex, follow" : "index, follow" } },
        { element: "meta", attributes: { property: "og:site_name", content: siteName } },
        { element: "meta", attributes: { property: "og:type", content: metadata.type ?? "website" } },
        { element: "meta", attributes: { property: "og:title", content: metadata.title } },
        { element: "meta", attributes: { property: "og:description", content: metadata.description } },
        { element: "meta", attributes: { name: "twitter:card", content: "summary" } },
        { element: "meta", attributes: { name: "twitter:title", content: metadata.title } },
        { element: "meta", attributes: { name: "twitter:description", content: metadata.description } }
    ];

    if (url) {
        tags.push(
            { element: "link", attributes: { rel: "canonical", href: url } },
            { element: "meta", attributes: { property: "og:url", content: url } }
        );
    }

    return tags;
}

export function renderHeadTags(metadata, siteUrl) {
    const tags = getHeadTags(metadata, siteUrl).map(({ element, attributes }) => {
        const attributeText = Object.entries(attributes)
            .map(([name, value]) => `${name}="${escapeHtml(value)}"`)
            .join(" ");
        return `<${element} ${attributeText} />`;
    });

    return [`<title>${escapeHtml(metadata.title)}</title>`, ...tags].join("\n        ");
}

export function injectHeadTags(html, metadata, siteUrl) {
    const start = html.indexOf(headStartMarker);
    const end = html.indexOf(headEndMarker);

    if (start === -1 || end < start) {
        throw new Error(`index.html must contain ${headStartMarker} and ${headEndMarker}`);
    }

    return `${html.slice(0, start + headStartMarker.length)}\n        ${renderHeadTags(metadata, siteUrl)}\n        ${html.slice(end)}`;
}

export function renderSitemap(routes, siteUrl) {
    const entries = routes.map((route) => `    <url>\n        <loc>${escapeHtml(absoluteUrl(siteUrl, route.path))}</loc>\n    </url>`);
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}

export function renderRobots(siteUrl) {
    return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${absoluteUrl(siteUrl, "/sitemap.xml")}\n`;
}
