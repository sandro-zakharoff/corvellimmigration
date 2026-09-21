import constructionImage from "../assets/images/industry-construction.webp";
import foodProcessingImage from "../assets/images/industry-food-processing.webp";
import healthcareImage from "../assets/images/industry-healthcare.webp";
import hospitalityImage from "../assets/images/industry-hospitality.webp";
import landscapingImage from "../assets/images/industry-landscaping.webp";
import manufacturingImage from "../assets/images/industry-manufacturing.webp";
import seniorCareImage from "../assets/images/industry-senior-care.webp";
import technologyImage from "../assets/images/industry-technology.webp";
import industriesContextImage from "../assets/images/industries-context.jpg";
import industriesHeroImage from "../assets/images/industries-hero.jpg";
import cedarGroveLogo from "../assets/images/logo-cedar-grove.png";
import keystoneLogo from "../assets/images/logo-keystone.png";
import tidemarkLogo from "../assets/images/logo-tidemark.png";
import lakeshoreLogo from "../assets/images/logo-lakeshore.png";
import sunridgeLogo from "../assets/images/logo-sunridge.png";
import halcyonLabsLogo from "../assets/images/logo-halcyon-labs.png";
import cypressLogo from "../assets/images/logo-cypress.png";
import forgelineLogo from "../assets/images/logo-forgeline.png";

export const industries = [
    {
        title: "Construction",
        visas: "H-2B · EB-3",
        visaTypes: ["H-2B", "EB-3"],
        description: "Skilled trades and project crews for firms scaling headcount against a build schedule.",
        directoryDescription:
            "Skilled trades and project crews for firms scaling headcount against a build schedule.",
        roles: "Carpenters · Electricians · Concrete finishers · Equipment operators",
        typical: "Peak-season crews on H-2B; long-term tradespeople on EB-3.",
        image: constructionImage,
        path: "/industries/construction"
    },
    {
        title: "Hospitality",
        visas: "H-2B · EB-3",
        visaTypes: ["H-2B", "EB-3"],
        description: "Seasonal and year-round service staff for hotels, resorts, and food service operators.",
        directoryDescription:
            "Seasonal and year-round service staff for hotels, resorts, and food-service operators.",
        roles: "Housekeepers · Line cooks · Servers · Front-desk staff",
        typical: "High-volume seasonal filing tied to your occupancy calendar.",
        image: hospitalityImage,
        path: "/industries/hospitality"
    },
    {
        title: "Healthcare",
        visas: "SCHEDULE A · EB-3",
        visaTypes: ["Schedule A", "EB-3"],
        description: "Nurses, therapists, and allied staff — including the Schedule A shortage track.",
        directoryDescription:
            "Nurses, therapists, and allied staff — including the Schedule A shortage track that skips the labor market test.",
        roles: "Registered nurses · Physical therapists · Med technologists · CNAs",
        typical: "Schedule A for RNs & PTs; EB-3 for allied roles.",
        image: healthcareImage,
        path: "/industries/healthcare"
    },
    {
        title: "Technology",
        visas: "EB-2 · H-1B",
        visaTypes: ["EB-2", "H-1B"],
        description: "Engineers and specialists on advanced-degree and specialty-occupation routes.",
        directoryDescription:
            "Engineers and specialists on advanced-degree and specialty-occupation routes.",
        roles: "Software engineers · Data scientists · DevOps engineers · IT specialists",
        typical: "H-1B for specialty roles; EB-2 for advanced-degree permanent hires.",
        image: technologyImage,
        path: "/industries/technology"
    },
    {
        title: "Landscaping & grounds",
        visas: "H-2B",
        visaTypes: ["H-2B"],
        description: "High-volume seasonal programs — one of the largest users of the visa.",
        directoryDescription:
            "High-volume seasonal programs — one of the largest users of the H-2B visa.",
        roles: "Landscape laborers · Groundskeepers · Irrigation techs · Tree trimmers",
        typical: "Recurring seasonal need filed against the spring–fall window.",
        image: landscapingImage,
        path: "/industries/landscaping"
    },
    {
        title: "Manufacturing",
        visas: "EB-3",
        visaTypes: ["EB-3"],
        description: "Skilled and production roles filled on the permanent EB-3 track.",
        directoryDescription: "Skilled and production roles filled on the permanent EB-3 track.",
        roles: "Machinists · Welders · Assemblers · Production supervisors",
        typical: "Long-term line staffing through PERM and EB-3.",
        image: manufacturingImage,
        path: "/industries/manufacturing"
    },
    {
        title: "Senior & long-term care",
        visas: "SCHEDULE A · EB-3",
        visaTypes: ["Schedule A", "EB-3"],
        description: "Direct-care workers and facility nursing — Schedule A eligible.",
        directoryDescription:
            "Direct-care workers and facility nursing — Schedule A eligible for the nursing shortage.",
        roles: "CNAs · LPNs · Home health aides · Registered nurses",
        typical: "Schedule A for RNs; EB-3 for direct-care and aide roles.",
        image: seniorCareImage,
        path: "/industries/senior-care"
    },
    {
        title: "Food & seafood processing",
        visas: "H-2B · EB-3",
        visaTypes: ["H-2B", "EB-3"],
        description: "Peak-season crews and permanent line roles for processors and packers.",
        directoryDescription: "Peak-season crews and permanent line roles for processors and packers.",
        roles: "Meat/fish cutters · Packers · Line workers · Machine operators",
        typical: "Seasonal H-2B crews plus permanent EB-3 line staff.",
        image: foodProcessingImage,
        path: "/industries/food-processing"
    }
];

export const clientLogos = [
    { name: "Keystone Concrete Group", image: keystoneLogo },
    { name: "Sunridge Hospitality Group", image: sunridgeLogo },
    { name: "Lakeshore Health Partners", image: lakeshoreLogo },
    { name: "Halcyon Labs", image: halcyonLabsLogo },
    { name: "Cypress Grounds Management", image: cypressLogo },
    { name: "Forgeline", image: forgelineLogo },
    { name: "Cedar Grove Care Group", image: cedarGroveLogo },
    { name: "Tidemark", image: tidemarkLogo }
];

export const industryTickerItems = [
    { value: "H-2B", label: "Seasonal / peak-load", width: 278 },
    { value: "EB-3", label: "Permanent skilled & unskilled", width: 350 },
    { value: "Schedule A", label: "Shortage occupations", width: 335 },
    { value: "EB-2", label: "Advanced degree", width: 238 },
    { value: "H-1B", label: "Specialty occupation", width: 286 },
    { value: "TN · E-3", label: "Treaty professionals", width: 314 }
];

export const industriesPageContent = {
    hero: {
        eyebrow: "Industries",
        titleParts: [
            { text: "The workforce you run, " },
            { text: "mapped", accent: true },
            { text: " to the route that fits." }
        ],
        description:
            "We build employment-based immigration programs around how each sector actually hires — seasonal crews, permanent line staff, shortage occupations, and specialty professionals.",
        image: industriesHeroImage
    },
    context: {
        eyebrow: "Why we start with industry",
        title: "The right visa depends on the work — not just the worker.",
        paragraphs: [
            "The same job title can run through completely different filings depending on the sector: a cook on a resort's summer calendar is an H-2B matter; a production line you're staffing for good is an EB-3 one; a nurse can move on Schedule A while an allied-health colleague cannot.",
            "Every industry below is organized around that reality — the routes that actually fit its hiring pattern, the roles we file most, and the shape of a typical program. Pick the sector closest to yours to see how it works."
        ],
        image: industriesContextImage
    },
    directory: {
        eyebrow: "All industries",
        title: "Eight sectors we build programs for."
    },
    method: {
        eyebrow: "How we work",
        title: "The same method, whatever the sector.",
        steps: [
            {
                code: "01",
                title: "Route selection",
                description:
                    "We match each role to the category with the cleanest path — H-2B, EB-3, Schedule A, EB-2, or H-1B — rather than forcing everyone through one."
            },
            {
                code: "02",
                title: "Program design",
                description:
                    "For recurring needs, we build a filing calendar around your season or hiring plan, so petitions land ahead of when the people are needed."
            },
            {
                code: "03",
                title: "Filing & prosecution",
                description:
                    "PERM, labor certification, and petition prep run through structured, auditable workflows — with attorney oversight on every matter."
            },
            {
                code: "04",
                title: "Compliance",
                description:
                    "Public-access files, I-9, and audit readiness stay current between filings, so the program holds up if the government looks."
            }
        ]
    },
    cta: {
        eyebrow: "Not listed here?",
        title: "Don't see your industry?",
        description:
            "We file across the employment-based categories. If you hire foreign workers, there's almost always a route — tell us the roles and we'll map it.",
        link: {
            label: "Tell us your roles",
            path: "/contact"
        }
    }
};
