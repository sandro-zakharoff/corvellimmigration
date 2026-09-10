import RichText from "../../common/RichText/RichText";
import { Link } from "react-router-dom";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./PersonPreviewCard.css";

function PersonPreviewCard({ person }) {
    return (
        <article className="person-preview-card">
            <Link className="person-preview-card__link" to={`/team#${person.slug}`}>
                <div className="person-preview-card__media">
                    <img className="person-preview-card__image" src={person.image} alt={person.imageAlt ?? (typeof person.name === "string" ? person.name : "")} loading="lazy" />
                </div>
                <div className="person-preview-card__body">
                    <TextBlock className="person-preview-card__role"><RichText value={person.role} links={false} /></TextBlock>
                    <h3 className="person-preview-card__name"><RichText value={person.name} links={false} /></h3>
                </div>
            </Link>
        </article>
    );
}

export default PersonPreviewCard;
