import heroImage from "../../../assets/images/industry-technology-detail.png";

export default {
    slug: "technology",
    breadcrumb: "Technology",
    blocks: [
        {
            type: "industry-hero",
            tags: ["EB-2", "H-1B"],
            title: [
                { text: "Specialist talent, landed now and " },
                { text: "kept for good", accent: true },
                { text: "." }
            ],
            description:
                "Software engineers, data scientists, and specialists don't come from a local pipeline. We file H-1B to get your hire working now — through the cap, the lottery, and the specialty-occupation standard — and EB-2 to make them permanent. One firm across the whole arc, from the first petition to the green card.",
            image: heroImage,
            imageAlt: "Three engineers examining a circuit board together at a desk in a tech office"
        },
        {
            type: "industry-routes",
            eyebrow: "Routes for this sector",
            title: "Two routes — one to start, one to stay.",
            items: [
                {
                    code: "H-1B",
                    tag: "Specialty occupation",
                    title: "Get your specialist working now",
                    description:
                        "H-1B is the route for a role that genuinely requires a specific degree — engineers, scientists, specialists. It's cap-subject, so selection runs through the annual lottery, and it allows dual intent, so pursuing a green card later doesn't put it at risk. We handle the registration, the LCA and prevailing wage, and the specialty-occupation case — and if a hire isn't selected, we have a backup mapped the same day.",
                    roles: "Software engineers · Data scientists · Security analysts · Systems analysts"
                },
                {
                    code: "EB-2",
                    tag: "Permanent",
                    title: "Make the hire permanent",
                    description:
                        "EB-2 is the green card for advanced-degree professionals — a master's, or a bachelor's with progressive experience. It runs through PERM labor certification, then the petition and the green card. For researchers and specialists whose work carries national importance, the National Interest Waiver can skip PERM entirely.",
                    roles: "Research scientists · Data scientists · Hardware engineers · Network architects"
                }
            ]
        },
        {
            type: "industry-roles",
            eyebrow: "Roles we file",
            title: "Technology occupations, sorted by route.",
            groups: [
                {
                    title: "Specialty occupations",
                    code: "H-1B",
                    items: [
                        { title: "Computer systems analysts", code: "15-1211" },
                        { title: "Information security analysts", code: "15-1212" },
                        { title: "Software developers", code: "15-1252" },
                        { title: "Web developers", code: "15-1254" },
                        { title: "Data scientists", code: "15-2051" }
                    ],
                    note: "Roles that require a specific bachelor's degree — filed against the annual H-1B cap."
                },
                {
                    title: "Advanced-degree roles",
                    code: "EB-2",
                    items: [
                        { title: "Computer & info research scientists", code: "15-1221" },
                        { title: "Data scientists", code: "15-2051" },
                        { title: "Computer hardware engineers", code: "17-2061" },
                        { title: "Electrical engineers", code: "17-2071" }
                    ],
                    note: "A master's, or a bachelor's plus progressive experience — the EB-2 permanent track."
                },
                {
                    title: "Architecture & senior",
                    code: "EB-2",
                    items: [
                        { title: "Computer network architects", code: "15-1241" },
                        { title: "Database architects", code: "15-1243" },
                        { title: "Systems administrators / DevOps", code: "15-1244" }
                    ],
                    note: "Senior technical roles that meet the EB-2 experience threshold."
                }
            ]
        },
        {
            type: "industry-process",
            eyebrow: "How a filing runs here",
            title: "Get them working now, then make it permanent.",
            tracks: [
                {
                    code: "Track 01",
                    title: "Land the hire — H-1B",
                    steps: [
                        {
                            code: "01",
                            title: "Registration & selection",
                            description:
                                "Enter the annual H-1B registration; selection runs by lottery, with a second chance under the advanced-degree cap."
                        },
                        {
                            code: "02",
                            title: "LCA & prevailing wage",
                            description:
                                "File the Labor Condition Application attesting to the wage and conditions — an attestation, not a labor-market test."
                        },
                        {
                            code: "03",
                            title: "Petition to USCIS",
                            description:
                                "File the I-129 with the specialty-occupation evidence; premium processing is available to speed it."
                        },
                        {
                            code: "04",
                            title: "Start work",
                            description:
                                "The hire begins on the approved H-1B start date, and the green-card plan starts alongside it."
                        }
                    ]
                },
                {
                    code: "Track 02",
                    title: "Make it permanent — EB-2",
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
                "Timing depends on the H-1B registration and cap for the year, the Visa Bulletin, and the form editions and premium-processing availability at filing. We confirm the live picture on every matter rather than working from fixed dates."
        },
        {
            type: "industry-execution",
            eyebrow: "How we get it done",
            title: "We handle what it takes to land the hire and keep them.",
            items: [
                {
                    title: "We maximize your lottery odds",
                    description:
                        "We file every eligible registration and use the advanced-degree cap for a second selection where the candidate qualifies. If a hire isn't picked, we line up a fallback — cap-exempt options, O-1 for standout profiles, or a direct permanent filing — instead of losing a year."
                },
                {
                    title: "We build the specialty-occupation case",
                    description:
                        "The petition has to show the role truly requires the degree. We document it to the current standard so it clears cleanly, and we're ready if a request for evidence comes back."
                },
                {
                    title: "We start the green card early",
                    description:
                        "H-1B is a clock, not a destination. We begin the EB-2 while there's runway, so permanent status is underway well before the H-1B years run down."
                },
                {
                    title: "We set the budget up front",
                    description:
                        "We pull the prevailing wage for every role and location before you commit, so your costs are known from day one and nothing lands as a surprise later."
                }
            ]
        },
        {
            type: "industry-testimonial",
            eyebrow: "Proof",
            title: "In their words.",
            quote:
                "We're a small team without an in-house legal function, so Corvell is effectively our immigration department. They're fast, they're precise, and they make a genuinely stressful process feel routine. Every filing has been clean, their updates are proactive, and their advice has saved us from more than one costly misstep. I'd recommend them without hesitation.",
            author: "Sofia Almeida",
            role: "Head of People · Halcyon Labs"
        },
        {
            type: "industry-benefits",
            eyebrow: "Why Corvell, for technology",
            title: "Built for the way you actually hire.",
            items: [
                {
                    title: "Built for hiring waves",
                    description:
                        "A cap season is a cohort of engineers, not one case. We run the whole group on a program rate and a shared timeline — not an hourly meter that punishes volume."
                },
                {
                    title: "The right route for each hire",
                    description:
                        "H-1B to land them, EB-2 to keep them, O-1 or a National Interest Waiver for the standout profiles. We don't force everyone through the lottery."
                },
                {
                    title: "One dashboard for every case",
                    description:
                        "Each engineer's H-1B and green-card status in one place — not scattered across threads with an associate you can't reach."
                },
                {
                    title: "A team that runs it for you",
                    description:
                        "Registrations, LCAs, PERM, and compliance handled end to end, so your recruiters and eng leads stay focused on building."
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
                    title: "Healthcare",
                    tags: ["Schedule A", "EB-3"],
                    description:
                        "Permanent clinical hiring, with a shortage-list shortcut for nurses and therapists.",
                    path: "/industries/healthcare"
                },
                {
                    title: "Manufacturing",
                    tags: ["EB-3"],
                    description: "Permanent skilled and production roles on the EB-3 / PERM track.",
                    path: "/industries/manufacturing"
                },
                {
                    title: "Senior & long-term care",
                    tags: ["Schedule A", "EB-3"],
                    description: "Nursing and direct-care roles, with Schedule A for RNs.",
                    path: "/industries/senior-care"
                }
            ]
        }
    ]
};
