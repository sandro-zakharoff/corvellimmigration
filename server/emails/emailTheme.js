export const emailTheme = {
    colors: {
        shell: "#e4e2d9",
        dark: "#0e1f25",
        paper: "#fbfaf6",
        ink: "#13262e",
        card: "#13272f",
        cardText: "#f4f2ea",
        accent: "#d9a03d",
        border: "#d8d6cd",
        label: "#3e7c87",
        tagline: "#5e6e72",
        footerBrand: "#e9e6dd",
        footerText: "#8ca0a2",
        copyright: "#5f7574"
    },
    fonts: {
        body: "-apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        heading: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        mono: "Consolas, Menlo, 'Courier New', Courier, monospace"
    }
};

export function escapeEmailHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
