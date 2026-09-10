import TextBlock from "../TextBlock/TextBlock";
import RichText from "../RichText/RichText";
import "./SectionIntro.css";

function SectionIntro({
    eyebrow,
    title,
    titleParts,
    titleHighlight,
    description,
    descriptionParts,
    headingLevel = 2,
    inverse = false,
    numbered = false,
    className = ""
}) {
    const Heading = `h${headingLevel}`;
    const [eyebrowNumber, ...eyebrowLabelParts] = numbered && typeof eyebrow === "string" ? eyebrow.split(" ") : [];
    const eyebrowLabel = eyebrowLabelParts.join(" ");

    return (
        <div
            className={[
                "section-intro",
                inverse ? "section-intro--inverse" : "",
                numbered ? "section-intro--numbered" : "",
                className
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {eyebrow && <TextBlock className="section-intro__eyebrow">
                {numbered && typeof eyebrow === "string" ? (
                    <>
                        <span className="section-intro__eyebrow-number">{eyebrowNumber}</span>
                        {eyebrowLabel && (
                            <>
                                {" "}
                                <span>{eyebrowLabel}</span>
                            </>
                        )}
                    </>
                ) : (
                    <RichText value={eyebrow} />
                )}
            </TextBlock>}
            <Heading className="section-intro__title">
                {titleParts
                    ? titleParts.map((part, index) =>
                          part.accent ? (
                              <span className="section-intro__title-accent" key={index}>
                                  <RichText value={part} />
                              </span>
                          ) : (
                              <RichText value={part} key={index} />
                          )
                      )
                    : <RichText value={title} />}
                {!titleParts && titleHighlight && (
                    <>
                        {" "}
                        <span className="section-intro__title-highlight"><RichText value={titleHighlight} /></span>
                    </>
                )}
            </Heading>
            {(description || descriptionParts) && (
                <TextBlock className="section-intro__description">
                    {descriptionParts
                        ? descriptionParts.map((part, index) =>
                              part.emphasis ? (
                                  <span className="section-intro__description-emphasis" key={index}>
                                      <RichText value={part} />
                                  </span>
                              ) : (
                                  <RichText value={part} key={index} />
                              )
                          )
                        : <RichText value={description} />}
                </TextBlock>
            )}
        </div>
    );
}

export default SectionIntro;
