import lucia from "../assets/images/person-lucia-morales.jpg";
import natalie from "../assets/images/person-natalie-brooks.jpg";
import andrew from "../assets/images/person-andrew-collins.jpg";
import mark from "../assets/images/team-mark-ellison.jpg";
import irina from "../assets/images/team-irina-sorokina.jpg";
import diego from "../assets/images/team-diego-navarro.jpg";
import emily from "../assets/images/team-emily-parker.jpg";
import susan from "../assets/images/team-susan-mitchell.jpg";

export const teamPageContent = {
    intro: {
        eyebrow: "Our team",
        title: "The people who do the work.",
        description:
            "Attorneys who own their cases end to end, a case team that keeps every matter moving, and the operators who hold the firm together."
    },
    attorneys: {
        eyebrow: "Attorneys",
        title: "Every case is led by the attorney responsible for it."
    },
    consulting: {
        eyebrow: "Practice consulting",
        title: "Where legal practice meets the systems that run it."
    },
    paralegals: {
        eyebrow: "Paralegals",
        title: "The case team behind every filing."
    },
    administration: {
        eyebrow: "Administration",
        title: "The person who keeps it all running."
    },
    closing: {
        title: "Focused on one thing, together.",
        links: [
            { label: "Join the team", path: "/careers" },
            { label: "Get in touch", path: "/contact" }
        ]
    }
};


export const attorneys = [
    {
        name: "Andrew Collins",
        role: "Attorney",
        position: "Managing Partner",
        slug: "andrew-collins",
        image: andrew,
        biography: [
            "Andrew leads firm strategy and handles the firm's most complex investor and multinational-executive matters. He has spent his career representing companies and investors in U.S. business immigration, first at a litigation firm and later in a corporate immigration practice.",
            "He founded Corvell in 2024 around a simple conviction: employment-based immigration deserves a practice devoted entirely to it, run with the speed and transparency corporate clients expect."
        ],
        facts: [
            {
                label: "Focus",
                value: "E-2 / E-1 investor & trader, EB-5 investor, L-1, EB-1C, EB-2, firm strategy"
            },
            { label: "Bar admission", value: "Florida" },
            { label: "Education", value: "J.D.; B.A. in Economics" },
            { label: "Languages", value: "English" }
        ]
    },
    {
        name: "Natalie Brooks",
        role: "Attorney",
        position: "Managing Attorney",
        slug: "natalie-brooks",
        image: natalie,
        biography: [
            "Natalie leads Corvell's corporate immigration practice. She brings fifteen years in U.S. business immigration, most of them leading business-immigration teams before joining the firm.",
            "Her work spans the full range of corporate categories — TN, E-1/E-2, L-1, H-1B, and O-1 — with a strong track record in extraordinary-ability and national-interest green cards (EB-1A and EB-2 NIW)."
        ],
        facts: [
            { label: "Focus", value: "TN, E-1/E-2, L-1, H-1B, O-1, EB-1A, EB-2 NIW, PERM" },
            { label: "Bar admission", value: "Washington State" },
            { label: "Education", value: "J.D.; LL.M. in U.S. Law" },
            { label: "Languages", value: "English, French" }
        ]
    },
    {
        name: "Lucia Morales",
        role: "Attorney",
        position: "Managing Attorney",
        slug: "lucia-morales",
        image: lucia,
        biography: [
            "Lucia leads Corvell's high-volume employment practice — the labor-certification and seasonal work that keeps large workforces staffed. In eighteen years of practice she has built and defended PERM, EB-3, Schedule A, H-1B and H-2B programs for employers in construction, hospitality, healthcare, and agriculture.",
            "Bilingual in English and Spanish, she works directly with employers and their workers from the first filing to the final approval."
        ],
        facts: [
            { label: "Focus", value: "PERM, EB-3, Schedule A, H-1B, H-2B, I-9 compliance" },
            { label: "Bar admission", value: "Florida" },
            { label: "Education", value: "J.D.; B.A. in International Relations" },
            { label: "Languages", value: "English, Spanish" }
        ]
    }
];

export const practiceConsultants = [
    {
        name: "Mark Ellison",
        position: "Immigration Practice Consultant",
        slug: "mark-ellison",
        image: mark,
        biography: [
            "Mark bridges legal practice and the systems that run it. Trained as a lawyer with a decade of litigation and consulting experience, he designs the AI-assisted workflows, case systems, and processes that let Corvell operate lean without cutting corners.",
            "He leads practice operations, technology, and strategy alongside the firm's licensed attorneys, and heads the firm's relationships with corporate clients."
        ],
        facts: [
            { label: "Focus", value: "Practice operations, workflow & technology, client strategy" },
            { label: "Education", value: "LL.M." },
            { label: "Languages", value: "English" }
        ]
    }
];

export const paralegals = [
    {
        name: "Diego Navarro",
        role: "Paralegal",
        image: diego,
        biography:
            "Diego supports the firm's employment-based and investor caseload, from evidence assembly through RFE preparation, and brings a meticulous eye to documentation.",
        languages: "English · Spanish"
    },
    {
        name: "Irina Sorokina",
        role: "Paralegal",
        image: irina,
        biography:
            "Irina manages PERM, H-2B, and EB-3 matters and works closely with beneficiaries worldwide, guiding them through document collection and filing.",
        languages: "English · Russian"
    },
    {
        name: "Emily Parker",
        role: "Paralegal",
        image: emily,
        biography:
            "Emily works across the full range of employment-based matters — corporate filings, PERM, and everything in between — keeping case timelines, USCIS correspondence, and compliance documentation on track so nothing slips between drafting and decision.",
        languages: "English"
    }
];

export const administrators = [
    {
        name: "Susan Mitchell",
        position: "Firm Administrator",
        slug: "susan-mitchell",
        image: susan,
        biography: [
            "Susan runs the firm's day-to-day operations — billing coordination, scheduling, facilities, and the hundred small things that keep a practice moving. With three decades in legal administration, she is often the first voice clients hear and the reason deadlines and details never fall through."
        ],
        facts: [
            { label: "Focus", value: "Operations, billing coordination, scheduling, facilities" },
            { label: "Experience", value: "30 years in legal administration" },
            { label: "Languages", value: "English" }
        ]
    }
];
