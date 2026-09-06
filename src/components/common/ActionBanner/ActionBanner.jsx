import { Link } from "react-router-dom";
import TextBlock from "../TextBlock/TextBlock";
import "./ActionBanner.css";

function ActionBanner({ content, expanded = false }) {
    return (
        <section className={`action-banner${expanded ? " action-banner--expanded" : ""}`}>
            <div className="action-banner__inner container">
                <div className="action-banner__content">
                    {content.eyebrow && (
                        <TextBlock className="action-banner__eyebrow">{content.eyebrow}</TextBlock>
                    )}
                    <h2 className="action-banner__title">{content.title}</h2>
                    <TextBlock className="action-banner__description">{content.description}</TextBlock>
                </div>
                <Link className="action-banner__link" to={content.link.path}>
                    {content.link.label}
                </Link>
            </div>
        </section>
    );
}

export default ActionBanner;
