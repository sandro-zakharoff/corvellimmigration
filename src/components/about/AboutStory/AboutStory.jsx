import RichText from "../../common/RichText/RichText";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import "./AboutStory.css";

function AboutStory({ content }) {
    return (
        <section className="about-story">
            <div className="about-story__inner container">
                <div className="about-story__media">
                    <img className="about-story__image" src={content.image} alt={content.imageAlt} fetchPriority="high" />
                </div>
                <div className="about-story__content">
                    <SectionIntro eyebrow={content.eyebrow} title={content.title} headingLevel={1} />
                    <div className="about-story__paragraphs">
                        {content.paragraphs.map((paragraph, index) => (
                            <p key={index}><RichText value={paragraph} /></p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutStory;
