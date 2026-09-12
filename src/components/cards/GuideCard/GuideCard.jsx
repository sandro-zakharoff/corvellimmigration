import RichText from "../../common/RichText/RichText";
import "./GuideCard.css";

function GuideCard({ guide, onSelect }) {
    return (
        <article className="guide-card">
            <button className="guide-card__link" type="button" onClick={() => onSelect(guide)}>
                <span className="guide-card__badge">PDF · Guide</span>
                <span className="guide-card__title"><RichText value={guide.title} links={false} /></span>
                <span className="guide-card__action">
                    Download guide <span>↓</span>
                </span>
            </button>
        </article>
    );
}

export default GuideCard;
