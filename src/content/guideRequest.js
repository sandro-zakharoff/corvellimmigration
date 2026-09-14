export const guideRequestContent = {
    eyebrow: "PDF · Guide",
    description: "Tell us a bit about yourself and we'll email the PDF straight over.",
    fields: [
        { id: "guide-name", name: "fullName", label: "Name", placeholder: "Your name", type: "text", required: true, autoComplete: "name" },
        { id: "guide-title", name: "jobTitle", label: "Title", placeholder: "Job title", type: "text", required: true, autoComplete: "organization-title" },
        { id: "guide-company", name: "company", label: "Company", placeholder: "Company name", type: "text", required: true, wide: true, autoComplete: "organization" },
        { id: "guide-email", name: "workEmail", label: "Work email", placeholder: "you@company.com", type: "email", required: true, wide: true, autoComplete: "email" }
    ],
    submitLabel: "Email me the guide →",
    submittingLabel: "Submitting…",
    validationMessages: {
        fullName: "Enter your full name.",
        jobTitle: "Enter your job title.",
        company: "Enter your company name.",
        workEmail: "Enter a valid work email."
    },
    statusMessages: {
        success: {
            type: "success",
            label: "Request received",
            message: "We'll email your guide shortly. Please check your inbox and spam folder."
        },
        warning: {
            type: "warning",
            label: "Check the form",
            message: "Please check the highlighted fields and try again."
        },
        rateLimited: {
            type: "warning",
            label: "Please wait",
            message: "You've recently requested a guide. Please wait a few minutes before trying again."
        },
        error: {
            type: "error",
            label: "Request not completed",
            message: "We couldn't confirm your request. Please try again in a moment."
        },
        unavailable: {
            type: "error",
            label: "Temporarily unavailable",
            message: "Guide requests are temporarily unavailable. Please try again later."
        }
    },
    note: "Your details are shared with our team to fulfil this guide request."
};
