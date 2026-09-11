import { Fragment } from "react";
import { groupPageBlocks, validateBlocks } from "../../../lib/content/contentModel.js";
import Hero from "../../home/Hero/Hero";
import ServicesOverview from "../../home/ServicesOverview/ServicesOverview";
import IndustriesShowcase from "../../home/IndustriesShowcase/IndustriesShowcase";
import WhyCorvell from "../../home/WhyCorvell/WhyCorvell";
import GuidesInsights from "../../home/GuidesInsights/GuidesInsights";
import AboutStory from "../../about/AboutStory/AboutStory";
import FirmToday from "../../about/FirmToday/FirmToday";
import PeoplePreview from "../../about/PeoplePreview/PeoplePreview";
import TeamProfilesSection from "../../team/TeamProfilesSection/TeamProfilesSection";
import TeamCardsSection from "../../team/TeamCardsSection/TeamCardsSection";
import ServiceCategorySection from "../../services/ServiceCategorySection/ServiceCategorySection";
import LaborCertificationSection from "../../services/LaborCertificationSection/LaborCertificationSection";
import ComplianceSection from "../../services/ComplianceSection/ComplianceSection";
import IndustriesHero from "../../industries/IndustriesHero/IndustriesHero";
import IndustryContext from "../../industries/IndustryContext/IndustryContext";
import IndustryDirectory from "../../industries/IndustryDirectory/IndustryDirectory";
import IndustryMethod from "../../industries/IndustryMethod/IndustryMethod";
import {
    IndustryHero,
    IndustryRoutes,
    IndustryRoles,
    IndustryProcess,
    IndustryExecution,
    IndustryTestimonial,
    IndustryBenefits,
    IndustryCost,
    IndustryRelated
} from "../../industries/IndustryDetail/IndustrySections";
import FeaturedInsight from "../../insights/FeaturedInsight/FeaturedInsight";
import InsightsArchive from "../../insights/InsightsArchive/InsightsArchive";
import { InsightHeader, InsightCover, InsightStats } from "../../insights/InsightArticle/InsightSections";
import CareerBenefits from "../../careers/CareerBenefits/CareerBenefits";
import CareersRoles from "../../careers/CareersRoles/CareersRoles";
import ContactSection from "../../contact/ContactSection/ContactSection";
import PageIntro from "../PageIntro/PageIntro";
import TextTicker from "../TextTicker/TextTicker";
import LinkListCta from "../LinkListCta/LinkListCta";
import ActionBanner from "../ActionBanner/ActionBanner";
import GuideCollection from "../GuideCollection/GuideCollection";
import {
    ContentSection,
    ContentGroup,
    ContentParagraph,
    ContentImage,
    ContentTable,
    ContentAside,
    ContentCallout,
    ContentList,
    ContentNote,
    ContentTimeline,
    ContentHeading,
    ContentLink,
    ContentStats
} from "../ContentBlocks/ContentBlocks";

export const blockRenderers = {
    "home-hero": Hero,
    "services-overview": ServicesOverview,
    "industries-showcase": IndustriesShowcase,
    "why-corvell": WhyCorvell,
    "guides-insights": GuidesInsights,
    "about-story": AboutStory,
    "firm-today": FirmToday,
    "people-preview": PeoplePreview,
    "page-intro": ({ content }) => <PageIntro {...content} />,
    "text-ticker": ({ content }) => <TextTicker {...content} />,
    "link-list-cta": ({ content }) => <LinkListCta content={content} {...content} />,
    "team-profiles": ({ content }) => <TeamProfilesSection section={content} {...content} />,
    "team-cards": ({ content }) => <TeamCardsSection section={content} members={content.members} />,
    "service-category": ({ content }) => <ServiceCategorySection content={content} image={content.showImage} surface={content.surface} />,
    "labor-certification": LaborCertificationSection,
    compliance: ComplianceSection,
    "action-banner": ActionBanner,
    "industries-hero": IndustriesHero,
    "industry-context": IndustryContext,
    "industry-directory": ({ content }) => <IndustryDirectory content={content} industries={content.industries} />,
    "industry-method": IndustryMethod,
    "featured-insight": ({ content }) => <FeaturedInsight insight={content} />,
    "insights-archive": InsightsArchive,
    "guide-collection": ({ content }) => <GuideCollection content={content} {...content} />,
    "career-benefits": ({ content }) => <CareerBenefits benefits={content.benefits} />,
    "careers-roles": CareersRoles,
    "contact-section": ContactSection,
    "industry-hero": IndustryHero,
    "industry-routes": IndustryRoutes,
    "industry-roles": IndustryRoles,
    "industry-process": IndustryProcess,
    "industry-execution": IndustryExecution,
    "industry-testimonial": IndustryTestimonial,
    "industry-benefits": IndustryBenefits,
    "industry-cost": IndustryCost,
    "industry-related": IndustryRelated,
    "insight-header": InsightHeader,
    "insight-cover": InsightCover,
    "insight-stats": InsightStats,
    content: ContentSection,
    section: ContentGroup,
    paragraph: ContentParagraph,
    image: ContentImage,
    table: ContentTable,
    aside: ContentAside,
    callout: ContentCallout,
    list: ContentList,
    note: ContentNote,
    timeline: ContentTimeline,
    heading: ContentHeading,
    link: ContentLink,
    stats: ContentStats
};

function renderBlock(block, index) {
    if (block.hidden) {
        return null;
    }

    const Component = blockRenderers[block.type];

    if (!Component) {
        throw new Error(`Неизвестный блок: ${block.type}`);
    }

    return (
        <Fragment key={block.id || `${block.type}-${index}`}>
            <Component content={block} renderBlock={renderBlock}>
                {block.type === "section" && block.blocks.map(renderBlock)}
            </Component>
        </Fragment>
    );
}

function PageBlocks({ blocks }) {
    validateBlocks(blocks);
    return groupPageBlocks(blocks).map(renderBlock);
}

export default PageBlocks;
