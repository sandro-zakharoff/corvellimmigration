export const contactPageContent = {
    intro: {
        eyebrow: "Contact · For employers",
        title: "Let's talk about your workforce.",
        descriptionParts: [
            { text: "Tell us what your team needs. " },
            { text: "A member of our team will get back to you soon", emphasis: true },
            { text: " — not a bot, and not an intake queue." }
        ]
    },
    form: {
        fields: [
            {
                id: "full-name",
                name: "fullName",
                label: "Full name",
                placeholder: "Your name",
                type: "text",
                required: true
            },
            {
                id: "work-email",
                name: "workEmail",
                label: "Work email",
                placeholder: "you@company.com",
                type: "email",
                required: true
            },
            {
                id: "company",
                name: "company",
                label: "Company",
                placeholder: "Company name",
                type: "text",
                required: true
            },
            {
                id: "team-size",
                name: "teamSize",
                label: "Team size",
                optionalLabel: "(optional)",
                placeholder: "Select a range",
                type: "select"
            },
            {
                id: "message",
                name: "message",
                label: "How can we help?",
                placeholder:
                    "A few lines on the roles you're hiring, the visas you're considering, or the challenge you're facing.",
                type: "textarea",
                required: true
            }
        ],
        submitLabel: "Send message",
        validationMessages: {
            fullName: "Enter your full name.",
            workEmail: "Enter a valid work email.",
            company: "Enter your company name.",
            message: "Please add at least 20 characters."
        },
        statusMessages: {
            success: {
                type: "success",
                label: "Success",
                message: "Thank you. Your message has been sent. We'll be in touch soon."
            },
            warning: {
                type: "warning",
                label: "Check the form",
                message: "Please check the highlighted fields and try again."
            },
            rateLimited: {
                type: "warning",
                label: "Please wait",
                message: "Too many messages have been sent. Please wait a few minutes and try again."
            },
            error: {
                type: "error",
                label: "Message not sent",
                message: "We couldn't send your message. Please try again or email us directly."
            }
        },
        note:
            "Submitting this form doesn't create an attorney–client relationship. Please don't include confidential or time-sensitive case details here — we'll gather those securely once we connect."
    },
    details: {
        labels: {
            email: "Email",
            phone: "Phone",
            office: "Office",
            hours: "Hours"
        },
        mapLabel: "[ Map — Brickell, Miami ]",
        hours: "Mon–Fri · 9:00 AM – 6:00 PM ET"
    }
};
