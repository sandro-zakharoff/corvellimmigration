import GuideCollection from "../../common/GuideCollection/GuideCollection";

function GuidesInsights({ content }) {
    return (
        <GuideCollection
            content={content}
            guides={content.guides}
            footerLink={content.footerLink}
        />
    );
}

export default GuidesInsights;
