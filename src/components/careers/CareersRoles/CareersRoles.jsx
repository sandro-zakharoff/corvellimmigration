import SectionIntro from "../../common/SectionIntro/SectionIntro";
import TextBlock from "../../common/TextBlock/TextBlock";
import CareerRoleCard from "../CareerRoleCard/CareerRoleCard";
import "./CareersRoles.css";

function CareersRoles({ content }) {
    return (
        <section className="careers-roles">
            <div className="careers-roles__inner container">
                <SectionIntro eyebrow={content.eyebrow} title={content.title} />
                <TextBlock className="careers-roles__updated">{content.updated}</TextBlock>
                <div className="careers-roles__list">
                    {content.items.map((role) => (
                        <CareerRoleCard role={role} key={role.slug} />
                    ))}
                </div>
                <div className="careers-roles__note">
                    <TextBlock className="careers-roles__note-heading">
                        <strong>{content.note.emphasis}</strong>
                    </TextBlock>
                    <TextBlock className="careers-roles__note-description">{content.note.description}</TextBlock>
                </div>
            </div>
        </section>
    );
}

export default CareersRoles;
