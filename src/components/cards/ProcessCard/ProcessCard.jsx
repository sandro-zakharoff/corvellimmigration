import FeatureCard from "../FeatureCard/FeatureCard";
import "./ProcessCard.css";

function ProcessCard({ step }) {
    return <FeatureCard className="process-card" item={{ ...step, label: step.code }} />;
}

export default ProcessCard;
