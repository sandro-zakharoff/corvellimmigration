import RichText from "../../common/RichText/RichText";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./InsightArticle.css";

export function InsightHeader({ content }) {
    return (
        <section className="insight-article__header">
            <div className="insight-article__header-inner container">
                {content.category && (
                    <TextBlock className="insight-article__category"><RichText value={content.category} /></TextBlock>
                )}
                {content.meta?.length > 0 && (
                    <div className="insight-article__meta">
                        {content.meta.map((item, index) => (
                            <span className="insight-article__meta-item" key={index}>
                                {index > 0 && <span className="insight-article__meta-separator">•</span>}
                                <RichText value={item} />
                            </span>
                        ))}
                    </div>
                )}
                <h1 className="insight-article__title"><RichText value={content.title} /></h1>
                {content.description && (
                    <TextBlock className="insight-article__description"><RichText value={content.description} /></TextBlock>
                )}
                {content.byline && (
                    <TextBlock className="insight-article__byline"><RichText value={content.byline} /></TextBlock>
                )}
            </div>
        </section>
    );
}

export function InsightCover({ content }) {
    return (
        <section className="insight-article__media-section">
            <div className="insight-article__media container">
                <img src={content.src} alt={content.alt} />
            </div>
        </section>
    );
}

export function InsightStats({ content }) {
    if (content.items.length === 0) {
        return null;
    }

    return (
        <section className="insight-article__stats-section">
            <div className="insight-article__stats container" style={{ "--stat-columns": Math.min(content.items.length, 4) }}>
                {content.items.map((stat, index) => (
                    <div className="insight-article__stat" key={index}>
                        <span className={`insight-article__stat-value${stat.accent ? " insight-article__stat-value--accent" : ""}`}>
                            <RichText value={stat.value} />
                        </span>
                        <span className="insight-article__stat-label"><RichText value={stat.label} /></span>
                    </div>
                ))}
            </div>
            {content.note && (
                <TextBlock className="insight-article__stats-note"><RichText value={content.note} /></TextBlock>
            )}
        </section>
    );
}
