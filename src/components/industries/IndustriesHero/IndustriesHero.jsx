import SectionIntro from "../../common/SectionIntro/SectionIntro";
import "./IndustriesHero.css";

function IndustriesHero({ content }) {
    return (
        <section className="industries-hero">
            <div className="industries-hero__inner container">
                <div className="industries-hero__media">
                    <img className="industries-hero__image" src={content.image} alt="" />
                </div>
                <SectionIntro
                    className="industries-hero__intro"
                    eyebrow={content.eyebrow}
                    titleParts={content.titleParts}
                    description={content.description}
                    headingLevel={1}
                />
            </div>
        </section>
    );
}

export default IndustriesHero;
