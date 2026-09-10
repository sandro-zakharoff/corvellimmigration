import RichText from "../../common/RichText/RichText";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./WhyCorvell.css";

function WhyCorvell({ content }) {
    return (
        <section className="why-corvell">
            <div className="container">
                <SectionIntro
                    className="why-corvell__intro"
                    eyebrow={content.eyebrow}
                    title={content.title}
                    inverse
                />
                <div className="why-corvell__grid">
                    {content.items.map((advantage, index) => (
                        <article className="why-corvell__item" key={advantage.id ?? index}>
                            <h3 className="why-corvell__title"><RichText value={advantage.title} /></h3>
                            <TextBlock className="why-corvell__description"><RichText value={advantage.description} /></TextBlock>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyCorvell;
