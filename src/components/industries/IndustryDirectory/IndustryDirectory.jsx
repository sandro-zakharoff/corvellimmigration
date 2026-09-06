import IndustryCard from "../../cards/IndustryCard/IndustryCard";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import "./IndustryDirectory.css";

function IndustryDirectory({ content, industries }) {
    return (
        <section className="industry-directory">
            <div className="industry-directory__inner container">
                <SectionIntro
                    className="industry-directory__intro"
                    eyebrow={content.eyebrow}
                    title={content.title}
                />
                <div className="industry-directory__grid">
                    {industries.map((industry) => (
                        <IndustryCard industry={industry} variant="directory" key={industry.title} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default IndustryDirectory;
