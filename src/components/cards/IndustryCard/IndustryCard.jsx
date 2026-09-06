import { Link } from "react-router-dom";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./IndustryCard.css";

function IndustryCard({ industry, variant = "showcase" }) {
    const isDirectory = variant === "directory";

    return (
        <article className={`industry-card industry-card--${variant}`}>
            <Link className="industry-card__link" to={industry.path}>
                <div className="industry-card__media">
                    <img className="industry-card__image" src={industry.image} alt="" loading="lazy" />
                </div>
                <div className="industry-card__body">
                    {isDirectory ? (
                        <div className="industry-card__visa-list">
                            {industry.visaTypes.map((visa) => (
                                <span className="industry-card__visa" key={visa}>
                                    {visa}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <TextBlock className="industry-card__visas">{industry.visas}</TextBlock>
                    )}
                    <h3 className="industry-card__title">{industry.title}</h3>
                    <TextBlock className="industry-card__description">
                        {isDirectory ? industry.directoryDescription : industry.description}
                    </TextBlock>
                    <div className="industry-card__roles">
                        <span className="industry-card__roles-label">Common roles</span>
                        <p>{industry.roles}</p>
                    </div>
                    {isDirectory && (
                        <div className="industry-card__typical">
                            <span className="industry-card__roles-label">Typical</span>
                            <p>{industry.typical}</p>
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
