import RichText from "../../common/RichText/RichText";
import { Fragment } from "react";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./Hero.css";

function Hero({ content }) {
    return (
        <section className="hero">
            <div className="hero__inner container">
                <div className="hero__media">
                    <img
                        className="hero__image"
                        src={content.image}
                        alt={content.imageAlt}
                        fetchPriority="high"
                    />
                </div>
                <div className="hero__content">
                    <TextBlock className="hero__eyebrow"><RichText value={content.eyebrow} /></TextBlock>
                    <h1 className="hero__title">
                        {content.titleParts.map((part, index) => (
                            <Fragment key={index}>
                                {index > 0 && "\n"}
                                <span className={part.accent ? "hero__title-accent" : undefined}>
                                    <RichText value={part.text} />
                                </span>
                            </Fragment>
                        ))}
                    </h1>
                </div>
            </div>
        </section>
    );
}

export default Hero;
