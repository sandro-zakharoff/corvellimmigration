import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BrandLogo from "../../common/BrandLogo/BrandLogo";
import { mainNavigation } from "../../../content/site";
import "./SiteHeader.css";

function SiteHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("keydown", closeOnEscape);
        document.body.classList.toggle("has-open-menu", isMenuOpen);

        return () => {
            document.removeEventListener("keydown", closeOnEscape);
            document.body.classList.remove("has-open-menu");
        };
    }, [isMenuOpen]);

    return (
        <header className="site-header">
            <div className="site-header__inner container">
                <BrandLogo />
                <button
                    className={`site-header__toggle${isMenuOpen ? " is-active" : ""}`}
                    type="button"
                    onClick={() => setIsMenuOpen((current) => !current)}
                >
                    <span className="site-header__toggle-line" />
                    <span className="site-header__toggle-line" />
                    <span className="site-header__toggle-line" />
                </button>
                <nav className={`site-header__nav${isMenuOpen ? " is-open" : ""}`}>
                    {mainNavigation.map((item) => {
                        const isActive = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);

                        return (
                            <Link
                                className={`site-header__link${isActive ? " is-active" : ""}`}
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}

export default SiteHeader;
