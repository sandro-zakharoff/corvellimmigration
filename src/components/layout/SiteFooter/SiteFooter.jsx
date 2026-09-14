import { Link } from "react-router-dom";
import BrandLogo from "../../common/BrandLogo/BrandLogo";
import TextBlock from "../../common/TextBlock/TextBlock";
import { contactDetails, footerNavigation } from "../../../content/site";
import "./SiteFooter.css";

function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner container">
                <div className="site-footer__main">
                    <div className="site-footer__profile">
                        <BrandLogo inverse />
                        <TextBlock className="site-footer__summary">
                            Employment-based immigration for companies and the people they hire.
                        </TextBlock>
                        <div className="site-footer__address">
                            {contactDetails.address.map((line) => (
                                <span key={line}>{line}</span>
                            ))}
                            <a href={`tel:${contactDetails.phoneHref}`}>{contactDetails.phone}</a>
                            <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
                        </div>
                    </div>
                    <nav className="site-footer__navigation">
                        {footerNavigation.map((group) => (
                            <div className="site-footer__group" key={group.title}>
                                <h2 className="site-footer__group-title">{group.title}</h2>
                                <ul className="site-footer__links">
                                    {group.links.map((link) => (
                                        <li key={`${link.path}-${link.label}`}>
                                            <Link className="site-footer__link" to={link.path}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
                <div className="site-footer__legal">
                    <div className="site-footer__legal-row">
                        <p>© 2026 Corvell Immigration. All rights reserved.</p>
                        <div className="site-footer__legal-links">
                            <Link to="/privacy">Privacy</Link>
                            <Link to="/terms">Terms</Link>
                        </div>
                    </div>
                    <TextBlock className="site-footer__disclaimer">
                        Attorney advertising. This website is for general information only and is not legal advice;
                        viewing it does not create an attorney–client relationship. Prior results do not guarantee a
                        similar outcome.
                    </TextBlock>
                </div>
            </div>
        </footer>
    );
}

export default SiteFooter;
