import { Link } from "react-router-dom";
import "./ArrowLink.css";

function ArrowLink({ children, to, direction = "right", inverse = false, download = false, showArrow = true }) {
    const className = [
        "arrow-link",
        inverse ? "arrow-link--inverse" : "",
        direction === "down" ? "arrow-link--down" : ""
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Link className={className} to={to} download={download || undefined}>
            <span className="arrow-link__label">{children}</span>
            {showArrow && (
                <span className="arrow-link__arrow">
                    {`\u00a0${direction === "down" ? "↓" : "→"}`}
                </span>
            )}
        </Link>
    );
}

export default ArrowLink;
