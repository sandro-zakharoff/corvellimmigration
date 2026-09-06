import SectionIntro from "../../common/SectionIntro/SectionIntro";
import TextBlock from "../../common/TextBlock/TextBlock";
import { aboutContent } from "../../../content/about";
import "./FirmToday.css";

function FirmToday() {
    const { firmToday } = aboutContent;

    return (
        <section className="firm-today">
            <div className="firm-today__inner container">
                <div className="firm-today__intro">
                    <SectionIntro
                        className="firm-today__heading"
                        eyebrow={firmToday.eyebrow}
                        title={firmToday.title}
                        inverse
                    />
                    <TextBlock className="firm-today__description">{firmToday.description}</TextBlock>
                </div>
                <div className="firm-today__metrics">
                    {firmToday.metrics.map((metric) => (
                        <div className="firm-today__metric" key={metric.label}>
                            <span className="firm-today__metric-label">{metric.label}</span>
                            <span className="firm-today__metric-value">{metric.value}</span>
                        </div>
                    ))}
                </div>
                <ul className="firm-today__credentials">
                    {firmToday.credentials.map((credential) => (
                        <li className="firm-today__credential" key={credential}>
                            <span className="firm-today__credential-mark" />
                            <span>{credential}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default FirmToday;
