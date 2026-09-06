import ArrowLink from "../../common/ArrowLink/ArrowLink";
import DetailList from "../../common/DetailList/DetailList";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import { serviceHighlights } from "../../../content/services";
import "./ServicesOverview.css";

function ServicesOverview() {
    return (
        <section className="services-overview">
            <div className="container">
                <SectionIntro
                    className="services-overview__intro"
                    eyebrow="What we do"
                    title="Employment immigration, organized around your business needs."
                />
                <DetailList
                    className="services-overview__list"
                    items={serviceHighlights}
                    interactive
                    relaxed
                />
                <div className="services-overview__footer">
                    <ArrowLink to="/services">Explore all services</ArrowLink>
                </div>
            </div>
        </section>
    );
}

export default ServicesOverview;
