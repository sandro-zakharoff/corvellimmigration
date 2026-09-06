import CareerBenefits from "../../components/careers/CareerBenefits/CareerBenefits";
import CareersRoles from "../../components/careers/CareersRoles/CareersRoles";
import PageIntro from "../../components/common/PageIntro/PageIntro";
import { careersPageContent } from "../../content/careers";
import "./CareersPage.css";

function CareersPage() {
    return (
        <main className="careers-page" id="main-content">
            <PageIntro className="careers-page__intro" variant="compact" {...careersPageContent.intro} />
            <CareerBenefits benefits={careersPageContent.benefits} />
            <CareersRoles content={careersPageContent.roles} />
        </main>
    );
}

export default CareersPage;
