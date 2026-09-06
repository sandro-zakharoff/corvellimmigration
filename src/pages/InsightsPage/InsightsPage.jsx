import GuideCollection from "../../components/common/GuideCollection/GuideCollection";
import PageIntro from "../../components/common/PageIntro/PageIntro";
import FeaturedInsight from "../../components/insights/FeaturedInsight/FeaturedInsight";
import InsightsArchive from "../../components/insights/InsightsArchive/InsightsArchive";
import { guides, insightsPageContent } from "../../content/insights";
import "./InsightsPage.css";

function InsightsPage() {
    return (
        <main id="main-content">
            <PageIntro className="insights-page__intro" {...insightsPageContent.intro} />
            <FeaturedInsight insight={insightsPageContent.featured} />
            <InsightsArchive content={insightsPageContent.archive} />
            <GuideCollection content={insightsPageContent.guides} guides={guides} inverse />
        </main>
    );
}

export default InsightsPage;
