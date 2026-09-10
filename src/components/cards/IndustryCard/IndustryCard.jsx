import { Link } from "react-router-dom";
import TextBlock from "../../common/TextBlock/TextBlock";
import RichText from "../../common/RichText/RichText";
import "./IndustryCard.css";

function IndustryCard({ industry, variant = "showcase" }) {
    const isDirectory = variant === "directory";
    const isRelated = variant === "related";

    return (
        <article className={`industry-card industry-card--${variant}`}>
            <Link className="industry-card__link" to={industry.path}>
                {!isRelated && (
                    <div className="industry-card__media">
                        <img className="industry-card__image" src={industry.image} alt="" loading="lazy" />
                    </div>
                )}
                <div className="industry-card__body">
                    {isDirectory || isRelated ? (
                        <div className="industry-card__visa-list">
                            {industry.visaTypes.map((visa, index) => (
                                <span className="industry-card__visa" key={index}>
                                    <RichText value={visa} links={false} />
                                </span>
                            ))}
                        </div>
                    ) : (
                        <TextBlock className="industry-card__visas"><RichText value={industry.visas} links={false} /></TextBlock>
                    )}
                    <h3 className="industry-card__title"><RichText value={industry.title} links={false} /></h3>
                    <TextBlock className="industry-card__description">
                        <RichText value={isDirectory ? industry.directoryDescription : industry.description} links={false} />
                    </TextBlock>
                    {!isRelated && (
                        <div className="industry-card__roles">
                            <span className="industry-card__roles-label">Common roles</span>
                            <p><RichText value={industry.roles} links={false} /></p>
                        </div>
                    )}
                    {isDirectory && (
                        <div className="industry-card__typical">
                            <span className="industry-card__roles-label">Typical</span>
                            <p><RichText value={industry.typical} links={false} /></p>
                        </div>
                    )}
                    <span className="industry-card__action">
                        View industry →
                    </span>
                </div>
            </Link>
        </article>
    );
}

export default IndustryCard;
