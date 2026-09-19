import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import PageMetadata from "../../components/app/PageMetadata/PageMetadata";
import { h2bPageBlocks } from "../../content/pages";
import { h2bPageMetadata } from "../../content/h2b";

function H2BPage() {
    return (
        <main id="main-content">
            <PageMetadata {...h2bPageMetadata} />
            <PageBlocks blocks={h2bPageBlocks} />
        </main>
    );
}

export default H2BPage;
