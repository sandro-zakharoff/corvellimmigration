import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import { careersPageBlocks } from "../../content/pages";
import "./CareersPage.css";

function CareersPage() {
    return (
        <main className="careers-page" id="main-content">
            <PageBlocks blocks={careersPageBlocks} />
        </main>
    );
}

export default CareersPage;
