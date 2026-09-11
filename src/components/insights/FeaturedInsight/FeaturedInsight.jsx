import RichText from "../../common/RichText/RichText";
import ArrowLink from "../../common/ArrowLink/ArrowLink";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./FeaturedInsight.css";

function FeaturedInsight({ insight }) {
    return (
        <section className="featured-insight">
            <div className="featured-insight__card container">
                <div className="featured-insight__media">
                    {insight.image && <img src={insight.image} alt={insight.imageAlt ?? ""} />}
                </div>
                <div className="featured-insight__body">
                    <div className="featured-insight__content">
                        <span className="featured-insight__label"><RichText value={insight.label} /></span>
                        <TextBlock className="featured-insight__meta"><RichText value={insight.meta} /></TextBlock>
                        <h2 className="featured-insight__title"><RichText value={insight.title} /></h2>
                        <TextBlock className="featured-insight__description"><RichText value={insight.description} /></TextBlock>
                    </div>
                    <ArrowLink to={insight.path}>Read the brief</ArrowLink>
                </div>
            </div>
        </section>
    );
}

export default FeaturedInsight;
