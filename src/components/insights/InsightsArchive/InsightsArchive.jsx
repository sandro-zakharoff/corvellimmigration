import SectionIntro from "../../common/SectionIntro/SectionIntro";
import InsightArchiveItem from "../InsightArchiveItem/InsightArchiveItem";
import "./InsightsArchive.css";

function InsightsArchive({ content }) {
    return (
        <section className="insights-archive">
            <div className="insights-archive__inner container">
                <SectionIntro eyebrow={content.eyebrow} title={content.title} />
                <div className="insights-archive__list">
                    {content.items.map((item) => (
                        <InsightArchiveItem item={item} key={item.title} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default InsightsArchive;
