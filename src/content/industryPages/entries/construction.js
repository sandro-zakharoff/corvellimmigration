import heroImage from "../../../assets/images/industry-construction-detail.webp";
import testimonialImage from "../../../assets/images/testimonial-denise-okafor.webp";

export default {
    slug: "construction",
    breadcrumb: "Construction",
    hero: {
        tags: ["H-2B", "EB-3"],
        title: "The trades gap, filed to your build schedule.",
        description:
            "Construction runs on crews that have to be there when the work starts. We file H-2B temporary crews and EB-3 permanent tradespeople backward from your date of need — so headcount is on the job when the work begins, not weeks behind it.",
        image: heroImage,
        imageAlt: "Construction crew working on a concrete foundation"
    },
    routes: {
        eyebrow: "Routes for this sector",
        title: "Two lanes, matched to how you're hiring.",
        items: [
            {
                code: "H-2B",
                tag: "Temporary need",
                title: "Temporary crews, matched to a defined need",
                description:
                    "H-2B covers temporary labor needs — seasonal, peak-load, intermittent, or one-time. The petition period can run up to a year and be extended, so it fits a project ramp or a demand cycle you can define, not only a short season. We build the filing around the need you actually have and the roles you're staffing.",
                roles: "Concrete finishers · Cement masons · Construction laborers · Helpers"
            },
            {
                code: "EB-3",
                tag: "Permanent",
                title: "Green cards for the tradespeople you want to keep",
                description:
                    "The skilled roles that are hard to fill locally and worth the permanent investment. Runs through PERM labor certification — prevailing wage, a real test of the local market, then the petition and the green card. It's the route for a crew you want to keep for the long term.",
                roles: "Carpenters · Electricians · Ironworkers · Equipment operators · Structural welders"
            }
        ]
    },
    roles: {
        eyebrow: "Roles we file",
        title: "Construction occupations, sorted by route.",
        groups: [
            {
                title: "Temporary crew",
                code: "H-2B",
                items: [
                    { title: "Cement masons & concrete finishers", code: "47-2051" },
                    { title: "Construction laborers", code: "47-2061" },
                    { title: "Helpers — roofers", code: "47-3016" },
                    { title: "Helpers — construction trades", code: "47-3019" }
                ],
                note:
                    "For a defined project, peak, or seasonal need — filed within the DOL window before your start date."
            },
            {
                title: "Skilled trades",
                code: "EB-3 · Skilled",
                items: [
                    { title: "Carpenters", code: "47-2031" },
                    { title: "Equipment operators", code: "47-2073" },
                    { title: "Electricians", code: "47-2111" },
                    { title: "Plumbers & pipefitters", code: "47-2152" },
                    { title: "Structural iron & steel workers", code: "47-2221" },
                    { title: "Welders", code: "51-4121" }
                ],
                note: "Roles with 2+ years of training or experience — the faster-moving EB-3 subcategory."
            },
            {
                title: "General labor",
                code: "EB-3 · Other worker",
                items: [
                    { title: "Construction laborers", code: "47-2061" },
                    { title: "Material movers, hand", code: "53-7062" }
                ],
                note:
                    "Permanent roles that need under two years of experience. We stage these for the fastest realistic path."
            }
        ]
    },
    process: {
        eyebrow: "How a filing runs here",
        title: "We file backward from your date of need.",
        tracks: [
            {
                code: "Track 01",
                title: "Temporary crew — H-2B",
                steps: [
                    {
                        code: "01",
                        title: "Set the date of need",
                        description:
                            "Your season or project start anchors everything. We work the calendar back from it."
                    },
                    {
                        code: "02",
                        title: "Wage & job order",
                        description: "DOL prevailing wage, then the state job order posted to test the local market."
                    },
                    {
                        code: "03",
                        title: "Temporary labor cert",
                        description:
                            "Recruitment run, then the DOL application filed inside the required pre-start window."
                    },
                    {
                        code: "04",
                        title: "Petition & consular",
                        description:
                            "Recruitment run, then the DOL application filed inside the required pre-start window."
                    }
                ]
            },
            {
                code: "Track 02",
                title: "Permanent crew — EB-3",
                steps: [
                    {
                        code: "01",
                        title: "Prevailing wage",
                        description: "DOL sets the wage floor for the role and location before recruitment starts."
                    },
                    {
                        code: "02",
                        title: "Recruitment",
                        description: "The mandatory recruitment period, genuinely testing the local labor market."
                    },
                    {
                        code: "03",
                        title: "PERM labor cert",
                        description: "File the ETA-9089; DOL certifies that no qualified local worker is available."
                    },
                    {
                        code: "04",
                        title: "Petition & green card",
                        description:
                            "I-140, then the priority date, then adjustment of status or consular processing."
                    }
                ]
            }
        ],
        note:
            "Timing depends on the current H-2B cap and allocation, DOL processing, and the Visa Bulletin at the time of filing. We confirm the live window and the current form editions on every matter rather than working from fixed dates."
    },
    execution: {
        eyebrow: "How we get it done",
        title: "We handle what it takes to get the crew approved and on-site.",
        items: [
            {
                title: "We build the case for approval",
                description:
                    "We structure each filing around a well-documented need and present it to DOL's standard, so it's ready to clear the first time. Getting the petition approved is the whole job — and it's ours, not yours."
            },
            {
                title: "We drive the timeline",
                description:
                    "We work backward from your date of need and manage the cap and filing windows, so the people you're counting on are cleared and ready when the work starts."
            },
            {
                title: "We set the budget up front",
                description:
                    "We pull the prevailing wage for every role and location before you commit, so your costs are known from day one and nothing lands as a surprise later."
            },
            {
                title: "We sequence for speed",
                description:
                    "We put each role on the fastest route it qualifies for and stage the permanent cases in the right order, so your crew comes together as quickly as the categories allow."
            }
        ]
    },
    testimonial: {
        eyebrow: "Proof",
        title: "In their words.",
        quote:
            "Corvell handles our filings end to end and keeps us ahead of our start dates, so the crews we need are cleared when the work begins. The pricing is straightforward and the communication is steady — it's made planning our workforce a lot easier.",
        author: "Denise Okafor",
        role: "VP, People & Field Ops · Keystone Concrete Group",
        image: testimonialImage
    },
    benefits: {
        eyebrow: "Why Corvell, for construction",
        title: "Built for the way you actually staff.",
        items: [
            {
                title: "Built for volume",
                description:
                    "A season is forty petitions, not one. We run the whole crew on a program rate and a filing calendar — not an hourly meter that punishes scale."
            },
            {
                title: "Filed backward from your start",
                description:
                    "We work back from your date of need so the crew clears in time. On-site when the work starts is the entire point of the program."
            },
            {
                title: "One dashboard for the season",
                description:
                    "Every petition's status in one place — not a dozen email threads with an associate you can't get on the phone."
            },
            {
                title: "Honest about what won't fly",
                description:
                    "If a program won't survive DOL's temporary-need test, we say so before you spend a dollar. A denial is more expensive than a straight answer."
            }
        ]
    },
    cost: {
        eyebrow: "What it costs",
        title: "Clear pricing, 20–40% below the usual.",
        description:
            "AI-assisted preparation and a lean team mean you're not paying for junior-associate hours or firm overhead — just the work your filings actually need.",
        points: [
            "One flat program rate, quoted up front.",
            "Easy to compare against your current firm, line by line.",
            "The more roles you file, the more you save."
        ],
        link: {
            label: "Get a cost comparison",
            path: "/contact"
        }
    },
    related: {
        eyebrow: "Related industries",
        title: "Sectors that hire the same way.",
        items: [
            {
                title: "Landscaping & grounds",
                tags: ["H-2B"],
                description:
                    "The same H-2B track at even higher volume — one of the largest users of the visa.",
                path: "/industries/landscaping"
            },
            {
                title: "Manufacturing",
                tags: ["EB-3"],
                description:
                    "Permanent skilled and production roles on the same EB-3 / PERM track as your trades.",
                path: "/industries/manufacturing"
            },
            {
                title: "Hospitality",
                tags: ["H-2B", "EB-3"],
                description:
                    "Temporary service crews on a demand calendar, with a permanent lane for the keepers.",
                path: "/industries/hospitality"
            }
        ]
    }
};
