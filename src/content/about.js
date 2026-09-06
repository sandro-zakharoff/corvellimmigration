import attorneysImage from "../assets/images/about-attorneys.jpg";
import storyImage from "../assets/images/about-story.jpg";

export const aboutContent = {
    story: {
        eyebrow: "Our story",
        title: "We started the firm we couldn't find.",
        image: storyImage,
        imageAlt: "Corvell Immigration team",
        paragraphs: [
            "Corvell was founded in Miami in 2024 by immigration professionals who had spent years on both sides of the process — advising companies and their employees, and moving through the system as immigrants themselves.",
            "We kept meeting the same problem. Employment-based immigration — the work that lets a company actually build its team — was treated as overflow at large firms. It moved slowly, cost more than the effort warranted, and left employers guessing where their cases stood.",
            "So we built a practice around that single kind of work: focused enough to stay fast, disciplined enough to stay precise, and running on its own technology from day one rather than bolted onto an older way of working. That focus is still the entire idea."
        ]
    },
    firmToday: {
        eyebrow: "The firm today",
        title: "Established, and\naccountable for every filing.",
        description:
            "Since 2024, Corvell has grown into a focused employment-immigration practice serving employers nationwide. Every petition passes through four layers of cutting-edge review process before it's ever filed.",
        metrics: [
            { value: "2024", label: "Founded in Miami" },
            { value: "5,240+", label: "Petitions filed" },
            { value: "98.6%", label: "Approval rate" },
            { value: "8", label: "Industries served" },
            { value: "30+", label: "Nationalities represented" },
            { value: "Nationwide", label: "Practice reach" }
        ],
        credentials: [
            "AILA member firm",
            "Licensed to practice nationwide",
            "Every filing attorney-reviewed",
            "SOC 2-aligned data handling"
        ]
    },
    people: {
        eyebrow: "The people behind Corvell",
        title: "The attorney behind the work.",
        image: attorneysImage,
        imageAlt: "Corvell attorneys working together",
        paragraphs: [
            "Corvell's attorneys have spent years in immigration practice alone, working case after case directly alongside USCIS officers. That close, repeated contact with how the agency actually reviews a file shapes every petition the firm sends out.",
            "Every matter is owned end to end, from the first filing to the final decision. The full background lives on the team page."
        ]
    },
    closing: {
        title: "Focused on one thing, on purpose.",
        links: [
            { label: "Meet the team", path: "/team" },
            { label: "See what we handle", path: "/services" },
            { label: "Get in touch", path: "/contact" }
        ]
    }
};
