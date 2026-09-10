import PageBlocks from "../../components/common/PageBlocks/PageBlocks";
import { contactPageBlocks } from "../../content/pages";
import "./ContactPage.css";

function ContactPage() {
    return (
        <main className="contact-page" id="main-content">
            <PageBlocks blocks={contactPageBlocks} />
        </main>
    );
}

export default ContactPage;
