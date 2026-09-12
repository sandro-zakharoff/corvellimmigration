import { contactFieldLimits, validateContactForm } from "../../../../shared/contactValidation";
import { sendContactForm } from "../../../services/contactForm";
import RequestForm from "../../common/RequestForm/RequestForm";

function ContactForm({ content }) {
    return (
        <RequestForm
            content={content}
            fieldLimits={contactFieldLimits}
            submit={sendContactForm}
            validate={validateContactForm}
        />
    );
}

export default ContactForm;
