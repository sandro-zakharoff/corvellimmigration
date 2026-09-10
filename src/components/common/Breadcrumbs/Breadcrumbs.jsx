import { Link } from "react-router-dom";
import "./Breadcrumbs.css";

function Breadcrumbs({ parent, current }) {
    return (
        <div className="breadcrumbs">
            <div className="breadcrumbs__inner container">
                <Link className="breadcrumbs__link" to={parent.path}>
                    {parent.label}
                </Link>
                <span className="breadcrumbs__separator">/</span>
                <span className="breadcrumbs__current">{current}</span>
            </div>
        </div>
    );
}

export default Breadcrumbs;
