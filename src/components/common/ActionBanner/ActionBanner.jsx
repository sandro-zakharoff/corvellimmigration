import ButtonLink from "../ButtonLink/ButtonLink";
import TextBlock from "../TextBlock/TextBlock";
import RichText from "../RichText/RichText";
import "./ActionBanner.css";

function ActionBanner({ content }) {
    const primaryLink = content.link && (
        <ButtonLink className="action-banner__link" to={content.link.path}>
            <RichText value={content.link.label} links={false} />
        </ButtonLink>
    );

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
                {content.secondaryLink ? (
                    <div className="action-banner__actions">
                        {primaryLink}
                        <TextBlock className="action-banner__secondary">
                            {content.secondaryLink.prefix && (
                                <>
                                    <RichText value={content.secondaryLink.prefix} links={false} />
                                    {" "}
                                </>
                            )}
                            <a className="action-banner__secondary-link" href={content.secondaryLink.path}>
                                <RichText value={content.secondaryLink.label} links={false} />
                            </a>
                        </TextBlock>
                    </div>
                ) : primaryLink}
            </div>
        </section>
    );
}

export default ActionBanner;
