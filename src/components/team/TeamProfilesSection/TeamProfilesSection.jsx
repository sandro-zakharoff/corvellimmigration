import SectionIntro from "../../common/SectionIntro/SectionIntro";
import TeamProfile from "../TeamProfile/TeamProfile";
import "./TeamProfilesSection.css";

function TeamProfilesSection({
    section,
    members,
    alternate = false,
    surface = false,
    compactHeading = false,
    compactList = false,
    spaced = false
}) {
    return (
        <section
            className={[
                "team-profiles-section",
                surface ? "team-profiles-section--surface" : "",
                compactHeading ? "team-profiles-section--compact-heading" : "",
                compactList ? "team-profiles-section--compact-list" : "",
                spaced ? "team-profiles-section--spaced" : ""
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className="team-profiles-section__inner container">
                <SectionIntro eyebrow={section.eyebrow} title={section.title} />
                <div className="team-profiles-section__list">
                    {members.map((person, index) => (
                        <TeamProfile
                            person={person}
                            reverse={alternate && index % 2 === 1}
                            key={person.id ?? index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TeamProfilesSection;
