import TextBlock from "../../common/TextBlock/TextBlock";
import RichText from "../../common/RichText/RichText";
import "./FeatureCard.css";

function FeatureCard({ item, className = "", headingLevel = 3 }) {
    const Heading = `h${headingLevel}`;

    return (
        <article className={["feature-card", className].filter(Boolean).join(" ")}>
            {item.label && <TextBlock className="feature-card__label"><RichText value={item.label} /></TextBlock>}
            <Heading className="feature-card__title"><RichText value={item.title} /></Heading>
            {item.description && <TextBlock className="feature-card__description"><RichText value={item.description} /></TextBlock>}
        </article>
    );
}

export default FeatureCard;
