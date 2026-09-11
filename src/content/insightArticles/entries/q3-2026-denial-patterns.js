export default {
    slug: "q3-2026-denial-patterns",
    breadcrumb: "Denial Patterns Brief",
    blocks: [
        {
            type: "insight-header",
            category: "RFE / Denials",
            meta: ["Q3 2026", "August 2026", "Employer immigration"],
            title: "Twelve denial triggers, program by program",
            description: "The specific evidence gaps that draw RFEs, audits, and denials across PERM, EB-2/EB-3, H-1B, and H-2B.",
            byline: "Corvell Immigration — Firm Insights"
        },
        {
            type: "content",
            blocks: [
                {
                    type: "paragraph",
                    variant: "lead",
                    text: "Most employer petitions clear. Overall approval rates across these programs sit comfortably above ninety percent, and the headline numbers are reassuring. What the averages hide is where the failures concentrate — a short, predictable set of evidence gaps that turn a routine filing into an RFE, an audit, or a denial. Almost all of them are visible in the file well before it is submitted. Below are twelve, three each across PERM, the EB-2/EB-3 immigrant petition, H-1B, and H-2B."
                },
                {
                    type: "stats",
                    items: [
                        {
                            value: "90%+",
                            label: "Approval once petitions are filed"
                        },
                        {
                            value: "~1 in 4",
                            label: "H-1B petitions drawing an RFE*"
                        },
                        {
                            value: "~1 in 3",
                            label: "PERM filings drawing audit / RFI*"
                        }
                    ],
                    note: "*Practitioner and USCIS/OFLC estimates, mid-2026. Rates vary sharply by petition type, service center, employer profile, and case posture — contract-staffing and change-of-employer H-1Bs, and new or thinly-capitalized employers, run well above the headline. Confirm current figures on the USCIS Data Hub and the DOL FLAG dashboard."
                },
                {
                    type: "callout",
                    text: "The pattern is the same in all four programs: cases rarely fail on exotic law. They fail on requirements that don't reconcile, records that were never built, and a story the file doesn't quite tell."
                },
                {
                    type: "section",
                    number: "§ 01 — PERM",
                    title: "Labor certification",
                    blocks: [
                        {
                            type: "paragraph",
                            text: "The PERM stage is a documentation exercise before it is anything else. The Certifying Officer is not weighing the merits of the hire; it is testing whether the recruitment was run correctly and whether the job's terms hold together. Three gaps account for most of the trouble."
                        },
                        {
                            type: "list",
                            items: [
                                {
                                    title: "Unduly restrictive requirements without business necessity",
                                    text: "Requirements above the norm for the occupation — a specific degree, a foreign language, an unusual combination of duties, or excessive experience — invite audit and denial unless each is documented as a genuine business necessity."
                                },
                                {
                                    title: "Recruitment defects and improper rejection of U.S. workers",
                                    text: "The recruitment record has to be clean: the correct mandatory steps, compliant advertising content, and a lawful, job-related reason for every U.S. applicant turned away. A missed step or a rejection that reads as pretext converts a routine filing into supervised recruitment or a denial."
                                },
                                {
                                    title: "SOC, wage, and requirements that don't reconcile",
                                    text: "The occupation code, the prevailing-wage determination, and the minimum requirements on the ETA-9089 all have to line up. A wage level set low for the duties, a stale SOC code, or 9089 requirements that don't match the wage determination are the most familiar audit triggers of all."
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "section",
                    number: "§ 02 — EB-2 / EB-3",
                    title: "The immigrant petition (I-140)",
                    blocks: [
                        {
                            type: "paragraph",
                            text: "With the labor certification in hand, the I-140 has a narrow job: prove the employer can pay and the worker qualified — both measured against the priority date, not today. Cases stumble when the petition quietly drifts from the terms the PERM actually certified."
                        },
                        {
                            type: "list",
                            items: [
                                {
                                    title: "Ability to pay the proffered wage not established",
                                    text: "From the priority date forward, the employer must show it can pay the offered wage — through net income, net current assets, or wages already paid to the worker. Thin financials, a young company with no track record, or a proffered wage above what the returns support draws an RFE and, unanswered, a denial."
                                },
                                {
                                    title: "The beneficiary doesn't match the PERM terms",
                                    text: "The worker must have met every stated minimum — degree, field, and experience — as of the priority date, and the I-140 evidence has to prove it. Qualifying experience gained with the sponsoring employer, a degree that isn't a single-source equivalent for EB-2 advanced-degree, or an evaluation that overreaches are recurring failure points."
                                },
                                {
                                    title: "Wrong category, or thin evidence for the one claimed",
                                    text: "EB-2 advanced-degree needs a U.S. master's, or a bachelor's plus five years of progressive experience; exceptional ability needs three of the regulatory criteria; EB-3 skilled worker needs the experience the PERM required. Filing in a category the PERM doesn't support, or under-building the criteria, is a clean denial."
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "section",
                    number: "§ 03 — H-1B",
                    title: "Specialty occupation petitions (I-129)",
                    blocks: [
                        {
                            type: "paragraph",
                            text: "Since the January 2025 modernization rule took effect, the H-1B specialty-occupation test reads more precisely than it did — and the precision cuts both ways. The wins and losses cluster in three places."
                        },
                        {
                            type: "list",
                            items: [
                                {
                                    title: "Specialty occupation not established",
                                    text: "The position must normally require a bachelor's or higher in a directly related specific specialty — a field with a logical connection to the duties. A role a general degree could fill, or one written to accept \"any field,\" no longer qualifies, even though a reasonable range of related fields is acceptable."
                                },
                                {
                                    title: "Employer–employee relationship and third-party placement",
                                    text: "Where the worker sits at a client site, USCIS still probes control and the bona fide, non-speculative nature of the work — and the modernized rule expressly restored its authority to demand contracts, work orders, and end-client evidence. A missing itinerary, statement of work, or client letter is the classic contract-staffing RFE."
                                },
                                {
                                    title: "LCA-to-petition inconsistency",
                                    text: "The certified LCA has to match the petition line for line: wage level, SOC code, worksite, and dates. A wage level set below the specialty's norm, a worksite the LCA doesn't cover, or an occupational code that fights the job description reads as either error or wage manipulation."
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "section",
                    number: "§ 04 — H-2B",
                    title: "Temporary non-agricultural labor",
                    blocks: [
                        {
                            type: "paragraph",
                            text: "H-2B is a two-agency case — DOL certifies the temporary labor certification, then USCIS adjudicates the petition — and it can break at either desk. The recurring question underneath all of it is whether the need is truly temporary."
                        },
                        {
                            type: "list",
                            items: [
                                {
                                    title: "Temporary need not established",
                                    text: "The need has to fit one of four boxes — a one-time occurrence, seasonal, peakload, or intermittent — and attach to a defined period. A need that looks year-round, or a seasonal claim with no recurring event behind it, fails. Note the current standard: outside a one-time occurrence, a need running more than nine months will be denied."
                                },
                                {
                                    title: "Recruitment, wage, and job-order defects at the DOL stage",
                                    text: "Before USCIS ever sees the case, certification turns on a valid prevailing-wage determination, a compliant job order, and a documented U.S.-worker recruitment effort inside the filing window — no earlier than 90 and no later than 75 days before the date of need. A late PWD, an out-of-window filing, or a thin recruitment record sinks the ETA-9142B."
                                },
                                {
                                    title: "Consecutive filings that contradict the temporary need",
                                    text: "Stacking petitions that together cover a continuous, year-round period — or refiling with no gap — tells USCIS the need was never temporary, whatever the certification says. Returning-worker assumptions and cap timing only compound the exposure."
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "note",
                    text: "Reflects the H-1B modernization rule effective January 17, 2025, current PERM and H-2B regulations, and USCIS/OFLC adjudication trends as of August 2026. Standards, form editions, filing windows, and processing figures change; confirm the governing regulation and the live DOL FLAG and USCIS dashboards for any active matter. General information, not legal advice."
                }
            ]
        },
        {
            type: "action-banner",
            title: "Building an employer petition this quarter?",
            description:
                "We build and pressure-test PERM, EB-2/EB-3, H-1B, and H-2B cases against the gaps that draw RFEs and denials — technology-enabled, dramatically more efficient, and built to clear on the first pass.",
            link: {
                label: "Talk to Corvell",
                path: "/contact"
            }
        }
    ]
};
