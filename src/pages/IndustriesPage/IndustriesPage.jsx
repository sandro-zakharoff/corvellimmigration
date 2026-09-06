import ActionBanner from "../../components/common/ActionBanner/ActionBanner";
import TextTicker from "../../components/common/TextTicker/TextTicker";
import IndustriesHero from "../../components/industries/IndustriesHero/IndustriesHero";
import IndustryContext from "../../components/industries/IndustryContext/IndustryContext";
import IndustryDirectory from "../../components/industries/IndustryDirectory/IndustryDirectory";
import IndustryMethod from "../../components/industries/IndustryMethod/IndustryMethod";
import { industries, industriesPageContent, industryTickerItems } from "../../content/industries";

function IndustriesPage() {
    return (
        <main id="main-content">
            <IndustriesHero content={industriesPageContent.hero} />
            <TextTicker items={industryTickerItems} duration="72s" bordered />
            <IndustryContext content={industriesPageContent.context} />
            <IndustryDirectory content={industriesPageContent.directory} industries={industries} />
            <IndustryMethod content={industriesPageContent.method} />
            <ActionBanner content={industriesPageContent.cta} expanded />
        </main>
    );
}

export default IndustriesPage;
