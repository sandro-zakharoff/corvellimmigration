export default {
    slug: "q2-2025-processing-time-snapshot",
    breadcrumb: "Q2 2025 Snapshot",
    blocks: [
        {
            type: "insight-header",
            category: "Processing Times",
            meta: ["Q2 2025", "April 2025", "Employer immigration"],
            title: "Processing-Time Snapshot: EB-2, EB-3, PERM & H-2B",
            description: "Current USCIS and DOL timelines for the categories employers file most, measured quarter over quarter.",
            byline: "Corvell Immigration — Firm Insights"
        },
        {
            type: "content",
            blocks: [
                {
                    type: "paragraph",
                    variant: "lead",
                    text: "Processing time is the part of an immigration plan employers can neither speed up nor ignore — it sits between a hiring decision and the day a worker can actually start or receive a green card. This snapshot reads the government's own queues as of the start of the second quarter and compares them with where they stood in January, so a hiring plan can be built on the wait that exists rather than the one people remember."
                },
                {
                    type: "aside",
                    title: "How to read these numbers",
                    text: "The Department of Labor posts the filing month it is currently adjudicating, so the wait is roughly the gap between that month and today. USCIS posts median completion times. Both are medians across many cases — an individual file can move faster or slower, and a request for evidence resets the clock. Figures here are drawn from the USCIS processing-times page and the DOL OFLC FLAG dashboard."
                },
                {
                    type: "section",
                    number: "§ 01",
                    title: "PERM and prevailing wage: the long pole",
                    blocks: [
                        {
                            type: "paragraph",
                            text: "For a standard EB-2 or EB-3 case, the labor certification stage at DOL is the single largest block of time, and it comes in two parts. First a prevailing wage determination (PWD), then, after recruitment, the PERM application itself (Form ETA-9089). Both are queued by filing month, and the good news this quarter is that the wage queue is moving faster than the calendar."
                        },
                        {
                            type: "table",
                            caption: "DOL OFLC queues — as of April 1, 2025",
                            columns: ["Stage", "Now adjudicating", "Approx. wait", "vs. Q1 (Jan 1)"],
                            columnWidths: [374, 200, 160, 168],
                            mono: true,
                            rows: [
                                ["Prevailing wage — OEWS (standard)", { text: "Nov 2024 requests", tone: "muted" }, { text: "~4–5 mo", tone: "ink" }, { text: "↑ faster", tone: "muted" }],
                                ["Prevailing wage — non-OEWS (surveys)", { text: "Oct 2024 requests", tone: "muted" }, { text: "~5–6 mo", tone: "ink" }, { text: "↑ faster", tone: "muted" }],
                                ["PERM analyst review (ETA-9089)", { text: "Dec 2023 filings", tone: "muted" }, { text: "~15–16 mo", tone: "ink" }, { text: "↑ inching", tone: "muted" }],
                                ["Audit review", { text: "Not posted", tone: "muted" }, { text: "—", tone: "ink" }, { text: "RFIs instead", tone: "muted" }],
                                ["Reconsideration (appeal to CO)", { text: "Feb 2025 requests", tone: "muted" }, { text: "weeks", tone: "ink" }, { text: "↑ faster", tone: "muted" }]
                            ]
                        },
                        {
                            type: "paragraph",
                            text: "Queue positions from the DOL FLAG dashboard. The mandatory recruitment and \"quiet period\" (a legal minimum of two months, often more) runs before analyst review and is employer-controlled, so it is not counted in the figures above."
                        },
                        {
                            type: "paragraph",
                            text: "The wage queue told a clearly improving story: at the start of January, DOL was issuing standard PWDs for requests filed the previous June; by the start of April it had reached November, closing roughly five months of backlog in a single quarter. Survey-based (non-OEWS) requests ran a month or so behind that and remain the slower path."
                        },
                        {
                            type: "paragraph",
                            text: [
                                { text: "PERM analyst review is the stubborn one. At the start of April, DOL was reviewing applications filed in ", tone: "muted" },
                                { text: "December 2023", tone: "ink" },
                                { text: " — a wait in the range of fifteen to sixteen months for a case that is never selected for further review. That queue advanced only about three months across the quarter, which means the gap between filing and decision was still widening for anyone filing now. One quiet but useful development: the audit queue shows no posted date because DOL has leaned on Requests for Information rather than formal audits, which tend to resolve faster than a traditional audit once did.", tone: "muted" }
                            ]
                        }
                    ]
                },
                {
                    type: "section",
                    number: "§ 02",
                    title: "EB-2 and EB-3 at USCIS: the I-140",
                    blocks: [
                        {
                            type: "paragraph",
                            text: "Once PERM is certified, the employer files the I-140 immigrant petition. Here the timeline is far more controllable, because premium processing is available and reliable."
                        },
                        {
                            type: "table",
                            caption: "Form I-140 — EB-2 / EB-3, spring 2025",
                            columns: ["Path", "Timeframe", "Note"],
                            columnWidths: [280, 180, 336],
                            rows: [
                                ["Standard processing", { text: "~7–8 mo", tone: "ink" }, { text: "Varies by service center (Nebraska / Texas)", tone: "muted" }],
                                ["Premium (Form I-907)", { text: "15 business days", tone: "ink" }, { text: "$2,805; action guaranteed, not approval", tone: "muted" }],
                                ["Premium — EB-2 NIW", { text: "45 business days", tone: "ink" }, { text: "Longer window for the self-petition track", tone: "muted" }]
                            ]
                        },
                        {
                            type: "paragraph",
                            text: [
                                { text: "Two cautions belong next to those numbers. First, ", tone: "muted" },
                                { text: "an approved I-140 is not a green card and confers no status or work authorization on its own", tone: "ink" },
                                { text: " — it fixes the priority date and lets the case proceed. Second, premium processing buys a decision within the window, not a favorable one; a thin petition simply earns a faster request for evidence. And for beneficiaries from heavily backlogged countries, paying for premium rarely changes the real finish line, because the Visa Bulletin — not the I-140 — governs when adjustment of status can even be filed.", tone: "muted" }
                            ]
                        }
                    ]
                },
                {
                    type: "section",
                    number: "§ 03",
                    title: "H-2B: a calendar race, not a queue",
                    blocks: [
                        {
                            type: "paragraph",
                            text: "H-2B is the outlier in this group, because the binding constraint is rarely adjudication speed — it is the cap. The 66,000 annual visas split evenly between the two halves of the fiscal year, and demand for the April–September season is intense. As of early April 2025, the picture was already defined by exhaustion rather than backlog."
                        },
                        {
                            type: "paragraph",
                            text: [
                                { text: "USCIS announced on " },
                                { text: "March 26, 2025", tone: "ink" },
                                { text: " that it had received enough petitions to reach the statutory second-half cap, with supplemental filing dates opening fifteen days later. The largest supplemental tranche then filled almost immediately." }
                            ]
                        },
                        {
                            type: "list",
                            items: [
                                {
                                    title: "19,000",
                                    text: "Early second-half returning workers — start dates April 1 to May 14. Cap reached; final receipt date April 18, 2025."
                                },
                                {
                                    title: "China",
                                    text: "Late second-half returning workers — start dates May 15 to September 30. Still open in April."
                                },
                                {
                                    title: "India",
                                    text: "Country set-aside — nationals of El Salvador, Guatemala, Honduras, Haiti, Colombia, Ecuador, and Costa Rica; no returning-worker requirement."
                                },
                                {
                                    title: "—",
                                    text: "Cap-exempt petitions — extensions, changes of employer, and workers already counted this fiscal year remain available year-round."
                                }
                            ]
                        },
                        {
                            type: "paragraph",
                            text: "The processing lesson is a sequencing one. Every H-2B case needs a DOL-approved temporary labor certification before the I-129 can be filed, and the supplemental tranches carry their own conditions — an irreparable-harm attestation and a filing deadline of September 15, 2025. Premium processing is available on the I-129, but it cannot manufacture a cap number. For a seasonal employer, the takeaway in April was blunt: the standard cap was gone, and the remaining paths were the ones you had to qualify and file for quickly."
                        }
                    ]
                },
                {
                    type: "section",
                    number: "§ 04",
                    title: "Reading the quarter",
                    blocks: [
                        {
                            type: "callout",
                            text: "Wage determinations sped up, PERM stayed slow, and H-2B ran out of room — three different problems that call for three different planning habits."
                        },
                        {
                            type: "list",
                            items: [
                                {
                                    title: "Build backward from the need-by date",
                                    text: "A green-card case that must clear PERM should assume roughly a year and a half of DOL time before the I-140 even begins. Start the prevailing wage request first and treat it as the trigger for everything downstream."
                                },
                                {
                                    title: "Bank the wage-queue improvement, don't count on the PERM one",
                                    text: "The PWD queue closed months of backlog this quarter; analyst review barely moved. Plan around the slow stage, and use the faster wage stage to file recruitment sooner."
                                },
                                {
                                    title: "Use premium where it changes the outcome",
                                    text: "Premium I-140 is worth it when a start date or a status gap is at stake. For a beneficiary stuck behind the Visa Bulletin, the money is better spent on getting the petition right the first time."
                                },
                                {
                                    title: "Treat H-2B as a filing calendar, not a wait time",
                                    text: "Seasonal needs should be mapped to the cap windows a season ahead. By April, the standard second-half cap was already closed — the employers still moving were the ones who had qualified for a supplemental or cap-exempt path in advance."
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "note",
                    text: "Figures reflect the USCIS processing-times page and the DOL OFLC FLAG dashboard as of April 1, 2025, with January 1, 2025 as the prior-quarter comparison. This is general information, not legal advice. Processing queues change monthly; confirm the current figures for any live matter."
                }
            ]
        },
        {
            type: "action-banner",
            title: "Sequencing a filing against these timelines?",
            description: "We map employer cases to the queues that actually bind them — with attorney oversight and rates 20–40% below standard firms.",
            link: {
                label: "Talk to Corvell",
                path: "/contact"
            }
        }
    ]
};
