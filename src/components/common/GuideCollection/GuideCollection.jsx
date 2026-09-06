import GuideCard from "../../cards/GuideCard/GuideCard";
import ArrowLink from "../ArrowLink/ArrowLink";
import SectionIntro from "../SectionIntro/SectionIntro";
import "./GuideCollection.css";

function GuideCollection({ content, guides, inverse = false, footerLink }) {
    return (
        <section className={`guide-collection${inverse ? " guide-collection--inverse" : ""}`}>
            <div className="guide-collection__inner container">
                <SectionIntro
                    className="guide-collection__intro"
                    eyebrow={content.eyebrow}
                    title={content.title}
                    description={content.description}
                    inverse={inverse}
                />
                <div className="guide-collection__grid">
                    {guides.map((guide) => (
                        <GuideCard guide={guide} key={guide.title} />
                    ))}
                </div>
                {footerLink && (
                    <div className="guide-collection__footer">
                        <ArrowLink to={footerLink.path} showArrow={footerLink.showArrow}>
                            {footerLink.label}
                        </ArrowLink>
                    </div>
                )}
            </div>
        </section>
    );
}

export default GuideCollection;
