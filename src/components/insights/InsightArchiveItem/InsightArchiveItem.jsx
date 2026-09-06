import { Link } from "react-router-dom";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./InsightArchiveItem.css";

function InsightArchiveItem({ item }) {
    return (
        <article className="insight-archive-item">
            <div className="insight-archive-item__date">
                <span className="insight-archive-item__quarter">{item.quarter}</span>
                <span className="insight-archive-item__month">{item.month}</span>
            </div>
            <div className="insight-archive-item__content">
                <h3 className="insight-archive-item__title">{item.title}</h3>
                <span className="insight-archive-item__category">{item.category}</span>
                <TextBlock className="insight-archive-item__description">{item.description}</TextBlock>
            </div>
            <Link className="insight-archive-item__link" to={item.path}>
                Read →
            </Link>
        </article>
    );
}

export default InsightArchiveItem;
