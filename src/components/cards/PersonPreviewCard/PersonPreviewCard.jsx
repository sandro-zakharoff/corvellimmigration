import { Link } from "react-router-dom";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./PersonPreviewCard.css";

function PersonPreviewCard({ person }) {
    return (
        <article className="person-preview-card">
            <Link className="person-preview-card__link" to={`/team#${person.slug}`}>
                <div className="person-preview-card__media">
                    <img className="person-preview-card__image" src={person.image} alt={person.name} loading="lazy" />
                </div>
                <div className="person-preview-card__body">
                    <TextBlock className="person-preview-card__role">{person.role}</TextBlock>
                    <h3 className="person-preview-card__name">{person.name}</h3>
                </div>
            </Link>
        </article>
    );
}

export default PersonPreviewCard;
