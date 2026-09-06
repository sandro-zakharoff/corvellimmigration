import gabrielaImage from "../assets/images/person-gabriela-reyes.jpg";
import olgaImage from "../assets/images/person-olga-prygoda.jpg";
import sergiyImage from "../assets/images/person-sergiy-kravets.jpg";
import alexImage from "../assets/images/team-alex-pavlyk.jpg";
import elenaImage from "../assets/images/team-elena-barkova.jpg";
import mateoImage from "../assets/images/team-mateo-delgado.jpg";
import rachelImage from "../assets/images/team-rachel-thompson.jpg";
import yvonneImage from "../assets/images/team-yvonne-carter.jpg";

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
        name: "Sergiy Kravets",
        role: "Attorney",
        position: "Managing Partner",
        slug: "sergiy-kravets",
        image: sergiyImage,
        biography: [
            "He came to the United States from Ukraine, earned his U.S. law degree, and spent years representing companies and investors through the same system he had once navigated himself. At Corvell he leads firm strategy and handles complex investor and multinational-executive matters. Alongside his practice, he has spent years helping arrange pro bono immigration counsel for Ukrainian families displaced by the war.",
            "Roman founded Corvell in 2024, after more than two decades in litigation and business immigration. He built the firm around a conviction formed over a long career: that employment-based immigration deserves a practice devoted entirely to it, run with the speed and transparency corporate clients expect."
        ],
        facts: [
            {
                label: "Focus",
                value: "E-2 / E-1 investor & trader, EB-5 investor, L-1, EB-1C, EB-2, firm strategy"
            },
            { label: "Bar admission", value: "Florida" },
            { label: "Education", value: "J.D., University of Miami School of Law; LL.B., Ukraine" },
            { label: "Languages", value: "English, Ukrainian, Russian" }
        ]
    },
    {
        name: "Olga Prygoda",
        role: "Attorney",
        position: "Managing Attorney",
        slug: "olga-prygoda",
        image: olgaImage,
        biography: [
            "Olga leads Corvell's corporate immigration practice. She brings fifteen years in U.S. business immigration, having led business-immigration teams in the United States and Canada before joining the firm.",
            "Her work spans the full range of corporate categories — TN, E-1/E-2, L-1, H- 1B, and O-1 — with a strong track record in extraordinary-ability and national- interest green cards (EB-1A and EB-2 NIW). She is active in the American Immigration Lawyers Association, where she has held chapter leadership roles, and is a U.S. Department of State Muskie Fellow. Since the war in Ukraine, she has volunteered legal support to displaced families."
        ],
        facts: [
            { label: "Focus", value: "TN, E-1/E-2, L-1, H-1B, O-1, EB-1A, EB-2 NIW, PERM" },
            { label: "Bar admission", value: "Washington State" },
            {
                label: "Education",
                value:
                    "LL.M., U.S. Law, Antonin Scalia Law School, George Mason University; LL.B. (Common Law), University of London"
            },
            { label: "Languages", value: "English, French, Russian, Ukrainian" }
        ]
    },
    {
        name: "Gabriela Reyes",
        role: "Attorney",
        position: "Managing Attorney",
        slug: "gabriela-reyes",
        image: gabrielaImage,
        biography: [
            "Gabriela leads Corvell's high-volume employment practice — the labor-certification and seasonal work that keeps large workforces staffed. In eighteen years of practice she has built and defended PERM, EB-3, Schedule A, H-1B and H-2B programs for employers in construction, hospitality, healthcare, and agriculture.",
            "Bilingual in English and Spanish, she works directly with employers and their"
        ],
        facts: [
            { label: "Focus", value: "PERM, EB-3, Schedule A, H-1B, H-2B, I-9 compliance" },
            { label: "Bar admission", value: "Florida" },
            {
                label: "Education",
                value: "J.D., University of Florida Levin College of Law; B.A., Florida International University"
            },
            { label: "Languages", value: "English, Spanish" }
        ]
    }
];

export const practiceConsultants = [
    {
        name: "Alex Pavlyk",
        position: "Immigration Practice Consultant",
        slug: "alex-pavlyk",
        image: alexImage,
        biography: [
            "Alex bridges legal practice and the systems that run it. Trained as an attorney with an LL.M. and a decade of litigation and consulting experience in Kyiv, he designs the AI-assisted workflows, case systems, and processes that let Corvell operate lean without cutting corners.",
            "He leads practice operations, technology, and strategy alongside the firm's licensed attorneys, and heads the firm's relationships with corporate clients."
        ],
        facts: [
            { label: "Focus", value: "Practice operations, workflow & technology, client strategy" },
            { label: "Education", value: "LL.M.; Master of Laws, Ukraine" },
            { label: "Languages", value: "Ukrainian, Russian, English" }
        ]
    }
];

export const paralegals = [
    {
        name: "Mateo Delgado",
        role: "Paralegal",
        image: mateoImage,
        biography:
            "Mateo supports the firm's employment-based and investor caseload, from evidence assembly through RFE preparation. He trained in law in Colombia and brings a meticulous eye to documentation.",
        languages: "English · Spanish"
    },
    {
        name: "Elena Barkova",
        role: "Paralegal",
        image: elenaImage,
        biography:
            "Elena manages PERM, H-2B, and EB-3 matters and works closely with beneficiaries worldwide, guiding them through document collection and filing.",
        languages: "English · Russian · Belarusian"
    },
    {
        name: "Rachel Thompson",
        role: "Paralegal",
        image: rachelImage,
        biography:
            "Rachel works across the full range of employment-based matters — corporate filings, PERM, and everything in between — keeping case timelines, USCIS correspondence, and compliance documentation on track so nothing slips between drafting and decision.",
        languages: "English · Russian · Belarusian"
    }
];

export const administrators = [
    {
        name: "Yvonne Carter",
        position: "Firm Administrator",
        slug: "yvonne-carter",
        image: yvonneImage,
        biography: [
            "Yvonne runs the firm's day-to-day operations — billing coordination, scheduling, facilities, and the hundred small things that keep a practice moving. With three decades in legal administration, she is often the first voice clients hear and the reason deadlines and details never fall through."
        ],
        facts: [
            { label: "Focus", value: "Operations, billing coordination, scheduling, facilities" },
            { label: "Experience", value: "30 years in legal administration" },
            { label: "Languages", value: "English" }
        ]
    }
];
