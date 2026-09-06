import "./TextBlock.css";

function TextBlock({ children, className = "" }) {
    return <span className={["text-block", className].filter(Boolean).join(" ")}>{children}</span>;
}

export default TextBlock;
