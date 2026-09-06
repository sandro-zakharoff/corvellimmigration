import FeatureCard from "../../cards/FeatureCard/FeatureCard";
import "./CareerBenefits.css";

function CareerBenefits({ benefits }) {
    return (
        <section className="career-benefits">
            <div className="career-benefits__grid container">
                {benefits.map((benefit) => (
                    <FeatureCard className="career-benefit-card" item={benefit} key={benefit.title} />
                ))}
            </div>
        </section>
    );
}

export default CareerBenefits;
