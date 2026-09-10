import ButtonLink from "../ButtonLink/ButtonLink";
import TextBlock from "../TextBlock/TextBlock";
import RichText from "../RichText/RichText";
import "./ActionBanner.css";

function ActionBanner({ content }) {
    return (
        <section className="action-banner">
            <div className="action-banner__inner container">
                <div className="action-banner__content">
                    {content.eyebrow && (
                        <TextBlock className="action-banner__eyebrow"><RichText value={content.eyebrow} /></TextBlock>
                    )}
                    <h2 className="action-banner__title"><RichText value={content.title} /></h2>
                    {content.description && <TextBlock className="action-banner__description"><RichText value={content.description} /></TextBlock>}
                </div>
                {content.link && (
                    <ButtonLink className="action-banner__link" to={content.link.path}>
                        <RichText value={content.link.label} links={false} />
                    </ButtonLink>
                )}
            </div>
        </section>
    );
}

export default ActionBanner;
