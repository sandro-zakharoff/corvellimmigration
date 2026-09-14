import { useState } from "react";
import RichText from "../RichText/RichText";
import GuideRequestDialog from "../../guides/GuideRequestDialog/GuideRequestDialog";
import GuideCard from "../../cards/GuideCard/GuideCard";
import ArrowLink from "../ArrowLink/ArrowLink";
import SectionIntro from "../SectionIntro/SectionIntro";
import "./GuideCollection.css";

function GuideCollection({ content, guides, inverse = false, footerLink }) {
    const [selectedGuide, setSelectedGuide] = useState(null);

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
                    {guides.map((guide, index) => (
                        <GuideCard guide={guide} onSelect={setSelectedGuide} key={guide.id ?? index} />
                    ))}
                </div>
                {footerLink && (
                    <div className="guide-collection__footer">
                        <ArrowLink to={footerLink.path} showArrow={footerLink.showArrow}>
                            <RichText value={footerLink.label} links={false} />
                        </ArrowLink>
                    </div>
                )}
            </div>
            {selectedGuide && <GuideRequestDialog guide={selectedGuide} onClose={() => setSelectedGuide(null)} />}
        </section>
    );
}

export default GuideCollection;
