import ServiceCard from "../../cards/ServiceCard/ServiceCard";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import ServiceNote from "../ServiceNote/ServiceNote";
import "./ServiceCategorySection.css";

function ServiceCategorySection({ content, image = false, surface = false }) {
    return (
        <section className={`service-category${surface ? " service-category--surface" : ""}`}>
            <div className="service-category__inner container">
                <div className="service-category__header">
                    <SectionIntro
                        className="service-category__intro"
                        eyebrow={content.eyebrow}
                        title={content.title}
                        description={content.description}
                        numbered
                    />
                    {image && (
                        <div className="service-category__media">
                            <img className="service-category__image" src={content.image} alt="" loading="lazy" />
                        </div>
                    )}
                </div>
                <div className="service-category__grid">
                    {content.cards.map((service) => (
                        <ServiceCard service={service} key={service.code} />
                    ))}
                </div>
                {content.note && <ServiceNote>{content.note}</ServiceNote>}
            </div>
        </section>
    );
}

export default ServiceCategorySection;
