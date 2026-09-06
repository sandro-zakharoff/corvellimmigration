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
            {items.map((item) => (
                <article className="detail-list__item" key={item.title}>
                    <div className="detail-list__identity">
                        <h3 className="detail-list__title">{item.title}</h3>
                        <TextBlock className="detail-list__label">{item.label}</TextBlock>
                    </div>
                    <TextBlock className="detail-list__description">{item.description}</TextBlock>
                </article>
            ))}
        </div>
    );
}

export default DetailList;
