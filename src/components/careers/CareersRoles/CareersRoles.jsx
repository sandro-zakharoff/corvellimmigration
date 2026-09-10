import SectionIntro from "../../common/SectionIntro/SectionIntro";
import TextBlock from "../../common/TextBlock/TextBlock";
import RichText from "../../common/RichText/RichText";
import CareerRoleCard from "../CareerRoleCard/CareerRoleCard";
import "./CareersRoles.css";

function CareersRoles({ content }) {
    return (
        <section className="careers-roles">
            <div className="careers-roles__inner container">
                <SectionIntro eyebrow={content.eyebrow} title={content.title} />
                <TextBlock className="careers-roles__updated"><RichText value={content.updated} /></TextBlock>
                <div className="careers-roles__list">
                    {content.items.map((role) => (
                        <CareerRoleCard role={role} key={role.slug} />
                    ))}
                </div>
                <div className="careers-roles__note">
                    <TextBlock className="careers-roles__note-heading">
                        <strong><RichText value={content.note.emphasis} /></strong>
                    </TextBlock>
                    <TextBlock className="careers-roles__note-description"><RichText value={content.note.description} /></TextBlock>
                </div>
            </div>
        </section>
    );
}

export default CareersRoles;
