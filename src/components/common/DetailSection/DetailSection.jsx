import DetailList from "../DetailList/DetailList";
import RichText from "../RichText/RichText";
import SectionIntro from "../SectionIntro/SectionIntro";
import "./DetailSection.css";

function DetailSection({ content }) {
    const className = [
        "detail-section",
        content.surface ? "detail-section--surface" : "",
        content.prominent ? "detail-section--prominent" : ""
    ].filter(Boolean).join(" ");

    return (
        <section className={className}>
            <div className="container">
                <SectionIntro
                    className="detail-section__intro"
                    eyebrow={content.eyebrow}
                    title={content.title}
                    description={content.description}
                    numbered
                />
                {content.groups.map((group, index) => (
                    <div className="detail-section__group" key={group.id || index}>
                        {group.title && (
                            <div className="detail-section__group-heading">
                                <h3 className="detail-section__group-title"><RichText value={group.title} /></h3>
                                {group.label && <span className="detail-section__group-label"><RichText value={group.label} /></span>}
                            </div>
                        )}
                        <DetailList items={group.items} metrics headingLevel={group.title ? 4 : 3} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default DetailSection;
