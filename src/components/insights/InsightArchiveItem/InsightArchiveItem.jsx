import RichText from "../../common/RichText/RichText";
import { Link } from "react-router-dom";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./InsightArchiveItem.css";

function InsightArchiveItem({ item }) {
    return (
        <article className="insight-archive-item">
            <div className="insight-archive-item__date">
                <span className="insight-archive-item__quarter"><RichText value={item.quarter} /></span>
                <span className="insight-archive-item__month"><RichText value={item.month} /></span>
            </div>
            <div className="insight-archive-item__content">
                <h3 className="insight-archive-item__title"><RichText value={item.title} /></h3>
                <span className="insight-archive-item__category"><RichText value={item.category} /></span>
                <TextBlock className="insight-archive-item__description"><RichText value={item.description} /></TextBlock>
            </div>
            <Link className="insight-archive-item__link" to={item.path}>
                Read →
            </Link>
        </article>
    );
}

export default InsightArchiveItem;
