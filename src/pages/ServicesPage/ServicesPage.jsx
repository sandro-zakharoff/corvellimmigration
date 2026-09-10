import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import { servicesPageBlocks } from "../../content/pages";
import "./ServicesPage.css";

function ServicesPage() {
    return (
        <main id="main-content">
            <PageBlocks blocks={servicesPageBlocks} />
        </main>
    );
}

export default ServicesPage;
