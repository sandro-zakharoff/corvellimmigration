import FeatureCard from "../../cards/FeatureCard/FeatureCard";
import IndustryCard from "../../cards/IndustryCard/IndustryCard";
import ProcessCard from "../../cards/ProcessCard/ProcessCard";
import ButtonLink from "../../common/ButtonLink/ButtonLink";
import RichText from "../../common/RichText/RichText";
import SectionIntro from "../../common/SectionIntro/SectionIntro";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./IndustryDetail.css";

function IndustryTags({ items }) {
    if (!items?.length) return null;

    return (
        <div className="industry-detail__tags">
            {items.map((item, index) => (
                <span className="industry-detail__tag" key={index}>
                    <RichText value={item} />
                </span>
            ))}
        </div>
    );
}

export function IndustryHero({ content }) {
    return (
        <section className="industry-detail__hero">
            <div className="industry-detail__hero-inner container">
                <div className="industry-detail__hero-media">
                    <img src={content.image} alt={content.imageAlt} />
                </div>
                <div className="industry-detail__hero-content">
                    <IndustryTags items={content.tags} />
                    <h1 className="industry-detail__hero-title">
                        <RichText value={content.title} />
                    </h1>
                    {content.description && (
                        <TextBlock className="industry-detail__hero-description">
                            <RichText value={content.description} />
                        </TextBlock>
                    )}
                </div>
            </div>
        </section>
    );
}

export function IndustryRoutes({ content }) {
    return (
        <section className="industry-detail__routes">
            <div className="container">
                <SectionIntro
                    className="industry-detail__intro"
                    {...content}
                />
                <div className="industry-detail__route-list">
                    {content.items.map((route, index) => (
                        <article className="industry-detail__route" key={route.id ?? index}>
                            <div className="industry-detail__route-label">
                                <span className="industry-detail__route-code">
                                    <RichText value={route.code} />
                                </span>
                                {route.tag && (
                                    <span className="industry-detail__route-tag">
                                        <RichText value={route.tag} />
                                    </span>
                                )}
                            </div>
                            <div className="industry-detail__route-content">
                                <h3 className="industry-detail__route-title">
                                    <RichText value={route.title} />
                                </h3>
                                {route.description && (
                                    <TextBlock className="industry-detail__route-description">
                                        <RichText value={route.description} />
                                    </TextBlock>
                                )}
                                {route.roles && (
                                    <TextBlock className="industry-detail__route-roles">
                                        <RichText value={route.roles} />
                                    </TextBlock>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function IndustryRoles({ content }) {
    return (
        <section className="industry-detail__roles">
            <div className="container">
                <SectionIntro
                    className="industry-detail__intro"
                    {...content}
                />
                <div className="industry-detail__role-grid">
                    {content.groups.map((group, index) => (
                        <article className="industry-detail__role-card" key={group.id ?? index}>
                            <div className="industry-detail__role-header">
                                <h3 className="industry-detail__role-title">
                                    <RichText value={group.title} />
                                </h3>
                                {group.code && (
                                    <span className="industry-detail__role-route">
                                        <RichText value={group.code} />
                                    </span>
                                )}
                            </div>
                            <div className="industry-detail__occupation-list">
                                {group.items.map((item, index) => (
                                    <div className="industry-detail__occupation" key={item.id ?? index}>
                                        <span className="industry-detail__occupation-title">
                                            <RichText value={item.title} />
                                        </span>
                                        {item.code && (
                                            <span className="industry-detail__occupation-code">
                                                <RichText value={item.code} />
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {group.note && (
                                <TextBlock className="industry-detail__role-note">
                                    <RichText value={group.note} />
                                </TextBlock>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function IndustryProcess({ content }) {
    return (
        <section className="industry-detail__process">
            <div className="container">
                <SectionIntro
                    className="industry-detail__intro"
                    {...content}
                    inverse
                />
                <div className="industry-detail__tracks">
                    {content.tracks.map((track, index) => (
                        <div className="industry-detail__track" key={track.id ?? index}>
                            <div className="industry-detail__track-header">
                                {track.code && (
                                    <span className="industry-detail__track-code">
                                        <RichText value={track.code} />
                                    </span>
                                )}
                                <h3 className="industry-detail__track-title">
                                    <RichText value={track.title} />
                                </h3>
                            </div>
                            <div className="industry-detail__step-grid">
                                {track.steps.map((step, index) => (
                                    <ProcessCard
                                        step={step}
                                        headingLevel={4}
                                        key={step.id ?? index}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {content.note && (
                    <TextBlock className="industry-detail__process-note">
                        <RichText value={content.note} />
                    </TextBlock>
                )}
            </div>
        </section>
    );
}

export function IndustryExecution({ content }) {
    return (
        <section className="industry-detail__execution">
            <div className="container">
                <SectionIntro
                    className="industry-detail__intro"
                    {...content}
                />
                <div className="industry-detail__execution-grid">
                    {content.items.map((item, index) => (
                        <FeatureCard className="industry-detail__execution-card" item={item} key={item.id ?? index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export function IndustryTestimonial({ content }) {
    return (
        <section className="industry-detail__testimonial">
            <div className="container">
                <SectionIntro
                    className="industry-detail__intro"
                    {...content}
                    inverse
                />
                <article className="industry-detail__quote-card">
                    <span className="industry-detail__quote-mark">“</span>
                    <TextBlock className="industry-detail__quote">
                        <RichText value={content.quote} />
                    </TextBlock>
                    {(content.author || content.role || content.image) && (
                        <div className="industry-detail__quote-author">
                            {content.image && (
                                <img
                                    src={content.image}
                                    alt={content.imageAlt ?? (typeof content.author === "string" ? content.author : "")}
                                />
                            )}
                            <div>
                                {content.author && (
                                    <span className="industry-detail__quote-name">
                                        <RichText value={content.author} />
                                    </span>
                                )}
                                {content.role && (
                                    <TextBlock className="industry-detail__quote-role">
                                        <RichText value={content.role} />
                                    </TextBlock>
                                )}
                            </div>
                        </div>
                    )}
                </article>
            </div>
        </section>
    );
}

export function IndustryBenefits({ content }) {
    return (
        <section className="industry-detail__benefits">
            <div className="container">
                <SectionIntro
                    className="industry-detail__intro"
                    {...content}
                />
                <div className="industry-detail__benefit-grid">
                    {content.items.map((item, index) => (
                        <FeatureCard className="industry-detail__benefit" item={item} key={item.id ?? index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export function IndustryCost({ content }) {
    return (
        <section className="industry-detail__cost">
            <div className="industry-detail__cost-inner container">
                <SectionIntro
                    className="industry-detail__intro industry-detail__cost-copy"
                    {...content}
                    inverse
                />
                <div className="industry-detail__cost-details">
                    {content.points?.length > 0 && (
                        <div className="industry-detail__cost-points">
                            {content.points.map((point, index) => (
                                <TextBlock className="industry-detail__cost-point" key={index}>
                                    <RichText value={point} />
                                </TextBlock>
                            ))}
                        </div>
                    )}
                    {content.link && (
                        <ButtonLink className="industry-detail__cost-link" to={content.link.path} tone="accent">
                            <RichText value={content.link.label} />
                        </ButtonLink>
                    )}
                </div>
            </div>
        </section>
    );
}

export function IndustryRelated({ content }) {
    return (
        <section className="industry-detail__related">
            <div className="container">
                <SectionIntro
                    className="industry-detail__intro"
                    {...content}
                />
                <div className="industry-detail__related-grid">
                    {content.items.map((item, index) => (
                        <IndustryCard
                            industry={{ ...item, visaTypes: item.tags }}
                            variant="related"
                            key={item.id ?? index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
