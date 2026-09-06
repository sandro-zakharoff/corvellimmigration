import mapImage from "../../../assets/images/contact-map.png";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./ContactDetails.css";

function ContactDetails({ content, contactDetails }) {
    return (
        <div className="contact-details">
            <div className="contact-details__item contact-details__item--first">
                <TextBlock className="contact-details__label">{content.labels.email}</TextBlock>
                <a className="contact-details__value contact-details__value--email" href={`mailto:${contactDetails.email}`}>
                    {contactDetails.email}
                </a>
            </div>
            <div className="contact-details__item">
                <TextBlock className="contact-details__label">{content.labels.phone}</TextBlock>
                <a className="contact-details__value" href={`tel:${contactDetails.phoneHref}`}>
                    {contactDetails.phone}
                </a>
            </div>
            <div className="contact-details__item contact-details__item--office">
                <TextBlock className="contact-details__label">{content.labels.office}</TextBlock>
                <TextBlock className="contact-details__value contact-details__value--address">
                    {contactDetails.address.map((line) => (
                        <span key={line}>{line}</span>
                    ))}
                </TextBlock>
                <div className="contact-details__map">
                    <img className="contact-details__map-image" src={mapImage} alt="" />
                    <span className="contact-details__map-label">{content.mapLabel}</span>
                </div>
            </div>
            <div className="contact-details__item contact-details__item--last">
                <TextBlock className="contact-details__label">{content.labels.hours}</TextBlock>
                <TextBlock className="contact-details__value">{content.hours}</TextBlock>
            </div>
        </div>
    );
}

export default ContactDetails;
