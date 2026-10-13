import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import PageMetadata from "../../components/app/PageMetadata/PageMetadata";
import { pageMetadata } from "../../content/metadata";
import { contactPageBlocks } from "../../content/pages";
import "./ContactPage.css";

function ContactPage() {
    return (
        <main className="contact-page" id="main-content">
            <PageMetadata {...pageMetadata.contact} />
            <PageBlocks blocks={contactPageBlocks} />
        </main>
    );
}

export default ContactPage;
