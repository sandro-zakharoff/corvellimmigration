import RichText from "../RichText/RichText";
import TextBlock from "../TextBlock/TextBlock";
import "./DetailList.css";

function DetailList({ items, interactive = false, relaxed = false, className = "" }) {
    return (
        <div
            className={[
                "detail-list",
                interactive ? "detail-list--interactive" : "",
                relaxed ? "detail-list--relaxed" : "",
                className
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {items.map((item, index) => (
                <article className="detail-list__item" key={item.id ?? index}>
                    <div className="detail-list__identity">
                        <h3 className="detail-list__title"><RichText value={item.title} /></h3>
                        <TextBlock className="detail-list__label"><RichText value={item.label} /></TextBlock>
                    </div>
                    <TextBlock className="detail-list__description"><RichText value={item.description} /></TextBlock>
                </article>
            ))}
        </div>
    );
}

export default DetailList;
