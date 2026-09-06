import TextTicker from "../../components/common/TextTicker/TextTicker";
import GuidesInsights from "../../components/home/GuidesInsights/GuidesInsights";
import Hero from "../../components/home/Hero/Hero";
import IndustriesShowcase from "../../components/home/IndustriesShowcase/IndustriesShowcase";
import ServicesOverview from "../../components/home/ServicesOverview/ServicesOverview";
import WhyCorvell from "../../components/home/WhyCorvell/WhyCorvell";
import { firmMetrics } from "../../content/firm";

function HomePage() {
    return (
        <main id="main-content">
            <Hero />
            <TextTicker className="firm-metrics" items={firmMetrics} duration="90s" cycles={3} />
            <ServicesOverview />
            <IndustriesShowcase />
            <WhyCorvell />
            <GuidesInsights />
        </main>
    );
}

export default HomePage;
