import RichText from "../../common/RichText/RichText";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./TeamMemberCard.css";

function TeamMemberCard({ person, headingLevel = 3 }) {
    const Heading = `h${headingLevel}`;

    return (
        <article className="team-member-card">
            <div className="team-member-card__media">
                <img className="team-member-card__image" src={person.image} alt={person.imageAlt ?? (typeof person.name === "string" ? person.name : "")} loading="lazy" />
            </div>
            <div className="team-member-card__body">
                <div className="team-member-card__summary">
                    <TextBlock className="team-member-card__role"><RichText value={person.role} /></TextBlock>
                    <div className="team-member-card__details">
                        <Heading className="team-member-card__name"><RichText value={person.name} /></Heading>
                        <TextBlock className="team-member-card__biography"><RichText value={person.biography} /></TextBlock>
                    </div>
                </div>
                <TextBlock className="team-member-card__languages"><RichText value={person.languages} /></TextBlock>
            </div>
        </article>
    );
}

export default TeamMemberCard;
