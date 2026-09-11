import heroImage from "../../../assets/images/industry-hospitality-detail.png";

export default {
    slug: "hospitality",
    breadcrumb: "Hospitality",
    blocks: [
        {
            type: "industry-hero",
            tags: ["H-2B", "EB-3"],
            title: [
                { text: "Guest-ready staff, filed to your " },
                { text: "occupancy calendar", accent: true },
                { text: "." }
            ],
            description:
                "Hotels, resorts, and restaurants live on being fully staffed when guests arrive. We file H-2B temporary staff and EB-3 permanent hires backward from your date of need — so the floor, the kitchen, and the front desk are covered before the rush, not scrambling after it.",
            image: heroImage,
            imageAlt: "A hotel front-desk clerk checking in a guest with luggage while staff work in the lobby behind her"
        },
        {
            type: "industry-routes",
            eyebrow: "Routes for this sector",
            title: "Two lanes, matched to how you staff.",
            items: [
                {
                    code: "H-2B",
                    tag: "Temporary need",
                    title: "Temporary staff for your busy season",
                    description:
                        "H-2B covers temporary labor needs — seasonal, peak-load, intermittent, or one-time. Hospitality is one of its most established uses: resort towns, summer and winter peaks, event-driven demand. The petition period can run up to a year and be extended, so it maps to your real occupancy cycle. We build the filing around your calendar and the roles you're covering.",
                    roles: "Housekeepers · Line cooks · Servers · Front-desk staff"
                },
                {
                    code: "EB-3",
                    tag: "Permanent",
                    title: "Green cards for the people who run your floor",
                    description:
                        "The chefs, supervisors, and skilled staff you want to keep past the season. Runs through PERM labor certification — prevailing wage, a real test of the local market, then the petition and the green card. It's how you hold onto the people who set the standard your guests come back for.",
                    roles: "Chefs · Kitchen supervisors · Bakers · Skilled cooks"
                }
            ]
        },
        {
            type: "industry-roles",
            eyebrow: "Roles we file",
            title: "Hospitality occupations, sorted by route.",
            groups: [
                {
                    title: "Temporary staff",
                    code: "H-2B",
                    items: [
                        { title: "Cooks, restaurant", code: "35-2014" },
                        { title: "Waiters & waitresses", code: "35-3031" },
                        { title: "Dishwashers", code: "35-9021" },
                        { title: "Housekeeping cleaners", code: "37-2012" },
                        { title: "Hotel & resort desk clerks", code: "43-4081" }
                    ],
                    note: "For a defined peak or seasonal need — filed within the DOL window before your start date."
                },
                {
                    title: "Skilled roles",
                    code: "EB-3 · Skilled",
                    items: [
                        { title: "Chefs & head cooks", code: "35-1011" },
                        { title: "Food-service supervisors", code: "35-1012" },
                        { title: "Maintenance & repair workers", code: "49-9071" },
                        { title: "Bakers", code: "51-3011" }
                    ],
                    note: "Roles with 2+ years of training or experience — the faster-moving EB-3 subcategory."
                },
                {
                    title: "General staff",
                    code: "EB-3 · Other worker",
                    items: [
                        { title: "Dining-room & cafeteria attendants", code: "35-9011" },
                        { title: "Dishwashers", code: "35-9021" },
                        { title: "Housekeeping cleaners", code: "37-2012" }
                    ],
                    note: "Permanent roles that need under two years of experience. We stage these for the fastest realistic path."
                }
            ]
        },
        {
            type: "industry-process",
            eyebrow: "How a filing runs here",
            title: "We file backward from your date of need.",
            tracks: [
                {
                    code: "Track 01",
                    title: "Temporary staff — H-2B",
                    steps: [
                        {
                            code: "01",
                            title: "Set the date of need",
                            description:
                                "The start of your season or peak anchors everything. We work the calendar back from it."
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
                                "I-129 to USCIS, then consular processing so staff arrive before occupancy climbs."
                        }
                    ]
                },
                {
                    code: "Track 02",
                    title: "Permanent staff — EB-3",
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
        {
            type: "industry-execution",
            eyebrow: "How we get it done",
            title: "We handle what it takes to get your staff approved and on the floor.",
            items: [
                {
                    title: "We build the case for approval",
                    description:
                        "We structure each filing around a well-documented need and present it to DOL's standard, so it's ready to clear the first time. Getting the petition approved is the whole job — and it's ours, not yours."
                },
                {
                    title: "We drive the timeline",
                    description:
                        "We work backward from your date of need and manage the cap and filing windows, so the people you're counting on are cleared and ready before occupancy climbs."
                },
                {
                    title: "We set the budget up front",
                    description:
                        "We pull the prevailing wage for every role and location before you commit, so your costs are known from day one and nothing lands as a surprise later."
                },
                {
                    title: "We sequence for speed",
                    description:
                        "We put each role on the fastest route it qualifies for and stage the permanent cases in the right order, so your team comes together as quickly as the categories allow."
                }
            ]
        },
        {
            type: "industry-testimonial",
            eyebrow: "Proof",
            title: "In their words.",
            quote:
                "Corvell files our seasonal staff ahead of our peak, so housekeeping and the kitchen are covered before occupancy climbs. They handle the whole process and the pricing is clear up front — it's taken a recurring headache off our plate.",
            author: "Ramona Vasquez",
            role: "Director of Talent · Sunridge Hospitality Group"
        },
        {
            type: "industry-benefits",
            eyebrow: "Why Corvell, for hospitality",
            title: "Built for the way you actually staff.",
            items: [
                {
                    title: "Built for volume",
                    description:
                        "A peak is dozens of petitions, not one. We run the whole roster on a program rate and a filing calendar — not an hourly meter that punishes scale."
                },
                {
                    title: "Filed backward from your peak",
                    description:
                        "We work back from your date of need so staff clear in time. Fully covered before occupancy climbs is the entire point of the program."
                },
                {
                    title: "One dashboard for the season",
                    description:
                        "Every petition's status in one place — not a dozen email threads with an associate you can't get on the phone."
                },
                {
                    title: "A team that runs it for you",
                    description:
                        "Filings, recruitment, and compliance handled end to end, so your managers stay on the floor instead of chasing paperwork."
                }
            ]
        },
        {
            type: "industry-cost",
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
        {
            type: "industry-related",
            eyebrow: "Related industries",
            title: "Sectors that hire the same way.",
            items: [
                {
                    title: "Food & seafood processing",
                    tags: ["H-2B", "EB-3"],
                    description:
                        "The same two-lane mix — temporary peak crews plus permanent line staff.",
                    path: "/industries/food-processing"
                },
                {
                    title: "Landscaping & grounds",
                    tags: ["H-2B"],
                    description:
                        "The same H-2B track at even higher volume — one of the largest users of the visa.",
                    path: "/industries/landscaping"
                },
                {
                    title: "Construction",
                    tags: ["H-2B", "EB-3"],
                    description:
                        "Temporary crews on a build schedule, with a permanent lane for skilled trades.",
                    path: "/industries/construction"
                }
            ]
        }
    ]
};
