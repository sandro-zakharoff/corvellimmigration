import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import { homePageBlocks } from "../../content/pages";

function HomePage() {
    return (
        <main id="main-content">
            <PageBlocks blocks={homePageBlocks} />
        </main>
    );
}

export default HomePage;
