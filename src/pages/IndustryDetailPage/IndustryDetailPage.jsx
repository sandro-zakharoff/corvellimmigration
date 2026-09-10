import { useParams } from "react-router-dom";
import IndustryDetail from "../../components/industries/IndustryDetail/IndustryDetail";
import { getIndustryPage } from "../../content/industryPages";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function IndustryDetailPage() {
    const { slug } = useParams();
    const industry = getIndustryPage(slug);

    if (!industry) {
        return <NotFoundPage />;
    }

    return (
        <main id="main-content">
            <IndustryDetail industry={industry} />
        </main>
    );
}

export default IndustryDetailPage;
