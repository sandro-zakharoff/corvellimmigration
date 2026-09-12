import TextBlock from "../../common/TextBlock/TextBlock";
import RichText from "../../common/RichText/RichText";
import "./CareerRoleCard.css";

function CareerRoleList({ items }) {
    return (
        <ul className="career-role-card__list">
            {items.map((item, index) => (
                <li className="career-role-card__list-item" key={index}>
                    <span><RichText value={item} /></span>
                </li>
            ))}
        </ul>
    );
}

function CareerRoleCard({ role, postedLabel, postedDate }) {
    return (
        <article className="career-role-card">
            <header className="career-role-card__header">
                <div className="career-role-card__summary">
                    <h3 className="career-role-card__title"><RichText value={role.title} /></h3>
                    <div className="career-role-card__details">
                        {role.details.map((detail, index) => (
                            <span className="career-role-card__detail" key={index}>
                                <RichText value={detail} />
                            </span>
                        ))}
                    </div>
                </div>
                <span className="career-role-card__posted"><RichText value={postedLabel} /> · {postedDate}</span>
            </header>
            <div className="career-role-card__body">
                <section className="career-role-card__section">
                    <h4 className="career-role-card__section-title"><RichText value={role.overview.title} /></h4>
                    <TextBlock className="career-role-card__overview"><RichText value={role.overview.description} /></TextBlock>
                </section>
                <section className="career-role-card__section">
                    <h4 className="career-role-card__section-title"><RichText value={role.responsibilities.title} /></h4>
                    <CareerRoleList items={role.responsibilities.items} />
                </section>
                <section className="career-role-card__section">
                    <h4 className="career-role-card__section-title"><RichText value={role.requirements.title} /></h4>
                    <CareerRoleList items={role.requirements.items} />
                </section>
                <section className="career-role-card__section">
                    <h4 className="career-role-card__section-title"><RichText value={role.offer.title} /></h4>
                    <CareerRoleList items={role.offer.items} />
                </section>
                <TextBlock className="career-role-card__application">
                    <RichText value={role.application.prefix} />
                    <a href={`mailto:${role.application.email}`}>{role.application.email}</a>.
                </TextBlock>
            </div>
        </article>
    );
}

export default CareerRoleCard;
