import SectionIntro from "../../common/SectionIntro/SectionIntro";
import { aboutContent } from "../../../content/about";
import "./AboutStory.css";

function AboutStory() {
    const { story } = aboutContent;

    return (
        <section className="about-story">
            <div className="about-story__inner container">
                <div className="about-story__media">
                    <img className="about-story__image" src={story.image} alt={story.imageAlt} fetchPriority="high" />
                </div>
                <div className="about-story__content">
                    <SectionIntro eyebrow={story.eyebrow} title={story.title} headingLevel={1} />
                    <div className="about-story__paragraphs">
                        {story.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutStory;
