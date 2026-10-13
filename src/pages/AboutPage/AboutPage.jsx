import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import PageMetadata from "../../components/app/PageMetadata/PageMetadata";
import { pageMetadata } from "../../content/metadata";
import { aboutPageBlocks } from "../../content/pages";

function AboutPage() {
    return (
        <main id="main-content">
            <PageMetadata {...pageMetadata.about} />
            <PageBlocks blocks={aboutPageBlocks} />
        </main>
    );
}

export default AboutPage;
