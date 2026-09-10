import RichText from "../../common/RichText/RichText";
import IndustryCard from "../../cards/IndustryCard/IndustryCard";
import Marquee from "../../common/Marquee/Marquee";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./IndustriesShowcase.css";

function LogoSet({ logos }) {
    return (
        <>
            {Array.from({ length: 3 }, (_, cycleIndex) =>
                logos.map((logo) => (
                    <div className="industries-showcase__logo-item" key={`${cycleIndex}-${logo.name}`}>
                        <img src={logo.image} alt={cycleIndex > 0 ? "" : logo.name} loading="eager" />
                    </div>
                ))
            )}
        </>
    );
}

function IndustriesShowcase({ content }) {
    return (
        <section className="industries-showcase">
            <div className="container">
                <SectionIntro
                    className="industries-showcase__intro"
                    eyebrow={content.eyebrow}
                    title={content.title}
                />
                <div className="industries-showcase__grid">
                    {content.industries.map((industry, index) => (
                        <IndustryCard industry={industry} key={industry.id ?? index} />
                    ))}
                </div>
            </div>
            <div className="industries-showcase__clients">
                <TextBlock className="industries-showcase__clients-label container">
                    <RichText value={content.clientsLabel} />
                </TextBlock>
                <Marquee className="industries-showcase__logo-viewport" duration="28s">
                    <LogoSet logos={content.clientLogos} />
                </Marquee>
            </div>
        </section>
    );
}

export default IndustriesShowcase;
