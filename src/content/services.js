import nonImmigrantImage from "../assets/images/services-nonimmigrant.jpg";

export const serviceHighlights = [
    {
        title: "Permanent hires",
        label: "EB-2 · EB-3 · PERM",
        description:
            "Green-card sponsorship for skilled, professional, and unskilled roles you want to keep long-term."
    },
    {
        title: "Shortage occupations",
        label: "SCHEDULE A · GROUP I & II",
        description:
            "Streamlined permanent residence for nurses, physical therapists, and exceptional-ability roles — skipping the standard labor market test."
    },
    {
        title: { text: "Seasonal & peak-demand crews", path: "/h-2b", tone: "ink" },
        label: "H-2B",
        description:
            "Temporary non-agricultural workers for businesses with seasonal, peak-load, or one-time labor needs."
    },
    {
        title: "Specialty professionals",
        label: "H-1B",
        description: "Cap and cap-exempt specialty-occupation petitions for degree-required professional roles."
    },
    {
        title: "Compliance & audits",
        label: "I-9 · LCA / PAF · RFE RESPONSE",
        description:
            "Keeping your filings defensible — audit readiness, public-access files, and responses when the government pushes back."
    }
];

export const serviceTickerItems = [
    { value: "H-1B", label: "Specialty occupations", width: 286 },
    { value: "H-2B", label: "Seasonal crews", width: 230 },
    { value: "L-1", label: "Intracompany transfers", width: 284 },
    { value: "E-2", label: "Treaty investors", width: 236 },
    { value: "O-1", label: "Extraordinary ability", width: 276 },
    { value: "TN · E-3", label: "Treaty professionals", width: 314 }
];

export const servicesPageContent = {
    intro: {
        eyebrow: "Services",
        title: "Every employment-based route,",
        titleHighlight: "under one practice.",
        description:
            "From a first temporary hire to a permanent green card — and the compliance that keeps both defensible. Organized the way an employer actually files, not the way the statute is numbered."
    },
    nonImmigrant: {
        eyebrow: "01 — Non-immigrant",
        title: "Temporary work & business visas.",
        description:
            "Bring someone on for a defined period, move talent between offices, or place a treaty founder or investor — routes that authorize work without committing to permanent sponsorship.",
        image: nonImmigrantImage,
        cards: [
            {
                code: "E-2",
                title: "Treaty investors",
                description:
                    "Nationals of treaty countries directing a substantial investment in a US business, plus their essential employees.",
                fits: "Founders · Investors · Key operational staff"
            },
            {
                code: "O-1",
                title: "Extraordinary ability",
                description:
                    "Individuals at the top of their field — sciences, business, and athletics (O-1A) or the arts (O-1B).",
                fits: "Senior researchers · Specialists · Creatives"
            },
            {
                code: "H-1B",
                title: "Specialty occupations",
                description:
                    "Degree-required professional roles. Covers cap- subject lottery filings and cap-exempt employers.",
                fits: "Engineers · Analysts · Architects · Scientists"
            },
            {
                code: "H-2B",
                title: { text: "Seasonal & peak-demand crews", path: "/h-2b", tone: "ink" },
                description:
                    "Temporary non-agricultural workers for seasonal, peak-load, intermittent, or one-time needs. Runs through a DOL temporary labor certification.",
                fits: "Hospitality · Landscaping · Construction · Seafood"
            },
            {
                code: "L-1A · L-1B",
                title: "Intracompany transfers",
                description:
                    "Move executives and managers (L-1A) or specialized-knowledge staff (L-1B) from a foreign entity — including opening a new US office.",
                fits: "Multinationals opening or staffing US operations"
            },
            {
                code: "TN · E-3",
                title: "Treaty professionals",
                description:
                    "Streamlined specialty routes for USMCA professionals (Canada, Mexico) and Australian nationals.",
                fits: "Professionals from treaty countries"
            }
        ]
    },
    permanent: {
        eyebrow: "02 — Permanent residence",
        title: "Green-card sponsorship, by category.",
        description:
            "The routes to a permanent hire. Some reach a green card directly; others begin with labor certification.",
        cards: [
            {
                code: "EB-1",
                title: "Priority workers",
                description:
                    "Extraordinary ability (EB-1A), outstanding researchers and professors (EB-1B), and multinational managers and executives (EB-1C). No PERM required.",
                fits: "Top-tier talent · Senior transferees"
            },
            {
                code: "EB-2 · NIW",
                title: "Advanced degree & exceptional ability",
                description:
                    "Standard EB-2 runs through PERM. The National Interest Waiver route waives both the job offer and the labor certification.",
                fits: "Advanced-degree professionals · High-impact individuals"
            },
            {
                code: "EB-3",
                title: "Skilled, professional & other workers",
                description:
                    "The broadest permanent category — skilled (two- plus years), professional (degree), and other workers.",
                fits: "Skilled trades · Professionals · Production roles"
            },
            {
                code: "Schedule A",
                title: "Shortage occupations",
                description:
                    "Pre-certified roles — Group I nurses and physical therapists, and Group II exceptional ability — with no individual PERM recruitment.",
                fits: "Nurses · Physical therapists · Shortage roles"
            }
        ],
        note: "EB-1, EB-2 NIW, and Schedule A reach a green card without an individual labor certification."
    },
    laborCertification: {
        eyebrow: "03 — Labor certification",
        title: "PERM: testing the market before you sponsor.",
        description:
            "Most EB-2 and EB-3 sponsorships open with a Department of Labor certification confirming no able, willing, and qualified US worker is available for the role at the prevailing wage. We run it end to end.",
        steps: [
            {
                code: "STEP 01",
                title: "Prevailing wage",
                description:
                    "File the wage request and lock the minimum wage DOL will require for the role and location."
            },
            {
                code: "STEP 02",
                title: "Recruitment",
                description: "Run and document the required labor-market test within DOL's recruitment rules."
            },
            {
                code: "STEP 03",
                title: "ETA-9089",
                description:
                    "Prepare and file the labor certification on the current DOL form — clean and audit-ready."
            },
            {
                code: "STEP 04",
                title: "Audit & appeal",
                description: "Handle audits, supervised recruitment, and BALCA appeals if a case draws them."
            }
        ],
        note: "Schedule A, EB-1, and EB-2 NIW skip PERM entirely — we flag upfront when a role qualifies for a faster track."
    },
    compliance: {
        eyebrow: "04 — Compliance",
        title: "Keeping every filing defensible.",
        description:
            "The obligations that outlast the approval — verification, public-access files, and responses when the government pushes back.",
        items: [
            {
                title: "I-9 & E-Verify",
                label: "EMPLOYMENT ELIGIBILITY",
                description:
                    "Verification, internal audits, and remediation — before the government does it for you."
            },
            {
                title: "LCA & public access files",
                label: "H-1B · E-3",
                description: "Labor Condition Application postings and audit-ready public access files."
            },
            {
                title: "Program & wage terms",
                label: "H-1B · H-2B · PERM",
                description:
                    "Maintaining required wages, worksite rules, and PERM audit files through the life of a case."
            },
            {
                title: "RFEs, NOIDs & audits",
                label: "USCIS · DOL",
                description:
                    "Responses when the government pushes back, including Wage and Hour investigations."
            },
            {
                title: "Corporate changes",
                label: "AMENDMENTS · NOTICES",
                description:
                    "Amended filings and notifications for mergers, relocations, role changes, and reductions in force."
            }
        ]
    },
    cta: {
        title: "Not sure which route fits a role?",
        description:
            "Send us the position and the person. We'll map the options — and the cost — before you commit to anything.",
        link: {
            label: "Book a consultation",
            path: "/contact"
        }
    }
};
