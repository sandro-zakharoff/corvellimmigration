import RichText from "../../common/RichText/RichText";
import ArrowLink from "../../common/ArrowLink/ArrowLink";
import PersonPreviewCard from "../../cards/PersonPreviewCard/PersonPreviewCard";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import "./PeoplePreview.css";

function PeoplePreview({ content }) {
    return (
        <section className="people-preview">
            <div className="people-preview__inner container">
                <div className="people-preview__overview">
                    <div className="people-preview__content">
                        <SectionIntro
                            eyebrow={content.eyebrow}
                            title={content.title}
                        />
                        <div className="people-preview__paragraphs">
                            {content.paragraphs.map((paragraph, index) => (
                                <p key={index}><RichText value={paragraph} /></p>
                            ))}
                        </div>
                        <div className="people-preview__link">
                            <ArrowLink to={content.link.path}><RichText value={content.link.label} links={false} /></ArrowLink>
                        </div>
                    </div>
                    <div className="people-preview__media">
                        <img className="people-preview__image" src={content.image} alt={content.imageAlt} loading="lazy" />
                    </div>
                </div>
                <div className="people-preview__grid">
                    {content.members.map((person, index) => (
                        <PersonPreviewCard person={person} key={person.slug} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default PeoplePreview;
