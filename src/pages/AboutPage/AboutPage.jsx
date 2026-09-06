import AboutStory from "../../components/about/AboutStory/AboutStory";
import FirmToday from "../../components/about/FirmToday/FirmToday";
import PeoplePreview from "../../components/about/PeoplePreview/PeoplePreview";
import LinkListCta from "../../components/common/LinkListCta/LinkListCta";
import { aboutContent } from "../../content/about";

function AboutPage() {
    return (
        <main id="main-content">
            <AboutStory />
            <FirmToday />
            <PeoplePreview />
            <LinkListCta content={aboutContent.closing} flushTop compactTitle wideLinks />
        </main>
    );
}

export default AboutPage;
