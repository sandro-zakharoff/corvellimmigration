import ProcessCard from "../../cards/ProcessCard/ProcessCard";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import "./IndustryMethod.css";

function IndustryMethod({ content }) {
    return (
        <section className="industry-method">
            <div className="industry-method__inner container">
                <SectionIntro eyebrow={content.eyebrow} title={content.title} inverse />
                <div className="industry-method__grid">
                    {content.steps.map((step) => (
                        <ProcessCard step={step} key={step.code} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default IndustryMethod;
