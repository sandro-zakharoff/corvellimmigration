import { useParams } from "react-router-dom";
import InsightArticle from "../../components/insights/InsightArticle/InsightArticle";
import { getInsightArticle } from "../../content/insightArticles";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function InsightArticlePage() {
    const { slug } = useParams();
    const article = getInsightArticle(slug);

    if (!article) {
        return <NotFoundPage />;
    }

    return (
        <main id="main-content">
            <InsightArticle article={article} />
        </main>
    );
}

export default InsightArticlePage;
