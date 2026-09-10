import { aboutContent } from "./about";
import { careersPageContent } from "./careers";
import { contactPageContent } from "./contact";
import { firmAdvantages, firmMetrics } from "./firm";
import { homePageContent } from "./home";
import { clientLogos, industries, industriesPageContent, industryTickerItems } from "./industries";
import { guides, insightsPageContent } from "./insights";
import {
    administrators,
    attorneys,
    paralegals,
    practiceConsultants,
    teamPageContent
} from "./people";
import { serviceHighlights, serviceTickerItems, servicesPageContent } from "./services";

export const homePageBlocks = [
    { type: "home-hero", ...homePageContent.hero },
    {
        type: "text-ticker",
        className: "firm-metrics",
        items: firmMetrics,
        duration: "90s",
        cycles: 3
    },
    { type: "services-overview", ...homePageContent.servicesOverview, items: serviceHighlights },
    { type: "industries-showcase", ...homePageContent.industriesShowcase, industries, clientLogos },
    { type: "why-corvell", ...homePageContent.whyCorvell, items: firmAdvantages },
    { type: "guides-insights", ...homePageContent.guidesInsights, guides }
];

export const aboutPageBlocks = [
    { type: "about-story", ...aboutContent.story },
    { type: "firm-today", ...aboutContent.firmToday },
    {
        type: "people-preview",
        ...aboutContent.people,
        members: attorneys,
        link: { label: "Meet the team", path: "/team" }
    },
    {
        type: "link-list-cta",
        ...aboutContent.closing,
        flushTop: true,
        compactTitle: true,
        wideLinks: true
    }
];

export const teamPageBlocks = [
    { type: "page-intro", ...teamPageContent.intro },
    {
        type: "team-profiles",
        ...teamPageContent.attorneys,
        members: attorneys,
        alternate: true
    },
    {
        type: "team-profiles",
        ...teamPageContent.consulting,
        members: practiceConsultants,
        surface: true,
        compactHeading: true,
        compactList: true,
        spaced: true
    },
    { type: "team-cards", ...teamPageContent.paralegals, members: paralegals },
    {
        type: "team-profiles",
        ...teamPageContent.administration,
        members: administrators,
        surface: true,
        compactList: true,
        spaced: true
    },
    { type: "link-list-cta", ...teamPageContent.closing }
];

export const servicesPageBlocks = [
    { type: "page-intro", className: "services-page__intro", ...servicesPageContent.intro },
    {
        type: "text-ticker",
        className: "services-page__ticker",
        items: serviceTickerItems,
        duration: "64s",
        bordered: true
    },
    { type: "service-category", ...servicesPageContent.nonImmigrant, showImage: true },
    { type: "service-category", ...servicesPageContent.permanent, surface: true },
    { type: "labor-certification", ...servicesPageContent.laborCertification },
    { type: "compliance", ...servicesPageContent.compliance },
    { type: "action-banner", ...servicesPageContent.cta }
];

export const industriesPageBlocks = [
    { type: "industries-hero", ...industriesPageContent.hero },
    { type: "text-ticker", items: industryTickerItems, duration: "72s", bordered: true },
    { type: "industry-context", ...industriesPageContent.context },
    { type: "industry-directory", ...industriesPageContent.directory, industries },
    { type: "industry-method", ...industriesPageContent.method },
    { type: "action-banner", ...industriesPageContent.cta }
];

export const insightsPageBlocks = [
    { type: "page-intro", className: "insights-page__intro", ...insightsPageContent.intro },
    { type: "featured-insight", ...insightsPageContent.featured },
    { type: "insights-archive", ...insightsPageContent.archive },
    { type: "guide-collection", ...insightsPageContent.guides, guides, inverse: true }
];

export const careersPageBlocks = [
    {
        type: "page-intro",
        className: "careers-page__intro",
        variant: "compact",
        ...careersPageContent.intro
    },
    { type: "career-benefits", benefits: careersPageContent.benefits },
    { type: "careers-roles", ...careersPageContent.roles }
];

export const contactPageBlocks = [
    {
        type: "page-intro",
        className: "contact-page__intro",
        variant: "compact",
        ...contactPageContent.intro
    },
    { type: "contact-section", form: contactPageContent.form, details: contactPageContent.details }
];
