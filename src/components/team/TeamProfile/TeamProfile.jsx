import RichText from "../../common/RichText/RichText";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./TeamProfile.css";

function TeamProfile({ person, reverse = false, headingLevel = 3 }) {
    const Heading = `h${headingLevel}`;

    return (
        <article className={`team-profile${reverse ? " team-profile--reverse" : ""}`} id={person.slug}>
            <div className="team-profile__media">
                <img className="team-profile__image" src={person.image} alt={person.imageAlt ?? (typeof person.name === "string" ? person.name : "")} loading="lazy" />
            </div>
            <div className="team-profile__content">
                <div className="team-profile__heading">
                    <TextBlock className="team-profile__position"><RichText value={person.position} /></TextBlock>
                    <Heading className="team-profile__name"><RichText value={person.name} /></Heading>
                </div>
                <div className="team-profile__biography">
                    {person.biography.map((paragraph, index) => (
                        <p key={index}><RichText value={paragraph} /></p>
                    ))}
                </div>
                <div className="team-profile__facts">
                    {person.facts.map((fact, index) => (
                        <div className="team-profile__fact" key={fact.id ?? index}>
                            <span className="team-profile__fact-label"><RichText value={fact.label} /></span>
                            <span className="team-profile__fact-value"><RichText value={fact.value} /></span>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}

export default TeamProfile;
