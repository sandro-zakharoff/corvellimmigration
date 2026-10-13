import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import PageMetadata from "../../components/app/PageMetadata/PageMetadata";
import { pageMetadata } from "../../content/metadata";
import { homePageBlocks } from "../../content/pages";

function HomePage() {
    return (
        <main id="main-content">
            <PageMetadata {...pageMetadata.home} />
            <PageBlocks blocks={homePageBlocks} />
        </main>
    );
}

export default HomePage;
