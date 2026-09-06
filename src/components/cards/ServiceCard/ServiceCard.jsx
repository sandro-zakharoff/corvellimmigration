import TextBlock from "../../common/TextBlock/TextBlock";
import "./ServiceCard.css";

function ServiceCard({ service }) {
    return (
        <article className="service-card">
            <div className="service-card__content">
                <TextBlock className="service-card__code">{service.code}</TextBlock>
                <h3 className="service-card__title">{service.title}</h3>
                <TextBlock className="service-card__description">{service.description}</TextBlock>
            </div>
            <div className="service-card__fits">
                <span className="service-card__fits-label">Fits</span>
                <TextBlock className="service-card__fits-value">{service.fits}</TextBlock>
            </div>
        </article>
    );
}

export default ServiceCard;
