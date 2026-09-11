import ArrowLink from "../ArrowLink/ArrowLink";
import ButtonLink from "../ButtonLink/ButtonLink";
import RichText from "../RichText/RichText";
import TextBlock from "../TextBlock/TextBlock";
import "./ContentBlocks.css";

export function ContentSection({ content, renderBlock }) {
    const groups = [];

    content.blocks.forEach((block, index) => {
        if (block.hidden) {
            return;
        }

        if (block.type === "timeline" || block.width === "wide") {
            groups.push({ wide: true, items: [{ block, index }] });
            return;
        }

        const previous = groups.at(-1);

        if (previous && !previous.wide) {
            previous.items.push({ block, index });
        } else {
            groups.push({ wide: false, items: [{ block, index }] });
        }
    });

    if (groups.length === 0) {
        return null;
    }

    return (
        <section className={`content-blocks${content.surface ? " content-blocks--surface" : ""}`}>
            <div className="content-blocks__body-inner container">
                {groups.map((group) =>
                    group.wide ? (
                        renderBlock(group.items[0].block, group.items[0].index)
                    ) : (
                        <div className="content-blocks__body-content" key={group.items[0].index}>
                            {group.items.map(({ block, index }) => renderBlock(block, index))}
                        </div>
                    )
                )}
            </div>
        </section>
    );
}

export function ContentGroup({ content, children }) {
    return (
        <section className="content-blocks__section">
            {content.number && (
                <TextBlock className="content-blocks__section-number">
                    <RichText value={content.number} />
                </TextBlock>
            )}
            {content.title && (
                <h2 className="content-blocks__section-title">
                    <RichText value={content.title} />
                </h2>
            )}
            <div className="content-blocks__section-content">{children}</div>
        </section>
    );
}

export function ContentParagraph({ content }) {
    const variant = ["lead", "closing"].includes(content.variant) ? content.variant : "paragraph";

    return (
        <TextBlock className={`content-blocks__${variant}`}>
            <RichText value={content.text} />
        </TextBlock>
    );
}

export function ContentImage({ content }) {
    return (
        <figure className="content-blocks__inline-media">
            <img src={content.src} alt={content.alt} />
            {content.caption && (
                <figcaption className="content-blocks__inline-caption">
                    <RichText value={content.caption} />
                </figcaption>
            )}
        </figure>
    );
}

export function ContentTable({ content }) {
    const columns = content.columnWidths
        ? content.columnWidths.map((width) => `minmax(0, ${width}fr)`).join(" ")
        : `repeat(${content.columns.length}, minmax(0, 1fr))`;
    const className = [
        "content-blocks__table",
        content.mono ? "content-blocks__table--mono" : "",
        content.bottomBorder ? "content-blocks__table--bottom-border" : ""
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <>
            <div className="content-blocks__table-wrap">
                {content.caption && (
                    <TextBlock className="content-blocks__table-caption">
                        <RichText value={content.caption} />
                    </TextBlock>
                )}
                <div className="content-blocks__table-scroll">
                    <div className={className}>
                        <div className="content-blocks__table-row content-blocks__table-row--header" style={{ gridTemplateColumns: columns }}>
                            {content.columns.map((column, index) => (
                                <span className="content-blocks__table-heading" key={index}>
                                    <RichText value={column} />
                                </span>
                            ))}
                        </div>
                        {content.rows.map((row, rowIndex) => (
                            <div className="content-blocks__table-row" key={rowIndex} style={{ gridTemplateColumns: columns }}>
                                {row.map((cell, cellIndex) => {
                                    const value = cell && typeof cell === "object" && !Array.isArray(cell)
                                        ? cell
                                        : { text: cell };
                                    const cellClassName = [
                                        "content-blocks__table-cell",
                                        ["ink", "muted", "warning"].includes(value.tone) ? `content-blocks__table-cell--${value.tone}` : "",
                                        value.accent ? "content-blocks__table-cell--accent" : "",
                                        value.emphasis ? "content-blocks__table-cell--emphasis" : ""
                                    ].filter(Boolean).join(" ");

                                    return (
                                        <span className={cellClassName} key={cellIndex}>
                                            <RichText value={value.text} />
                                        </span>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {content.note && <ContentParagraph content={{ text: content.note }} />}
        </>
    );
}

export function ContentAside({ content }) {
    return (
        <div className="content-blocks__aside">
            {content.title && (
                <h3 className="content-blocks__aside-title"><RichText value={content.title} /></h3>
            )}
            <TextBlock className="content-blocks__aside-text"><RichText value={content.text} /></TextBlock>
        </div>
    );
}

export function ContentCallout({ content }) {
    return (
        <TextBlock className="content-blocks__callout"><RichText value={content.text} /></TextBlock>
    );
}

export function ContentList({ content }) {
    return (
        <div className="content-blocks__list">
            {content.items.map((item, index) => (
                <div className="content-blocks__list-item" key={index}>
                    {item.title && <h3 className="content-blocks__list-title"><RichText value={item.title} /></h3>}
                    <TextBlock className="content-blocks__list-text"><RichText value={item.text} /></TextBlock>
                </div>
            ))}
        </div>
    );
}

export function ContentStats({ content }) {
    if (content.items.length === 0) {
        return null;
    }

    return (
        <div className="content-blocks__stats-wrap">
            <div className="content-blocks__stats" style={{ "--stats-columns": Math.min(content.items.length, 4) }}>
                {content.items.map((stat, index) => (
                    <div className="content-blocks__stat" key={index}>
                        <span className={`content-blocks__stat-value${stat.accent ? " content-blocks__stat-value--accent" : ""}`}>
                            <RichText value={stat.value} />
                        </span>
                        <span className="content-blocks__stat-label"><RichText value={stat.label} /></span>
                    </div>
                ))}
            </div>
            {content.note && <TextBlock className="content-blocks__stats-note"><RichText value={content.note} /></TextBlock>}
        </div>
    );
}

export function ContentNote({ content }) {
    return (
        <TextBlock className="content-blocks__source-note"><RichText value={content.text} /></TextBlock>
    );
}

export function ContentTimeline({ content }) {
    if (content.items.length === 0) {
        return null;
    }

    const columns = Math.min(content.items.length, 5);

    return (
        <div
            className="content-blocks__timeline"
            style={{ "--timeline-columns": columns, "--timeline-tablet-columns": Math.min(content.items.length, 2) }}
        >
            {content.items.map((item, index) => (
                <div
                    className={[
                        "content-blocks__timeline-item",
                        index % columns === 0 ? "content-blocks__timeline-item--row-start" : "",
                        index >= columns ? "content-blocks__timeline-item--next-row" : ""
                    ].filter(Boolean).join(" ")}
                    key={index}
                >
                    <span className="content-blocks__timeline-date"><RichText value={item.date} /></span>
                    <TextBlock className="content-blocks__timeline-text"><RichText value={item.text} /></TextBlock>
                </div>
            ))}
        </div>
    );
}

export function ContentHeading({ content }) {
    const level = [2, 3, 4, 5, 6].includes(content.level) ? content.level : 2;
    const Heading = `h${level}`;

    return (
        <Heading className={`content-blocks__heading content-blocks__heading--${level}`}>
            <RichText value={content.text} />
        </Heading>
    );
}

export function ContentLink({ content }) {
    const Link = content.appearance === "button" ? ButtonLink : ArrowLink;

    return (
        <div className="content-blocks__link">
            <Link to={content.path} tone={content.tone}><RichText value={content.label} links={false} /></Link>
        </div>
    );
}
