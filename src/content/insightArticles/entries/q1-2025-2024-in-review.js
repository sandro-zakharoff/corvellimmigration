export default {
    slug: "q1-2025-2024-in-review",
    breadcrumb: "2024 Brief",
    blocks: [
        {
            type: "insight-header",
            category: "Retrospective",
            meta: ["Q1 2025", "January 2025", "Employer immigration"],
            title: "Employer Immigration Brief: 2024 in Review",
            description: "The fee changes, processing shifts, and policy moves that shaped employer filings in 2024 — and what carried into 2025.",
            byline: "Corvell Immigration — Firm Insights"
        },
        {
            type: "content",
            blocks: [
                {
                    type: "timeline",
                    items: [
                        {
                            date: "Feb 2, 2024",
                            text: "H-1B registration integrity rule; beneficiary-centric selection published."
                        },
                        {
                            date: "Feb 26, 2024",
                            text: "Premium processing fees rise; clock moves to business days."
                        },
                        {
                            date: "Apr 1, 2024",
                            text: "USCIS fee rule takes effect; new Asylum Program Fee and form editions."
                        },
                        {
                            date: "Jun 28, 2024",
                            text: "Loper Bright overturns Chevron deference."
                        },
                        {
                            date: "Dec 18, 2024",
                            text: "H-1B and H-2 modernization rules published; effective Jan 17, 2025."
                        }
                    ]
                },
                {
                    type: "paragraph",
                    variant: "lead",
                    text: "For employers who sponsor foreign talent, 2024 was the year the price of a petition changed — and the year the ground rules underneath it started to move. This brief looks only at the employment side of the system: the I-129 nonimmigrant petitions, I-140 immigrant petitions, and PERM cases that companies actually file. It sets aside humanitarian programs, which follow a different logic and a different budget."
                },
                {
                    type: "section",
                    number: "§ 01",
                    title: "Fees: the first full reset since 2016",
                    blocks: [
                        {
                            type: "paragraph",
                            text: [
                                { text: "The genuinely new line item is the " },
                                { text: "Asylum Program Fee", tone: "ink" },
                                { text: ", a surcharge that funds the asylum system but is charged to employers on most I-129 and I-140 filings. It runs " },
                                { text: "$600", tone: "ink" },
                                { text: " for a standard employer, is reduced to " },
                                { text: "$300", tone: "ink" },
                                { text: " for small employers with 25 or fewer full-time employees and for individual self-petitioners, and is " },
                                { text: "waived entirely", tone: "ink" },
                                { text: " for nonprofits. That tiering rewards knowing your own headcount category before you file." }
                            ]
                        },
                        {
                            type: "paragraph",
                            text: [
                                { text: "On " },
                                { text: "April 1, 2024", tone: "ink" },
                                { text: ", USCIS implemented its first comprehensive fee schedule update in eight years. The headline for employers is that the cost of a petition is now tied to what you are filing, not a single flat number. Base I-129 fees, long uniform, were split by classification: an H-1B petition rose from $460 to " },
                                { text: "$780", tone: "ink" },
                                { text: ", an L-1 to " },
                                { text: "$1,385", tone: "ink" },
                                { text: ", and an O-1 to " },
                                { text: "$1,055", tone: "ink" },
                                { text: ". The I-140 immigrant petition moved only modestly, from $700 to " },
                                { text: "$715", tone: "ink" },
                                { text: "." }
                            ]
                        },
                        {
                            type: "table",
                            caption: "Selected employer filing fees — 2024 changes",
                            columns: ["Filing", "Before", "From April 1, 2024"],
                            columnWidths: [345, 88, 287],
                            bottomBorder: true,
                            rows: [
                                ["H-1B petition (I-129)", "$460", { text: "$780", emphasis: true }],
                                ["L-1 petition (I-129)", "$460", { text: "$1,385", emphasis: true }],
                                ["O-1 petition (I-129)", "$460", { text: "$1,055", emphasis: true }],
                                ["Immigrant petition (I-140)", "$700", { text: "$715", emphasis: true }],
                                ["Asylum Program Fee (per I-129 / I-140)", "—", { text: "$600 · $300 small · $0 nonprofit", emphasis: true }],
                                [
                                    [{ text: "Premium processing " }, { text: "(from Feb 26)", tone: "muted" }],
                                    "$2,500",
                                    { text: "$2,805", emphasis: true }
                                ],
                                [
                                    [{ text: "H-1B registration " }, { text: "(FY2026 season)", tone: "muted" }],
                                    "$10",
                                    { text: "$215", emphasis: true }
                                ]
                            ]
                        },
                        {
                            type: "paragraph",
                            text: [
                                { text: "Two related changes deserve a place in any budget. " },
                                { text: "Premium processing", tone: "ink" },
                                { text: " rose to " },
                                { text: "$2,805", tone: "ink" },
                                { text: " effective February 26, 2024. And employers who once bundled an adjustment-of-status package saw the economics shift: filing the I-485 together with the work-permit (I-765) and travel-document (I-131) applications, once effectively covered by one fee, now carries a separate charge for each — a meaningful increase when a family adjusts together." }
                            ]
                        }
                    ]
                },
                {
                    type: "section",
                    number: "§ 02",
                    title: "Processing: same clock, new arithmetic",
                    blocks: [
                        {
                            type: "paragraph",
                            text: "The premium-processing timeframe was redefined from 15 calendar days to 15 business days. It sounds cosmetic, but for a filing made before a holiday week it can add real calendar time to a guarantee employers pay a premium to rely on. Planning around start dates should assume the longer of the two readings."
                        },
                        {
                            type: "paragraph",
                            text: [
                                { text: "The larger processing story of 2024 was the " },
                                { text: "beneficiary-centric", tone: "ink" },
                                { text: " H-1B selection that governed the FY2025 cap. Under it, each unique individual is entered once regardless of how many employers register them, which curbed the duplicate-registration gaming that had inflated recent lotteries. For legitimate single-employer filers, the practical effect was cleaner odds and fewer registrations chasing the same number of slots." }
                            ]
                        },
                        {
                            type: "paragraph",
                            text: [
                                { text: "Finally, the new fee rule arrived with " },
                                { text: "new form editions dated 04/01/24 and no grace period", tone: "ink" },
                                { text: ". USCIS rejected petitions filed on superseded editions, which turned an administrative detail into a real source of lost filing dates in the weeks around the transition." }
                            ]
                        }
                    ]
                },
                {
                    type: "section",
                    number: "§ 03",
                    title: "Policy: the rules under the rules shifted",
                    blocks: [
                        {
                            type: "paragraph",
                            text: "Two developments in 2024 matter less for any single filing than for how the whole system will be argued going forward."
                        },
                        {
                            type: "paragraph",
                            text: "The first is judicial. In Loper Bright Enterprises v. Raimondo (June 28, 2024), the Supreme Court overturned the four-decade-old Chevron doctrine, under which courts deferred to an agency's reasonable reading of an ambiguous statute. Courts must now exercise independent judgment on what a statute means. For immigration, that means USCIS, the Department of Labor, and the BIA no longer receive automatic deference simply because the Immigration and Nationality Act is silent or unclear — which gives employers more room to challenge a restrictive interpretation. Prior decisions decided under Chevron remain good law through stare decisis, so this is a shift in leverage, not an overnight rewrite."
                        },
                        {
                            type: "paragraph",
                            text: [
                                { text: "The second is regulatory. DHS published its " },
                                { text: "H-1B modernization rule", tone: "ink" },
                                { text: " in two parts — the registration-integrity provisions early in the year, and the substantive package on December 18, 2024, effective January 17, 2025. A parallel " },
                                { text: "H-2 modernization rule", tone: "ink" },
                                { text: " followed the same December-to-January timeline. Both were finalized deliberately before the change in administration." }
                            ]
                        },
                        {
                            type: "aside",
                            title: "Schedule A stayed where it was",
                            text: [
                                { text: "One thing employers watched but did not get: the Department of Labor's request for information on expanding " },
                                { text: "Schedule A", tone: "ink" },
                                { text: " — the shortcut that lets certain occupations skip the PERM labor-market test — to STEM and other shortage fields drew extensive comment but produced no expansion. As of early 2025 the list is unchanged, and standard EB-2 and EB-3 cases still run through full PERM." }
                            ]
                        }
                    ]
                },
                {
                    type: "section",
                    number: "§ 04",
                    title: "What carried into 2025",
                    blocks: [
                        {
                            type: "paragraph",
                            text: "Several 2024 changes were written to land in 2025, and employers planning the year should treat them as already here."
                        },
                        {
                            type: "paragraph",
                            text: [
                                { text: "The " },
                                { text: "H-1B registration fee jumps from $10 to $215", tone: "ink" },
                                { text: " per beneficiary beginning with the FY2026 cap season — the registration window that opens in March 2025. For companies that register large candidate pools, that is a line item that now needs a real number attached to it." }
                            ]
                        },
                        {
                            type: "paragraph",
                            text: [
                                { text: "The substantive " },
                                { text: "H-1B modernization provisions took effect January 17, 2025", tone: "ink" },
                                { text: ". They narrow and clarify the specialty-occupation definition (the degree field must be directly related to the role, though a range of qualifying fields is allowed); " },
                                { text: "codify the deference policy", tone: "ink" },
                                { text: ", directing officers to honor a prior approval absent a material error or change; extend the F-1 " },
                                { text: "cap-gap", tone: "ink" },
                                { text: " protection through April 1 to reduce status gaps for students moving to H-1B; allow certain " },
                                { text: "beneficiary-owners", tone: "ink" },
                                { text: " to be petitioned by companies they control; expand cap-exempt research-organization definitions; and codify USCIS site-visit authority. A new Form I-129 edition (01/17/25) became mandatory the same day, again with no grace period." }
                            ]
                        },
                        {
                            type: "paragraph",
                            text: [
                                { text: "The " },
                                { text: "H-2 modernization rule", tone: "ink" },
                                { text: " also took effect January 17, 2025, adding worker portability, expanded grace periods, and a straightforward 60-day absence to reset the three-year clock — relevant to any employer with seasonal agricultural or non-agricultural labor." }
                            ]
                        }
                    ]
                },
                {
                    type: "section",
                    number: "§ 05",
                    title: "The bottom line for employers",
                    blocks: [
                        {
                            type: "callout",
                            text: "2024 raised the cost of sponsorship and, quietly, expanded the room to argue about it. Both belong in the 2025 plan."
                        },
                        {
                            type: "list",
                            items: [
                                {
                                    title: "Budget by classification, not by habit",
                                    text: "Per-petition math now varies by visa type, and the Asylum Program Fee turns on headcount. Confirm your employer tier — standard, 25-or-fewer, or nonprofit — before you model a year of filings."
                                },
                                {
                                    title: "Treat form editions as a deadline",
                                    text: "Two edition changes in twelve months, both without a grace period, made the wrong version a rejection risk. Verify the current edition at the moment of filing, not when you start drafting."
                                },
                                {
                                    title: "Use deference — in both directions",
                                    text: "The codified deference policy should make extensions of an already-approved role smoother. Where an officer departs from a prior approval or stretches the statute, Loper Bright gives a stronger basis to push back."
                                },
                                {
                                    title: "Start the FY2026 cap early",
                                    text: "A $215 registration fee and continued beneficiary-centric selection reward a candidate list that is finalized, de-duplicated, and costed before the March window opens."
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "note",
                    text: "This brief reflects rules and fees as of January 2025 and is general information, not legal advice. Fee amounts, form editions, and processing rules change; confirm the current USCIS fee schedule and form edition at the time of any filing."
                }
            ]
        },
        {
            type: "action-banner",
            title: "Planning your 2025 filings?",
            description:
                "We help employers cost, sequence, and file employment-based petitions — with attorney oversight and rates 20–40% below standard firms.",
            link: {
                label: "Talk to Corvell",
                path: "/contact"
            }
        }
    ]
};
