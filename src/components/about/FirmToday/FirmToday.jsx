import RichText from "../../common/RichText/RichText";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./FirmToday.css";

function FirmToday({ content }) {
    return (
        <section className="firm-today">
            <div className="firm-today__inner container">
                <div className="firm-today__intro">
                    <SectionIntro
                        className="firm-today__heading"
                        eyebrow={content.eyebrow}
                        title={content.title}
                        inverse
                    />
                    <TextBlock className="firm-today__description"><RichText value={content.description} /></TextBlock>
                </div>
                <div className="firm-today__metrics">
                    {content.metrics.map((metric, index) => (
                        <div className="firm-today__metric" key={metric.id ?? index}>
                            <span className="firm-today__metric-label"><RichText value={metric.label} /></span>
                            <span className="firm-today__metric-value"><RichText value={metric.value} /></span>
                        </div>
                    ))}
                </div>
                <ul className="firm-today__credentials">
                    {content.credentials.map((credential, index) => (
                        <li className="firm-today__credential" key={index}>
                            <span className="firm-today__credential-mark" />
                            <span><RichText value={credential} /></span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default FirmToday;
