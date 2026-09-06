import ProcessCard from "../../cards/ProcessCard/ProcessCard";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import ServiceNote from "../ServiceNote/ServiceNote";
import "./LaborCertificationSection.css";

function LaborCertificationSection({ content }) {
    return (
        <section className="labor-certification">
            <div className="labor-certification__inner container">
                <SectionIntro
                    className="labor-certification__intro"
                    eyebrow={content.eyebrow}
                    title={content.title}
                    description={content.description}
                    inverse
                    numbered
                />
                <div className="labor-certification__grid">
                    {content.steps.map((step) => (
                        <ProcessCard step={step} key={step.code} />
                    ))}
                </div>
                <ServiceNote inverse>{content.note}</ServiceNote>
            </div>
        </section>
    );
}

export default LaborCertificationSection;
