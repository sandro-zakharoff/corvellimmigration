import { useParams } from "react-router-dom";
import PageMetadata from "../../components/app/PageMetadata/PageMetadata";
import IndustryDetail from "../../components/industries/IndustryDetail/IndustryDetail";
import { getIndustryPage } from "../../content/industryPages";
import { getIndustryMetadata } from "../../content/metadata";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function IndustryDetailPage() {
    const { slug } = useParams();
    const industry = getIndustryPage(slug);

    if (!industry) {
        return <NotFoundPage />;
    }

    return (
        <main id="main-content">
            <PageMetadata {...getIndustryMetadata(industry)} />
            <IndustryDetail industry={industry} />
        </main>
    );
}

export default IndustryDetailPage;
