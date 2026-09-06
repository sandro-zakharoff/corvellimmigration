import TextBlock from "../../common/TextBlock/TextBlock";
import "./FeatureCard.css";

function FeatureCard({ item, className = "" }) {
    return (
        <article className={["feature-card", className].filter(Boolean).join(" ")}>
            <TextBlock className="feature-card__label">{item.label}</TextBlock>
            <h3 className="feature-card__title">{item.title}</h3>
            <TextBlock className="feature-card__description">{item.description}</TextBlock>
        </article>
    );
}

export default FeatureCard;
