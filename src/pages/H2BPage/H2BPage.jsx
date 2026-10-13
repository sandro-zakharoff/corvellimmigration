import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import PageMetadata from "../../components/app/PageMetadata/PageMetadata";
import { h2bPageBlocks } from "../../content/pages";
import { pageMetadata } from "../../content/metadata";

function H2BPage() {
    return (
        <main id="main-content">
            <PageMetadata {...pageMetadata.h2b} />
            <PageBlocks blocks={h2bPageBlocks} />
        </main>
    );
}

export default H2BPage;
