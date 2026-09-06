import ArrowLink from "../ArrowLink/ArrowLink";
import "./LinkListCta.css";

function LinkListCta({ content, flushTop = false, compactTitle = false, wideLinks = false }) {
    return (
        <section
            className={[
                "link-list-cta",
                flushTop ? "link-list-cta--flush-top" : "",
                compactTitle ? "link-list-cta--compact-title" : "",
                wideLinks ? "link-list-cta--wide-links" : ""
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className="link-list-cta__inner container">
                <h2 className="link-list-cta__title">{content.title}</h2>
                <div className="link-list-cta__links">
                    {content.links.map((link) => (
                        <ArrowLink to={link.path} showArrow={false} key={link.path}>
                            {link.label}
                        </ArrowLink>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default LinkListCta;
