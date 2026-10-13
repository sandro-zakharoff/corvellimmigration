import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import PageMetadata from "../../components/app/PageMetadata/PageMetadata";
import { pageMetadata } from "../../content/metadata";
import { teamPageBlocks } from "../../content/pages";

function TeamPage() {
    return (
        <main id="main-content">
            <PageMetadata {...pageMetadata.team} />
            <PageBlocks blocks={teamPageBlocks} />
        </main>
    );
}

export default TeamPage;
