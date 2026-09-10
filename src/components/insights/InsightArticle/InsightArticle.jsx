import ActionBanner from "../../common/ActionBanner/ActionBanner";
import Breadcrumbs from "../../common/Breadcrumbs/Breadcrumbs";
import RichText from "../../common/RichText/RichText";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./InsightArticle.css";

function InsightMeta({ items }) {
    return (
        <div className="insight-article__meta">
            {items.map((item, index) => (
                <span className="insight-article__meta-item" key={item}>
                    {index > 0 && <span className="insight-article__meta-separator">•</span>}
                    {item}
                </span>
            ))}
        </div>
    );
}

function InsightTable({ block }) {
    const columns = `minmax(210px, 1.75fr) repeat(${block.columns.length - 1}, minmax(120px, 1fr))`;

    return (
        <div className="insight-article__table-wrap">
            <TextBlock className="insight-article__table-caption">{block.caption}</TextBlock>
            <div className="insight-article__table">
                <div
                    className="insight-article__table-row insight-article__table-row--header"
                    style={{ gridTemplateColumns: columns }}
                >
                    {block.columns.map((column) => (
                        <span className="insight-article__table-heading" key={column}>
                            {column}
                        </span>
                    ))}
                </div>
                {block.rows.map((row, rowIndex) => (
                    <div className="insight-article__table-row" key={rowIndex} style={{ gridTemplateColumns: columns }}>
                        {row.map((cell, cellIndex) => {
                            const value = typeof cell === "string" ? { text: cell } : cell;

                            return (
                                <span
                                    className={`insight-article__table-cell${value.accent ? " insight-article__table-cell--accent" : ""}`}
                                    key={cellIndex}
                                >
                                    {value.text}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
            {block.note && <TextBlock className="insight-article__table-note">{block.note}</TextBlock>}
        </div>
    );
}

function InsightBlock({ block }) {
    if (block.type === "table") {
        return <InsightTable block={block} />;
    }

    if (block.type === "aside") {
        return (
            <div className="insight-article__aside">
                <h3 className="insight-article__aside-title">{block.title}</h3>
                <TextBlock className="insight-article__aside-text">{block.text}</TextBlock>
            </div>
        );
    }

    if (block.type === "callout") {
        return <TextBlock className="insight-article__callout">{block.text}</TextBlock>;
    }

    if (block.type === "list") {
        return (
            <div className="insight-article__list">
                {block.items.map((item) => (
                    <div className="insight-article__list-item" key={item.title}>
                        <h3 className="insight-article__list-title">{item.title}</h3>
                        <TextBlock className="insight-article__list-text">{item.text}</TextBlock>
                    </div>
                ))}
            </div>
        );
    }

    if (block.type === "image") {
        return (
            <figure className="insight-article__inline-media">
                <img src={block.src} alt={block.alt} />
                {block.caption && (
                    <figcaption className="insight-article__inline-caption">{block.caption}</figcaption>
                )}
            </figure>
        );
    }

    return <TextBlock className="insight-article__paragraph">{block.text}</TextBlock>;
}

function InsightSection({ section }) {
    return (
        <section className="insight-article__section">
            <TextBlock className="insight-article__section-number">{section.number}</TextBlock>
            <h2 className="insight-article__section-title">
                <RichText value={section.title} />
            </h2>
            <div className="insight-article__section-content">
                {section.content.map((block, index) => (
                    <InsightBlock block={block} key={`${block.type}-${index}`} />
                ))}
            </div>
        </section>
    );
}

function InsightArticle({ article }) {
    return (
        <>
            <Breadcrumbs parent={{ label: "Insights", path: "/insights" }} current={article.breadcrumb} />
            <section className="insight-article__header">
                <div className="insight-article__header-inner container">
                    <TextBlock className="insight-article__category">{article.category}</TextBlock>
                    <InsightMeta items={article.meta} />
                    <h1 className="insight-article__title">
                        <RichText value={article.title} />
                    </h1>
                    <TextBlock className="insight-article__description">{article.description}</TextBlock>
                    <TextBlock className="insight-article__byline">{article.byline}</TextBlock>
                </div>
            </section>
            {article.heroImage && (
                <section className="insight-article__media-section">
                    <div className="insight-article__media container">
                        <img src={article.heroImage.src} alt={article.heroImage.alt} />
                    </div>
                </section>
            )}
            {article.stats && (
                <section className="insight-article__stats-section">
                    <div className="insight-article__stats container">
                        {article.stats.map((stat) => (
                            <div className="insight-article__stat" key={stat.label}>
                                <span
                                    className={`insight-article__stat-value${stat.accent ? " insight-article__stat-value--accent" : ""}`}
                                >
                                    {stat.value}
                                </span>
                                <span className="insight-article__stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                    {article.statsNote && (
                        <TextBlock className="insight-article__stats-note">{article.statsNote}</TextBlock>
                    )}
                </section>
            )}
            <section className="insight-article__body">
                <div className="container">
                    {article.timeline && (
                        <div className="insight-article__timeline">
                            {article.timeline.map((item) => (
                                <div className="insight-article__timeline-item" key={item.date}>
                                    <span className="insight-article__timeline-date">{item.date}</span>
                                    <TextBlock className="insight-article__timeline-text">{item.text}</TextBlock>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="insight-article__body-content">
                        <TextBlock className="insight-article__lead">{article.lead}</TextBlock>
                        {article.sections.map((section) => (
                            <InsightSection section={section} key={section.number} />
                        ))}
                        {article.closing && (
                            <TextBlock className="insight-article__closing">{article.closing}</TextBlock>
                        )}
                        {article.sourceNote && (
                            <TextBlock className="insight-article__source-note">{article.sourceNote}</TextBlock>
                        )}
                    </div>
                </div>
            </section>
            {article.cta && <ActionBanner content={article.cta} />}
        </>
    );
}

export default InsightArticle;
