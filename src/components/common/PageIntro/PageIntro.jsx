import SectionIntro from "../SectionIntro/SectionIntro";
import "./PageIntro.css";

function PageIntro({
    eyebrow,
    title,
    titleParts,
    titleHighlight,
    description,
    descriptionParts,
    variant,
    className = ""
}) {
    return (
        <section
            className={[
                "page-intro",
                variant ? `page-intro--${variant}` : "",
                className
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className="page-intro__inner container">
                <SectionIntro
                    className="page-intro__heading"
                    eyebrow={eyebrow}
                    title={title}
                    titleParts={titleParts}
                    titleHighlight={titleHighlight}
                    description={description}
                    descriptionParts={descriptionParts}
                    headingLevel={1}
                />
            </div>
        </section>
    );
}

export default PageIntro;
