import { Link } from "react-router-dom";
import "./ButtonLink.css";

function ButtonLink({ children, to, tone = "dark", className = "" }) {
    return (
        <Link
            className={["button-link", tone === "accent" ? "button-link--accent" : "", className]
                .filter(Boolean)
                .join(" ")}
            to={to}
        >
            {children}
        </Link>
    );
}

export default ButtonLink;
