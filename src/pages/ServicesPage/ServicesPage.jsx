import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import PageMetadata from "../../components/app/PageMetadata/PageMetadata";
import { pageMetadata } from "../../content/metadata";
import { servicesPageBlocks } from "../../content/pages";
import "./ServicesPage.css";

function ServicesPage() {
    return (
        <main id="main-content">
            <PageMetadata {...pageMetadata.services} />
            <PageBlocks blocks={servicesPageBlocks} />
        </main>
    );
}

export default ServicesPage;
