import FeatureCard from "../FeatureCard/FeatureCard";
import "./ProcessCard.css";

function ProcessCard({ step, headingLevel = 3, className = "" }) {
    return (
        <FeatureCard
            className={["process-card", className].filter(Boolean).join(" ")}
            item={{ ...step, label: step.code }}
            headingLevel={headingLevel}
        />
    );
}

export default ProcessCard;
