import ArrowLink from "../../common/ArrowLink/ArrowLink";
import PersonPreviewCard from "../../cards/PersonPreviewCard/PersonPreviewCard";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import { aboutContent } from "../../../content/about";
import { attorneys } from "../../../content/people";
import "./PeoplePreview.css";

function PeoplePreview() {
    const { people } = aboutContent;

    return (
        <section className="people-preview">
            <div className="people-preview__inner container">
                <div className="people-preview__overview">
                    <div className="people-preview__content">
                        <SectionIntro
                            eyebrow={people.eyebrow}
                            title={people.title}
                        />
                        <div className="people-preview__paragraphs">
                            {people.paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="people-preview__link">
                            <ArrowLink to="/team">Meet the team</ArrowLink>
                        </div>
                    </div>
                    <div className="people-preview__media">
                        <img className="people-preview__image" src={people.image} alt={people.imageAlt} loading="lazy" />
                    </div>
                </div>
                <div className="people-preview__grid">
                    {attorneys.map((person) => (
                        <PersonPreviewCard person={person} key={person.slug} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default PeoplePreview;
