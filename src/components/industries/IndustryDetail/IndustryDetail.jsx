import Breadcrumbs from "../../common/Breadcrumbs/Breadcrumbs";
import PageBlocks from "../../common/PageBlocks/PageBlocks";

function IndustryDetail({ industry }) {
    return (
        <>
            <Breadcrumbs parent={{ label: "Industries", path: "/industries" }} current={industry.breadcrumb} />
            <PageBlocks blocks={industry.blocks} />
        </>
    );
}

export default IndustryDetail;
