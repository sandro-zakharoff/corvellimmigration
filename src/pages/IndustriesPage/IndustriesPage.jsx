import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import { industriesPageBlocks } from "../../content/pages";

function IndustriesPage() {
    return (
        <main id="main-content">
            <PageBlocks blocks={industriesPageBlocks} />
        </main>
    );
}

export default IndustriesPage;
