import TeamMemberCard from "../../cards/TeamMemberCard/TeamMemberCard";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import "./TeamCardsSection.css";

function TeamCardsSection({ section, members }) {
    return (
        <section className="team-cards-section">
            <div className="team-cards-section__inner container">
                <SectionIntro eyebrow={section.eyebrow} title={section.title} />
                <div className="team-cards-section__grid">
                    {members.map((person) => (
                        <TeamMemberCard person={person} key={person.name} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TeamCardsSection;
