import SectionIntro from "../../common/SectionIntro/SectionIntro";
import TextBlock from "../../common/TextBlock/TextBlock";
import { firmAdvantages } from "../../../content/firm";
import "./WhyCorvell.css";

function WhyCorvell() {
    return (
        <section className="why-corvell">
            <div className="container">
                <SectionIntro
                    className="why-corvell__intro"
                    eyebrow="Why Corvell"
                    title="A leaner firm, built on software, that gets approvals."
                    inverse
                />
                <div className="why-corvell__grid">
                    {firmAdvantages.map((advantage) => (
                        <article className="why-corvell__item" key={advantage.title}>
                            <h3 className="why-corvell__title">{advantage.title}</h3>
                            <TextBlock className="why-corvell__description">{advantage.description}</TextBlock>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyCorvell;
