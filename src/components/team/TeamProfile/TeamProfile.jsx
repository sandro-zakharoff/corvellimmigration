import TextBlock from "../../common/TextBlock/TextBlock";
import "./TeamProfile.css";

function TeamProfile({ person, reverse = false, headingLevel = 3 }) {
    const Heading = `h${headingLevel}`;

    return (
        <article className={`team-profile${reverse ? " team-profile--reverse" : ""}`} id={person.slug}>
            <div className="team-profile__media">
                <img className="team-profile__image" src={person.image} alt={person.name} loading="lazy" />
            </div>
            <div className="team-profile__content">
                <div className="team-profile__heading">
                    <TextBlock className="team-profile__position">{person.position}</TextBlock>
                    <Heading className="team-profile__name">{person.name}</Heading>
                </div>
                <div className="team-profile__biography">
                    {person.biography.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
                <div className="team-profile__facts">
                    {person.facts.map((fact) => (
                        <div className="team-profile__fact" key={fact.label}>
                            <span className="team-profile__fact-label">{fact.label}</span>
                            <span className="team-profile__fact-value">{fact.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}

export default TeamProfile;
