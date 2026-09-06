import ContactSection from "../../components/contact/ContactSection/ContactSection";
import PageIntro from "../../components/common/PageIntro/PageIntro";
import { contactPageContent } from "../../content/contact";
import "./ContactPage.css";

function ContactPage() {
    return (
        <main className="contact-page" id="main-content">
            <PageIntro className="contact-page__intro" variant="compact" {...contactPageContent.intro} />
            <ContactSection content={contactPageContent} />
        </main>
    );
}

export default ContactPage;
