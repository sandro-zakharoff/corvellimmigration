import insightsFeaturedImage from "../assets/images/insights-featured.jpg";

export const guides = [
    { title: "How to sponsor an EB-2 employee", path: "/insights/guides/eb-2-sponsorship" },
    { title: "How PERM labor certification works", path: "/insights/guides/perm-labor-certification" },
    { title: "Sponsoring an H-1B specialty worker", path: "/insights/guides/h-1b-sponsorship" },
    { title: "Running a compliant H-2B seasonal program", path: "/insights/guides/h-2b-program" }
];

export const insightsPageContent = {
    intro: {
        eyebrow: "Insights",
        title: "Where employer immigration stands.",
        description:
            "A quarterly read on the numbers that move workforce planning — processing times, priority dates, fees, and policy — plus practical guides for HR and operations teams."
    },
    featured: {
        label: "Current",
        meta: "August 2026 · Quarterly Brief",
        title: "August 2026 Employer Immigration Brief",
        description:
            "Everything that moved this quarter — fees, processing times, Visa Bulletin, and policy — in one employer-focused read, with what each change means for your filings.",
        path: "/insights/briefs/august-2026-employer-immigration-brief",
        image: insightsFeaturedImage,
        imageAlt: "Stacks of immigration case documents on an office desk"
    },
    archive: {
        eyebrow: "Archive",
        title: "Previous quarters.",
        items: [
            {
                quarter: "Q3 2026",
                month: "July 2026",
                title: "Denial Patterns: What's Getting Flagged in Employment Petitions",
                category: "RFE / Denials",
                description:
                    "The evidence gaps drawing RFEs and denials in employment petitions this quarter — and how to close them before filing.",
                path: "/insights/briefs/q3-2026-denial-patterns"
            },
            {
                quarter: "Q2 2026",
                month: "April 2026",
                title: "PERM & Prevailing-Wage Watch",
                category: "PERM",
                description:
                    "Prevailing-wage movement, wage-level shifts, and where DOL audit activity is trending for labor-certification filings.",
                path: "/insights/briefs/q2-2026-perm-prevailing-wage"
            },
            {
                quarter: "Q1 2026",
                month: "January 2026",
                title: "2025 in Numbers: Approval & RFE Trends by Category",
                category: "Data / Trends",
                description:
                    "Approval rates and RFE trends across EB-2, EB-3, PERM, and H-2B for the full year, and what shifted from 2024.",
                path: "/insights/briefs/q1-2026-approval-rfe-trends"
            },
            {
                quarter: "Q4 2025",
                month: "October 2025",
                title: "Priority Dates in Focus: Where EB-2 & EB-3 Stand",
                category: "Visa Bulletin",
                description:
                    "EB-2 and EB-3 movement this quarter, and a plain read on what the current waits mean for hiring plans.",
                path: "/insights/briefs/q4-2025-priority-dates"
            },
            {
                quarter: "Q3 2025",
                month: "July 2025",
                title: "H-2B Mid-Year Readout: Cap, Timing & What to Do Now",
                category: "H-2B",
                description:
                    "Where the cap stands, how second-half timing looks, and the steps seasonal employers should take now.",
                path: "/insights/briefs/q3-2025-h-2b-mid-year-readout"
            },
            {
                quarter: "Q2 2025",
                month: "April 2025",
                title: "Processing-Time Snapshot: EB-2, EB-3, PERM & H-2B",
                category: "Processing times",
                description:
                    "Current USCIS and DOL timelines for the categories employers file most, measured quarter over quarter.",
                path: "/insights/briefs/q2-2025-processing-time-snapshot"
            },
            {
                quarter: "Q1 2025",
                month: "January 2025",
                title: "Employer Immigration Brief: 2024 in Review",
                category: "Retrospective",
                description:
                    "The fee changes, processing shifts, and policy moves that shaped employer filings in 2024 — and what carried into 2025.",
                path: "/insights/briefs/q1-2025-2024-in-review"
            }
        ]
    },
    guides: {
        eyebrow: "Guides",
        title: "Plain-language guides to the visas we file.",
        description: "Free, downloadable, and written for HR and operations — not lawyers."
    }
};
