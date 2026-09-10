import RichText from "../../common/RichText/RichText";
import ArrowLink from "../../common/ArrowLink/ArrowLink";
import DetailList from "../../common/DetailList/DetailList";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import "./ServicesOverview.css";

function ServicesOverview({ content }) {
    return (
        <section className="services-overview">
            <div className="container">
                <SectionIntro
                    className="services-overview__intro"
                    eyebrow={content.eyebrow}
                    title={content.title}
                />
                <DetailList
                    className="services-overview__list"
                    items={content.items}
                    interactive
                    relaxed
                />
                <div className="services-overview__footer">
                    <ArrowLink to={content.link.path}><RichText value={content.link.label} links={false} /></ArrowLink>
                </div>
            </div>
        </section>
    );
}

export default ServicesOverview;
