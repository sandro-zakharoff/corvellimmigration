import RichText from "../RichText/RichText";
import TextBlock from "../TextBlock/TextBlock";
import "./DetailList.css";

function DetailList({ items, interactive = false, relaxed = false, metrics = false, headingLevel = 3, className = "" }) {
    const Heading = `h${headingLevel}`;

    return (
        <div
            className={[
                "detail-list",
                interactive ? "detail-list--interactive" : "",
                relaxed ? "detail-list--relaxed" : "",
                metrics ? "detail-list--metrics" : "",
                className
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {items.map((item, index) => (
                <article className={`detail-list__item${metrics && item.highlighted ? " detail-list__item--highlighted" : ""}`} key={item.id ?? index}>
                    <div className="detail-list__identity">
                        {item.eyebrow && <TextBlock className="detail-list__eyebrow"><RichText value={item.eyebrow} /></TextBlock>}
                        <Heading className="detail-list__title"><RichText value={item.title} /></Heading>
                        {item.label && <TextBlock className="detail-list__label"><RichText value={item.label} /></TextBlock>}
                    </div>
                    <TextBlock className="detail-list__description"><RichText value={item.description} /></TextBlock>
                    {metrics && item.metrics?.length > 0 && (
                        <div className="detail-list__metrics">
                            {item.metrics.map((metric, metricIndex) => (
                                <div className="detail-list__metric" key={metricIndex}>
                                    <span className={`detail-list__metric-value detail-list__metric-value--${metric.tone || "ink"}`}>
                                        <RichText value={metric.value} />
                                    </span>
                                    {metric.label && <TextBlock className="detail-list__metric-label"><RichText value={metric.label} /></TextBlock>}
                                </div>
                            ))}
                        </div>
                    )}
                </article>
            ))}
        </div>
    );
}

export default DetailList;
