import ArrowLink from "../../common/ArrowLink/ArrowLink";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./FeaturedInsight.css";

function FeaturedInsight({ insight }) {
    return (
        <section className="featured-insight">
            <div className="featured-insight__card container">
                <div className="featured-insight__media" />
                <div className="featured-insight__body">
                    <div className="featured-insight__content">
                        <span className="featured-insight__label">{insight.label}</span>
                        <TextBlock className="featured-insight__meta">{insight.meta}</TextBlock>
                        <h2 className="featured-insight__title">{insight.title}</h2>
                        <TextBlock className="featured-insight__description">{insight.description}</TextBlock>
                    </div>
                    <ArrowLink to={insight.path}>Read the brief</ArrowLink>
                </div>
            </div>
        </section>
    );
}

export default FeaturedInsight;
