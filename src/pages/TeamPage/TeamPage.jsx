import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import { teamPageBlocks } from "../../content/pages";

function TeamPage() {
    return (
        <main id="main-content">
            <PageBlocks blocks={teamPageBlocks} />
        </main>
    );
}

export default TeamPage;
