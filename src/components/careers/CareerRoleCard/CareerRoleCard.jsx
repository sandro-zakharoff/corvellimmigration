import TextBlock from "../../common/TextBlock/TextBlock";
import "./CareerRoleCard.css";

function CareerRoleList({ items }) {
    return (
        <ul className="career-role-card__list">
            {items.map((item) => (
                <li className="career-role-card__list-item" key={item}>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function CareerRoleCard({ role }) {
    return (
        <article className="career-role-card">
            <header className="career-role-card__header">
                <div className="career-role-card__summary">
                    <h3 className="career-role-card__title">{role.title}</h3>
                    <div className="career-role-card__details">
                        {role.details.map((detail) => (
                            <span className="career-role-card__detail" key={detail}>
                                {detail}
                            </span>
                        ))}
                    </div>
                </div>
                <span className="career-role-card__posted">{role.posted}</span>
            </header>
            <div className="career-role-card__body">
                <section className="career-role-card__section">
                    <h4 className="career-role-card__section-title">{role.overview.title}</h4>
                    <TextBlock className="career-role-card__overview">{role.overview.description}</TextBlock>
                </section>
                <section className="career-role-card__section">
                    <h4 className="career-role-card__section-title">{role.responsibilities.title}</h4>
                    <CareerRoleList items={role.responsibilities.items} />
                </section>
                <section className="career-role-card__section">
                    <h4 className="career-role-card__section-title">{role.requirements.title}</h4>
                    <CareerRoleList items={role.requirements.items} />
                </section>
                <section className="career-role-card__section">
                    <h4 className="career-role-card__section-title">{role.offer.title}</h4>
                    <CareerRoleList items={role.offer.items} />
                </section>
                <TextBlock className="career-role-card__application">
                    {role.application.prefix}
                    <a href={`mailto:${role.application.email}`}>{role.application.email}</a>.
                </TextBlock>
            </div>
        </article>
    );
}

export default CareerRoleCard;
