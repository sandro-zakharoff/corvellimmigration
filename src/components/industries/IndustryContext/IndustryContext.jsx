import SectionIntro from "../../common/SectionIntro/SectionIntro";
import TextBlock from "../../common/TextBlock/TextBlock";
import RichText from "../../common/RichText/RichText";
import "./IndustryContext.css";

function IndustryContext({ content }) {
    return (
        <section className="industry-context">
            <div className="industry-context__inner container">
                <div className="industry-context__content">
                    <SectionIntro
                        className="industry-context__intro"
                        eyebrow={content.eyebrow}
                        title={content.title}
                        description={content.paragraphs[0]}
                    />
                    {content.paragraphs.slice(1).map((paragraph, index) => (
                        <TextBlock className="industry-context__paragraph" key={index}><RichText value={paragraph} /></TextBlock>
                    ))}
                </div>
                <div className="industry-context__media">
                    <img className="industry-context__image" src={content.image} alt="" loading="lazy" />
                </div>
            </div>
        </section>
    );
}

export default IndustryContext;
