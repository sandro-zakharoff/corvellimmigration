import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import PageMetadata from "../../components/app/PageMetadata/PageMetadata";
import { pageMetadata } from "../../content/metadata";
import { industriesPageBlocks } from "../../content/pages";

function IndustriesPage() {
    return (
        <main id="main-content">
            <PageMetadata {...pageMetadata.industries} />
            <PageBlocks blocks={industriesPageBlocks} />
        </main>
    );
}

export default IndustriesPage;
