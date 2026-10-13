import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import PageMetadata from "../../components/app/PageMetadata/PageMetadata";
import { pageMetadata } from "../../content/metadata";
import { insightsPageBlocks } from "../../content/pages";
import "./InsightsPage.css";

function InsightsPage() {
    return (
        <main id="main-content">
            <PageMetadata {...pageMetadata.insights} />
            <PageBlocks blocks={insightsPageBlocks} />
        </main>
    );
}

export default InsightsPage;
