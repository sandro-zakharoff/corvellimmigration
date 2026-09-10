import { Link } from "react-router-dom";
import Breadcrumbs from "../../common/Breadcrumbs/Breadcrumbs";
import RichText from "../../common/RichText/RichText";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./IndustryDetail.css";

function IndustryTags({ items, inverse = false }) {
    return (
        <div className={`industry-detail__tags${inverse ? " industry-detail__tags--inverse" : ""}`}>
            {items.map((item) => (
                <span className="industry-detail__tag" key={item}>
                    {item}
                </span>
            ))}
        </div>
    );
}

function IndustryIntro({ content, inverse = false }) {
    return (
        <div className={`industry-detail__intro${inverse ? " industry-detail__intro--inverse" : ""}`}>
            <TextBlock className="industry-detail__eyebrow">{content.eyebrow}</TextBlock>
            <h2 className="industry-detail__section-title">
                <RichText value={content.title} />
            </h2>
            {content.description && (
                <TextBlock className="industry-detail__section-description">{content.description}</TextBlock>
            )}
        </div>
    );
}

function IndustryDetail({ industry }) {
    return (
        <>
            <Breadcrumbs parent={{ label: "Industries", path: "/industries" }} current={industry.breadcrumb} />
            <section className="industry-detail__hero">
                <div className="industry-detail__hero-inner container">
                    <div className="industry-detail__hero-media">
                        <img src={industry.hero.image} alt={industry.hero.imageAlt} />
                    </div>
                    <div className="industry-detail__hero-content">
                        <IndustryTags items={industry.hero.tags} />
                        <h1 className="industry-detail__hero-title">
                            <RichText value={industry.hero.title} />
                        </h1>
                        <TextBlock className="industry-detail__hero-description">
                            {industry.hero.description}
                        </TextBlock>
                    </div>
                </div>
            </section>

            <section className="industry-detail__routes">
                <div className="container">
                    <IndustryIntro content={industry.routes} />
                    <div className="industry-detail__route-list">
                        {industry.routes.items.map((route) => (
                            <article className="industry-detail__route" key={route.code}>
                                <div className="industry-detail__route-label">
                                    <span className="industry-detail__route-code">{route.code}</span>
                                    <span className="industry-detail__route-tag">{route.tag}</span>
                                </div>
                                <div className="industry-detail__route-content">
                                    <h3 className="industry-detail__route-title">{route.title}</h3>
                                    <TextBlock className="industry-detail__route-description">
                                        {route.description}
                                    </TextBlock>
                                    <TextBlock className="industry-detail__route-roles">{route.roles}</TextBlock>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="industry-detail__roles">
                <div className="container">
                    <IndustryIntro content={industry.roles} />
                    <div className="industry-detail__role-grid">
                        {industry.roles.groups.map((group) => (
                            <article className="industry-detail__role-card" key={group.title}>
                                <div className="industry-detail__role-header">
                                    <h3 className="industry-detail__role-title">{group.title}</h3>
                                    <span className="industry-detail__role-route">{group.code}</span>
                                </div>
                                <div className="industry-detail__occupation-list">
                                    {group.items.map((item) => (
                                        <div className="industry-detail__occupation" key={item.code}>
                                            <span className="industry-detail__occupation-title">{item.title}</span>
                                            <span className="industry-detail__occupation-code">{item.code}</span>
                                        </div>
                                    ))}
                                </div>
                                <TextBlock className="industry-detail__role-note">{group.note}</TextBlock>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="industry-detail__process">
                <div className="container">
                    <IndustryIntro content={industry.process} inverse />
                    <div className="industry-detail__tracks">
                        {industry.process.tracks.map((track) => (
                            <div className="industry-detail__track" key={track.code}>
                                <div className="industry-detail__track-header">
                                    <span className="industry-detail__track-code">{track.code}</span>
                                    <h3 className="industry-detail__track-title">{track.title}</h3>
                                </div>
                                <div className="industry-detail__step-grid">
                                    {track.steps.map((step) => (
                                        <article className="industry-detail__step" key={step.code}>
                                            <span className="industry-detail__step-code">{step.code}</span>
                                            <h4 className="industry-detail__step-title">{step.title}</h4>
                                            <TextBlock className="industry-detail__step-description">
                                                {step.description}
                                            </TextBlock>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <TextBlock className="industry-detail__process-note">{industry.process.note}</TextBlock>
                </div>
            </section>

            <section className="industry-detail__execution">
                <div className="container">
                    <IndustryIntro content={industry.execution} />
                    <div className="industry-detail__execution-grid">
                        {industry.execution.items.map((item) => (
                            <article className="industry-detail__execution-card" key={item.title}>
                                <h3 className="industry-detail__execution-title">{item.title}</h3>
                                <TextBlock className="industry-detail__execution-description">
                                    {item.description}
                                </TextBlock>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="industry-detail__testimonial">
                <div className="container">
                    <IndustryIntro content={industry.testimonial} inverse />
                    <article className="industry-detail__quote-card">
                        <span className="industry-detail__quote-mark">“</span>
                        <TextBlock className="industry-detail__quote">{industry.testimonial.quote}</TextBlock>
                        <div className="industry-detail__quote-author">
                            <img src={industry.testimonial.image} alt={industry.testimonial.author} />
                            <div>
                                <span className="industry-detail__quote-name">{industry.testimonial.author}</span>
                                <TextBlock className="industry-detail__quote-role">
                                    {industry.testimonial.role}
                                </TextBlock>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <section className="industry-detail__benefits">
                <div className="container">
                    <IndustryIntro content={industry.benefits} />
                    <div className="industry-detail__benefit-grid">
                        {industry.benefits.items.map((item) => (
                            <article className="industry-detail__benefit" key={item.title}>
                                <h3 className="industry-detail__benefit-title">{item.title}</h3>
                                <TextBlock className="industry-detail__benefit-description">
                                    {item.description}
                                </TextBlock>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="industry-detail__cost">
                <div className="industry-detail__cost-inner container">
                    <div className="industry-detail__cost-copy">
                        <TextBlock className="industry-detail__eyebrow">{industry.cost.eyebrow}</TextBlock>
                        <h2 className="industry-detail__cost-title">
                            <RichText value={industry.cost.title} />
                        </h2>
                        <TextBlock className="industry-detail__cost-description">
                            {industry.cost.description}
                        </TextBlock>
                    </div>
                    <div className="industry-detail__cost-details">
                        <div className="industry-detail__cost-points">
                            {industry.cost.points.map((point) => (
                                <TextBlock className="industry-detail__cost-point" key={point}>
                                    {point}
                                </TextBlock>
                            ))}
                        </div>
                        <Link className="industry-detail__cost-link" to={industry.cost.link.path}>
                            {industry.cost.link.label} <span>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="industry-detail__related">
                <div className="container">
                    <IndustryIntro content={industry.related} />
                    <div className="industry-detail__related-grid">
                        {industry.related.items.map((item) => (
                            <Link className="industry-detail__related-card" to={item.path} key={item.title}>
                                <IndustryTags items={item.tags} />
                                <h3 className="industry-detail__related-title">{item.title}</h3>
                                <TextBlock className="industry-detail__related-description">
                                    {item.description}
                                </TextBlock>
                                <span className="industry-detail__related-action">View industry →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default IndustryDetail;
