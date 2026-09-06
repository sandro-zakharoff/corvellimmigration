import IndustryCard from "../../cards/IndustryCard/IndustryCard";
import Marquee from "../../common/Marquee/Marquee";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import TextBlock from "../../common/TextBlock/TextBlock";
import { clientLogos, industries } from "../../../content/industries";
import "./IndustriesShowcase.css";

function LogoSet() {
    return (
        <>
            {Array.from({ length: 3 }, (_, cycleIndex) =>
                clientLogos.map((logo) => (
                    <div className="industries-showcase__logo-item" key={`${cycleIndex}-${logo.name}`}>
                        <img src={logo.image} alt={cycleIndex > 0 ? "" : logo.name} loading="eager" />
                    </div>
                ))
            )}
        </>
    );
}

function IndustriesShowcase() {
    return (
        <section className="industries-showcase">
            <div className="container">
                <SectionIntro
                    className="industries-showcase__intro"
                    eyebrow="Who we serve"
                    title="Industries that run on the workforce we handle."
                />
                <div className="industries-showcase__grid">
                    {industries.map((industry) => (
                        <IndustryCard industry={industry} key={industry.title} />
                    ))}
                </div>
            </div>
            <div className="industries-showcase__clients">
                <TextBlock className="industries-showcase__clients-label container">
                    Companies we run programs for
                </TextBlock>
                <Marquee className="industries-showcase__logo-viewport" duration="28s">
                    <LogoSet />
                </Marquee>
            </div>
        </section>
    );
}

export default IndustriesShowcase;
