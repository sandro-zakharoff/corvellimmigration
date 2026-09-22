import seasonalCrewsImage from "../assets/images/h2b-seasonal-crews.webp";
import { contactDetails } from "./site";

export const h2bPageMetadata = {
    title: "H-2B Seasonal Crews | Corvell Immigration",
    description: "Temporary non-agricultural workers for seasonal and peak-load needs. The six steps, what each stage costs, and how intake works."
};

export const h2bPageContent = {
    hero: {
        eyebrow: "H-2B · Seasonal & peak-demand crews",
        title: ["Your seasonal crew, ", { text: "start to finish.", accent: true }],
        description: "H-2B runs on fixed federal dates and a lottery nobody can influence. Here is every step of it, what each stage costs, and the ten minutes we need from you.",
        image: seasonalCrewsImage,
        imageAlt: "A seasonal landscaping crew planting shrubs outside a building.",
        imagePosition: "right",
        prominent: true
    },
    process: {
        eyebrow: "01 — How we work",
        title: "Six steps.",
        surface: true,
        groups: [
            {
                items: [
                    {
                        eyebrow: "Step 1",
                        title: "Wage determination",
                        label: "Form ETA-9141",
                        description: "DOL sets the minimum wage for that role in your county. Nothing else in the case can be filed until it comes back — so for an April 1 start the request goes in around September, and for October 1 around March.",
                        metrics: [{ value: "6–8 wks", label: "current DOL wait", tone: "teal" }]
                    },
                    {
                        eyebrow: "Step 2",
                        title: "Temporary labor certification",
                        label: "Form ETA-9142B + job order",
                        description: "We file the application together with the job order that offers the roles to U.S. workers first. The filing window is three days long and cannot be extended.",
                        metrics: [
                            { value: "Jan 1–3", label: "for April 1 starts", tone: "accent" },
                            { value: "Jul 3–5", label: "for October 1 starts", tone: "accent" }
                        ]
                    },
                    {
                        eyebrow: "Step 3",
                        title: "Randomization",
                        label: "Results within days of filing",
                        description: [
                            { text: "Group A", strong: true },
                            " goes to a DOL analyst straight away — this is the path that works. ",
                            { text: "Group B", strong: true },
                            " queues behind it for capacity that rarely opens. Anything past B will not be reached before the season starts."
                        ],
                        metrics: [{ value: "33,000", label: "visas per half-year" }]
                    },
                    {
                        eyebrow: "Step 4",
                        title: "If you are not in Group A",
                        label: "Supplemental cap",
                        description: "We move to the supplemental cap — an additional allocation Congress has released on top of the statutory 66,000 in each of the last four years. For the summer season it usually opens in April. We keep your file current so we can file the day it does.",
                        highlighted: true,
                        metrics: [{ value: "April", label: "usual opening, summer season", tone: "accent" }]
                    },
                    {
                        eyebrow: "Step 5",
                        title: "USCIS petition",
                        label: "Form I-129",
                        description: "With the certification approved, we petition USCIS for the workers. One petition covers the whole group, so headcount does not multiply this stage.",
                        metrics: [{ value: "15 days", label: "15 business days on premium processing", tone: "teal" }]
                    },
                    {
                        eyebrow: "Step 6",
                        title: "Consular filing, per worker",
                        label: "DS-160 + interview",
                        description: "Each worker gets their own visa application and a prepared interview at the U.S. embassy. We file and prepare; they attend, and travel once the visa is issued.",
                        metrics: [{ value: "Per head", label: "the only stage that scales with crew size" }]
                    }
                ]
            }
        ]
    },
    costs: {
        title: ["What it ", { text: "actually", accent: true }, " costs."],
        description: "We're in the same boat as you — we don't charge the full cost upfront.",
        prominent: true,
        groups: [
            {
                title: "Attorney fee",
                label: "Paid to Corvell",
                items: [
                    {
                        eyebrow: "01",
                        title: "At filing",
                        label: "Per application",
                        description: "Wage determination request, the ETA-9142B, the job order, and the full recruitment file assembled and filed.",
                        metrics: [{ value: "$1,500", label: "due when we file", tone: "teal" }]
                    },
                    {
                        eyebrow: "02",
                        title: "Only if Group A",
                        label: "Per application in Group A",
                        description: "The recruitment period, DOL certification, and the I-129 petition carried through to approval. If your application does not land in Group A, this is never charged.",
                        highlighted: true,
                        metrics: [{ value: "$3,000", label: "due after the draw", tone: "accent" }]
                    },
                    {
                        eyebrow: "03",
                        title: "Consular stage",
                        label: "Per worker",
                        description: "Visa application for each worker who will travel, plus preparation for the embassy interview.",
                        metrics: [{ value: "$150", label: "if requested", tone: "teal" }]
                    }
                ]
            },
            {
                title: "Government fees",
                label: "Paid to the agencies",
                items: [
                    {
                        eyebrow: "01",
                        title: "Department of Labor",
                        label: "Both filings",
                        description: "Neither the wage determination request nor the labor certification carries a filing fee.",
                        metrics: [{ value: "$0", label: "no filing fee", tone: "success" }]
                    },
                    {
                        eyebrow: "02",
                        title: "USCIS",
                        label: "Per petition, not per worker",
                        description: "Petition, asylum program fee and fraud prevention fee combined. Employers with 25 or fewer staff pay the reduced rate. Premium processing is optional at $1,780.",
                        metrics: [{ value: "$1,330", label: "per petition · $910 small employer" }]
                    },
                    {
                        eyebrow: "03",
                        title: "U.S. Embassy",
                        label: "Per worker",
                        description: "The visa application fee, paid before the interview and not refundable if the visa is refused.",
                        metrics: [{ value: "$205", label: "per head" }]
                    }
                ]
            }
        ]
    },
    intake: {
        eyebrow: "03 — Intake",
        title: "Ten minutes on your side.",
        description: "You send what you already have. We do the filling, and you check it once.",
        surface: true,
        groups: [
            {
                items: [
                    {
                        eyebrow: "01",
                        title: "You upload",
                        label: "Documents you already hold",
                        description: "Company registration, tax and payroll records, worksite details. No forms to complete and nothing to look up.",
                        metrics: [{ value: "5 min", tone: "teal" }]
                    },
                    {
                        eyebrow: "02",
                        title: "We fill",
                        label: "Every field we can source",
                        description: "We take the details out of your documents and populate the forms ourselves, rather than sending you a questionnaire to retype them into.",
                        metrics: [{ value: "0 min", label: "nothing needed from you here", tone: "teal" }]
                    },
                    {
                        eyebrow: "03",
                        title: "You confirm",
                        label: "One review pass",
                        description: "You approve applications. That is the last we need from you until the crew is booked.",
                        metrics: [{ value: "10 min", tone: "teal" }]
                    }
                ]
            }
        ]
    },
    cta: {
        title: "Happy to discuss over a call.",
        description: "Tell us the roles, the headcount and the months you need covered. We will map the dates and the cost before you commit to anything.",
        link: { label: "Book a consultation", path: "/contact" },
        secondaryLink: { prefix: "Or email", label: contactDetails.email, path: `mailto:${contactDetails.email}` }
    }
};
