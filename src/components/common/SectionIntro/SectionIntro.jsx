import TextBlock from "../TextBlock/TextBlock";
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
    const [eyebrowNumber, ...eyebrowLabelParts] = numbered ? eyebrow.split(" ") : [];
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
            <TextBlock className="section-intro__eyebrow">
                {numbered ? (
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
                    eyebrow
                )}
            </TextBlock>
            <Heading className="section-intro__title">
                {titleParts
                    ? titleParts.map((part, index) =>
                          part.accent ? (
                              <span className="section-intro__title-accent" key={index}>
                                  {part.text}
                              </span>
                          ) : (
                              part.text
                          )
                      )
                    : title}
                {!titleParts && titleHighlight && (
                    <>
                        {" "}
                        <span className="section-intro__title-highlight">{titleHighlight}</span>
                    </>
                )}
            </Heading>
            {(description || descriptionParts) && (
                <TextBlock className="section-intro__description">
                    {descriptionParts
                        ? descriptionParts.map((part, index) =>
                              part.emphasis ? (
                                  <span className="section-intro__description-emphasis" key={index}>
                                      {part.text}
                                  </span>
                              ) : (
                                  part.text
                              )
                          )
                        : description}
                </TextBlock>
            )}
        </div>
    );
}

export default SectionIntro;
