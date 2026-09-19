import SectionIntro from "../SectionIntro/SectionIntro";
import "./ImageHero.css";

function ImageHero({ content }) {
    const className = [
        "image-hero",
        content.imagePosition === "right" ? "image-hero--image-right" : "",
        content.prominent ? "image-hero--prominent" : ""
    ].filter(Boolean).join(" ");

    return (
        <section className={className}>
            <div className="image-hero__inner container">
                <div className="image-hero__media">
                    <img
                        className="image-hero__image"
                        src={content.image}
                        alt={content.imageAlt ?? ""}
                        fetchPriority="high"
                    />
                </div>
                <SectionIntro
                    className="image-hero__intro"
                    eyebrow={content.eyebrow}
                    title={content.title}
                    titleParts={content.titleParts}
                    titleHighlight={content.titleHighlight}
                    description={content.description}
                    descriptionParts={content.descriptionParts}
                    headingLevel={1}
                />
            </div>
        </section>
    );
}

export default ImageHero;
