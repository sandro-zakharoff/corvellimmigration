import "./RichText.css";

function RichText({ value }) {
    if (!Array.isArray(value)) {
        return value;
    }

    return value.map((part, index) => {
        const className = [
            part.accent ? "rich-text__accent" : "",
            part.strong ? "rich-text__strong" : ""
        ]
            .filter(Boolean)
            .join(" ");

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
