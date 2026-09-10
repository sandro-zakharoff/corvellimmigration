import FeatureCard from "../../cards/FeatureCard/FeatureCard";
import "./CareerBenefits.css";

function CareerBenefits({ benefits }) {
    return (
        <section className="career-benefits">
            <div className="career-benefits__grid container">
                {benefits.map((benefit, index) => (
                    <FeatureCard className="career-benefit-card" item={benefit} key={benefit.id || index} />
                ))}
            </div>
        </section>
    );
}

export default CareerBenefits;
