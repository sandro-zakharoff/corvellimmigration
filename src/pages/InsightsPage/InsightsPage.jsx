import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import { insightsPageBlocks } from "../../content/pages";
import "./InsightsPage.css";

function InsightsPage() {
    return (
        <main id="main-content">
            <PageBlocks blocks={insightsPageBlocks} />
        </main>
    );
}

export default InsightsPage;
