import { Link } from "react-router-dom";
import "./GuideCard.css";

function GuideCard({ guide }) {
    return (
        <article className="guide-card">
            <Link className="guide-card__link" to={guide.path}>
                <span className="guide-card__badge">PDF · Guide</span>
                <h3 className="guide-card__title">{guide.title}</h3>
                <span className="guide-card__action">
                    Download guide <span>↓</span>
                </span>
            </Link>
        </article>
    );
}

export default GuideCard;
