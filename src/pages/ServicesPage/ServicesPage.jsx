import ActionBanner from "../../components/common/ActionBanner/ActionBanner";
import PageIntro from "../../components/common/PageIntro/PageIntro";
import TextTicker from "../../components/common/TextTicker/TextTicker";
import ComplianceSection from "../../components/services/ComplianceSection/ComplianceSection";
import LaborCertificationSection from "../../components/services/LaborCertificationSection/LaborCertificationSection";
import ServiceCategorySection from "../../components/services/ServiceCategorySection/ServiceCategorySection";
import { serviceTickerItems, servicesPageContent } from "../../content/services";
import "./ServicesPage.css";

function ServicesPage() {
    return (
        <main id="main-content">
            <PageIntro className="services-page__intro" {...servicesPageContent.intro} />
            <TextTicker
                className="services-page__ticker"
                items={serviceTickerItems}
                duration="64s"
                bordered
            />
            <ServiceCategorySection content={servicesPageContent.nonImmigrant} image />
            <ServiceCategorySection content={servicesPageContent.permanent} surface />
            <LaborCertificationSection content={servicesPageContent.laborCertification} />
            <ComplianceSection content={servicesPageContent.compliance} />
            <ActionBanner content={servicesPageContent.cta} />
        </main>
    );
}

export default ServicesPage;
