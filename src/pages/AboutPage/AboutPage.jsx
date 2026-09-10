import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import { aboutPageBlocks } from "../../content/pages";

function AboutPage() {
    return (
        <main id="main-content">
            <PageBlocks blocks={aboutPageBlocks} />
        </main>
    );
}

export default AboutPage;
