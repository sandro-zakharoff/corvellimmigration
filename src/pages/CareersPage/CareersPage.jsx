import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import PageMetadata from "../../components/app/PageMetadata/PageMetadata";
import { pageMetadata } from "../../content/metadata";
import { careersPageBlocks } from "../../content/pages";
import "./CareersPage.css";

function CareersPage() {
    return (
        <main className="careers-page" id="main-content">
            <PageMetadata {...pageMetadata.careers} />
            <PageBlocks blocks={careersPageBlocks} />
        </main>
    );
}

export default CareersPage;
