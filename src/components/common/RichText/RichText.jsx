import { isValidElement } from "react";
import { Link } from "react-router-dom";
import "./RichText.css";

function RichText({ value, links = true }) {
    if (value === null || typeof value !== "object" || isValidElement(value)) {
        return value;
    }

    const parts = Array.isArray(value) ? value : [value];

    return parts.map((part, index) => {
        if (part === null || typeof part !== "object" || isValidElement(part)) {
            return part;
        }

        const className = [
            part.tone === "ink" ? "rich-text__ink" : "",
            part.tone === "muted" ? "rich-text__muted" : "",
            part.accent ? "rich-text__accent" : "",
            part.strong ? "rich-text__strong" : "",
            part.italic ? "rich-text__italic" : "",
            part.path && links ? "rich-text__link" : ""
        ]
            .filter(Boolean)
            .join(" ");

        if (part.path && links) {
            return <Link className={className} to={part.path} key={index}>{part.text}</Link>;
        }

        return className ? (
            <span className={className} key={index}>
                {part.text}
            </span>
        ) : (
            part.text
        );
    });
}

export default RichText;
