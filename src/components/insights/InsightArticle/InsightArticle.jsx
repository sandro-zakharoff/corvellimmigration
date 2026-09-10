import Breadcrumbs from "../../common/Breadcrumbs/Breadcrumbs";
import PageBlocks from "../../common/PageBlocks/PageBlocks";

function InsightArticle({ article }) {
    return (
        <>
            <Breadcrumbs parent={{ label: "Insights", path: "/insights" }} current={article.breadcrumb} />
            <PageBlocks blocks={article.blocks} />
        </>
    );
}

export default InsightArticle;
