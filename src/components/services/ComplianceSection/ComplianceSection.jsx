import SectionIntro from "../../common/SectionIntro/SectionIntro";
import DetailList from "../../common/DetailList/DetailList";
import "./ComplianceSection.css";

function ComplianceSection({ content }) {
    return (
        <section className="compliance-section">
            <div className="compliance-section__inner container">
                <SectionIntro
                    className="compliance-section__intro"
                    eyebrow={content.eyebrow}
                    title={content.title}
                    description={content.description}
                    numbered
                />
                <DetailList className="compliance-section__list" items={content.items} />
            </div>
        </section>
    );
}

export default ComplianceSection;
