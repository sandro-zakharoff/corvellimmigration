import { useParams } from "react-router-dom";
import PageMetadata from "../../components/app/PageMetadata/PageMetadata";
import InsightArticle from "../../components/insights/InsightArticle/InsightArticle";
import { getInsightArticle } from "../../content/insightArticles";
import { getArticleMetadata } from "../../content/metadata";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function InsightArticlePage() {
    const { slug } = useParams();
    const article = getInsightArticle(slug);

    if (!article) {
        return <NotFoundPage />;
    }

    return (
        <main id="main-content">
            <PageMetadata {...getArticleMetadata(article)} />
            <InsightArticle article={article} />
        </main>
    );
}

export default InsightArticlePage;
