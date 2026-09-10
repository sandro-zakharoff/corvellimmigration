import heroImage from "../../../assets/images/insight-august-2026.webp";

export default {
    slug: "august-2026-employer-immigration-brief",
    breadcrumb: "August 2026 Brief",
    category: "Quarterly Brief",
    meta: ["August 2026", "Employer Immigration"],
    title: "The August 2026 Employer Immigration Brief",
    description:
        "Everything that moved this quarter — fees, processing times, the Visa Bulletin, and policy — in one employer-focused read, with what each change means for the categories we file: PERM, EB-2/EB-3, H-1B, and H-2B.",
    byline: "Corvell Immigration — Firm Insights",
    heroImage: {
        src: heroImage,
        alt: "Stacks of immigration case documents"
    },
    stats: [
        {
            value: "Not in effect",
            label: "$100K H-1B fee, as of late July*"
        },
        {
            value: "~372 days",
            label: "Average PERM adjudication*",
            accent: true
        },
        {
            value: "Unavailable",
            label: "EB-2 India, rest of FY 2026*"
        }
    ],
    statsNote:
        "*Status current to late August 2026. Figures move; confirm against USCIS, DOL OFLC, and the Department of State Visa Bulletin before relying on them.",
    lead:
        "Q3 was an unusually active quarter. A six-figure H-1B fee was struck down in court while a second one was proposed by rule; the Department of State ran India's EB-2 numbers to zero for the rest of the fiscal year; the first wage-weighted H-1B cap season closed; and a new evidence standard changed what happens when a filing arrives incomplete. Here is what moved between the last brief and late August 2026, and what each item means for the categories we file.",
    sections: [
        {
            number: "§ 01 — Fees",
            title: "The $100,000 question, now asked twice.",
            content: [
                {
                    type: "paragraph",
                    text: "The September 2025 proclamation that attached a $100,000 fee to certain new H-1B petitions requiring consular processing spent this quarter in litigation. A federal district court vacated the guidance implementing the payment in June, and by late July a federal appeals court had declined to reinstate it while the government's appeal proceeds — so as of this writing the $100,000 payment is not in effect. The underlying proclamation is separately scheduled to lapse on September 21, 2026 unless it is extended or renewed, which would return consular-processed H-1B costs toward their earlier baseline. The appeal is still live, so the picture can change quickly."
                },
                {
                    type: "paragraph",
                    text: "Then, in late August, DHS proposed a new $103,265 H-1B fee — this time through formal rulemaking rather than a proclamation, leaning on a cost-recovery authority in the Immigration and Nationality Act. As proposed it would reach petitions for workers hired within the United States, would sit on top of existing filing costs, and is not yet in effect. DHS has said that if the proclamation payment ever becomes enforceable again and overlaps with the new rule, a petitioner could face both. Separately, a DHS final rule earlier in August raised certain H-1B-related screening fees for larger employers; applicability there turns on the specifics of the filing."
                },
                {
                    type: "paragraph",
                    text: "The ordinary numbers behind a filing are unchanged: the H-1B registration fee remains $215, the I-140 filing fee $715, and I-140 premium processing $2,805. As always, confirm every current amount against the USCIS fee schedule (G-1055 / 8 C.F.R. § 106.2) at the time of filing — these change."
                }
            ]
        },
        {
            number: "§ 02 — Processing times",
            title: "PERM is still the long pole.",
            content: [
                {
                    type: "paragraph",
                    text: "As of August 2026, the Department of Labor is averaging roughly 372 days to decide a filed PERM application, with analyst-review timelines reaching about 403 days over the summer; DOL is working through filings from around April 2025. That figure sits on top of the work that comes before filing — a prevailing-wage determination running about three months and a recruitment period of two to three more — so a full PERM phase now runs on the order of 20 to 26 months, and an audit adds several months more. There is no premium-processing option at the DOL stage."
                },
                {
                    type: "paragraph",
                    text: "On prevailing wage: as of the end of June, the National Prevailing Wage Center was issuing OEWS-based determinations for PERM and H-1B requests filed in April 2026. The practical effect across EB-2 and EB-3 is that the calendar is set mostly by the DOL queue, in receipt-date order; the only meaningful downstream lever is I-140 premium processing, which delivers a 15-business-day decision but does not touch the DOL stage at all."
                }
            ]
        },
        {
            number: "§ 03 — The Visa Bulletin",
            title: "India's EB-2 numbers go dark.",
            content: [
                {
                    type: "paragraph",
                    text: "The headline for the immigrant categories is that EB-2 India reached its pro-rated limit and became unavailable for the remainder of FY 2026 — and it remains unavailable in the September 2026 bulletin, meaning no EB-2 India adjustment can be filed or approved this month. The Department of State expects the category to reopen in October on FY 2027 numbers, though the reopening date will depend on demand and the new fiscal-year limit."
                },
                {
                    type: "paragraph",
                    text: "Around it: EB-1 India retrogressed over the summer and sits unchanged at October 15, 2022 in September, with State warning that some categories could go unavailable before the September 30 fiscal-year-end. EB-2 China is holding near September 1, 2021. On the EB-3 side, India remains around January 1, 2014 while China advanced through the summer. The broader pattern for the year has been familiar: dates advanced early, then retrogression and unavailability as per-country and annual limits are reached, with the counter resetting on October 1."
                },
                {
                    type: "table",
                    caption: "Final Action Dates — September 2026 (employment-based)",
                    columns: ["Category", "India", "China", "All others"],
                    rows: [
                        ["EB-2", { text: "Unavailable", accent: true }, "01 Sep 2021", "Current"],
                        ["EB-3 (Prof. & Skilled)", "01 Jan 2014", "01 Jan 2022", "01 Sep 2024"]
                    ],
                    note: "EB-3 \"All others\" excludes the Philippines (01 Aug 2023). Final Action Dates shown; the Dates-for-Filing chart differs. Always read the current month's bulletin at travel.state.gov before filing."
                }
            ]
        },
        {
            number: "§ 04 — H-1B selection",
            title: "The first wage-weighted season closed.",
            content: [
                {
                    type: "paragraph",
                    text: "The rule replacing the random H-1B cap lottery with a wage-weighted selection took effect February 27, 2026 and governed the FY 2027 season — registration ran March 4–19 and the petition window closed June 30, so Q3 is the first real look at how it landed. USCIS reached the FY 2027 cap and confirmed there would be no second selection round."
                },
                {
                    type: "paragraph",
                    text: "Under the new system, each registration is entered into the pool according to the OEWS wage level for its occupation and worksite: a Level IV offer draws four entries, down to a single entry at Level I. Selection still involves a random draw, but higher wage levels now carry materially better odds, and Level I registrations saw the reduced odds the structure implies. The load-bearing point for employers is consistency: the SOC code, worksite, and wage level chosen at registration now carry selection consequences and are expected to line up with the later LCA and petition."
                }
            ]
        },
        {
            number: "§ 05 — Adjudication standards",
            title: "Less room for a second chance.",
            content: [
                {
                    type: "paragraph",
                    text: "A USCIS policy effective August 5, 2026 changed what happens when a filing arrives without its required initial evidence: such a case can now be denied outright, without a Request for Evidence first. Where an RFE does issue, the response deadline is set in the notice, within a regulatory ceiling of 84 days. The practical effect is that a complete, consistent package at the moment of filing matters more than it did — an incomplete submission is now a denial risk rather than a request for more."
                },
                {
                    type: "paragraph",
                    text: "Two related shifts sit alongside it. Since a May 2026 policy memo, officers weigh adjustment of status as a discretionary benefit, including whether consular processing was available. And a reinstated public-charge test takes effect in September 2026 — just after this brief's date — requiring adjustment applicants to show self-sufficiency; we'll cover its operation once it is live."
                }
            ]
        },
        {
            number: "§ 06 — H-2B",
            title: "One seasonal allocation still open.",
            content: [
                {
                    type: "paragraph",
                    text: "The FY 2026 statutory H-2B cap (66,000) was exhausted for the second half of the year back in March. A temporary final rule from the Departments of Homeland Security and Labor then authorized up to 64,716 supplemental visas for FY 2026, released in staged allocations. The returning-worker allocations for the first half and the April window have already been used."
                },
                {
                    type: "paragraph",
                    text: "What remains open into Q3 is the final allocation of 18,490 visas, for employment start dates from May 1 through September 30 and — unlike the earlier tranches — open to both new and returning workers, with a filing deadline of September 15, 2026. For seasonal employers in hospitality, landscaping, seafood and food processing, and construction, that is the last FY 2026 supplemental route; after it closes, only cap-exempt filings (extensions for current H-2B workers, employer changes, and changes in the terms of employment) continue."
                }
            ]
        }
    ],
    closing:
        "The through-line this quarter is volatility at the top of the funnel — fees and selection — over the same slow, queue-bound machinery underneath. The next brief covers Q4 and the FY 2027 reset.",
    sourceNote:
        "Figures and status are current to late August 2026 and drawn from primary sources — the Department of State Visa Bulletin, USCIS, DOL OFLC, the Federal Register, and the dockets in the H-1B fee litigation. Fees, dates, form editions, and case status change, sometimes quickly; confirm the governing authority and the live USCIS / DOL / DOS figures before relying on anything here for a filing. General information, not legal advice."
};
