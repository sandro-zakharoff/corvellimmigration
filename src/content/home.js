import heroImage from "../assets/images/hero-employment-immigration.webp";

export const homePageContent = {
    hero: {
        eyebrow: "Employment-based immigration practice",
        titleParts: [
            { text: "AI-powered" },
            { text: "employment", accent: true },
            { text: "immigration" }
        ],
        image: heroImage,
        imageAlt: ""
    },
    servicesOverview: {
        eyebrow: "What we do",
        title: "Employment immigration, organized around your business needs.",
        link: { label: "Explore all services", path: "/services" }
    },
    industriesShowcase: {
        eyebrow: "Who we serve",
        title: "Industries that run on the workforce we handle.",
        clientsLabel: "Companies we run programs for"
    },
    whyCorvell: {
        eyebrow: "Why Corvell",
        title: "A leaner firm, built on software, that gets approvals."
    },
    guidesInsights: {
        eyebrow: "Guides & insights",
        title: "Plain-language guides to the visas we file.",
        footerLink: {
            label: "Visit Insights — statistics & guides",
            path: "/insights",
            showArrow: false
        }
    }
};
