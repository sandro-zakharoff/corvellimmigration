import { Link } from "react-router-dom";
import "./BrandLogo.css";

function BrandLogo({ inverse = false }) {
    return (
        <Link className={`brand-logo${inverse ? " brand-logo--inverse" : ""}`} to="/">
            <span className="brand-logo__name">
                Corvell<span className="brand-logo__mark">.</span>
            </span>
            <span className="brand-logo__descriptor">Immigration</span>
        </Link>
    );
}

export default BrandLogo;
