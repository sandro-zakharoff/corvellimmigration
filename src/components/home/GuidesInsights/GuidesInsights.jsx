import GuideCollection from "../../common/GuideCollection/GuideCollection";
import { guides } from "../../../content/insights";

function GuidesInsights() {
    return (
        <GuideCollection
            content={{
                eyebrow: "Guides & insights",
                title: "Plain-language guides to the visas we file."
            }}
            guides={guides}
            footerLink={{
                label: "Visit Insights — statistics & guides",
                path: "/insights",
                showArrow: false
            }}
        />
    );
}

export default GuidesInsights;
