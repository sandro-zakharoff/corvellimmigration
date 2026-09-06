import { contactDetails } from "../../../content/site";
import ContactDetails from "../ContactDetails/ContactDetails";
import ContactForm from "../ContactForm/ContactForm";
import "./ContactSection.css";

function ContactSection({ content }) {
    return (
        <section className="contact-section">
            <div className="contact-section__inner container">
                <ContactForm content={content.form} />
                <ContactDetails content={content.details} contactDetails={contactDetails} />
            </div>
        </section>
    );
}

export default ContactSection;
