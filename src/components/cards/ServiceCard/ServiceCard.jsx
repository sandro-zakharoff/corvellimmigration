import RichText from "../../common/RichText/RichText";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./ServiceCard.css";

function ServiceCard({ service }) {
    return (
        <article className="service-card">
            <div className="service-card__content">
                <TextBlock className="service-card__code"><RichText value={service.code} /></TextBlock>
                <h3 className="service-card__title"><RichText value={service.title} /></h3>
                <TextBlock className="service-card__description"><RichText value={service.description} /></TextBlock>
            </div>
            <div className="service-card__fits">
                <span className="service-card__fits-label">Fits</span>
                <TextBlock className="service-card__fits-value"><RichText value={service.fits} /></TextBlock>
            </div>
        </article>
    );
}

export default ServiceCard;
