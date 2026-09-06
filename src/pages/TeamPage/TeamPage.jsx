import PageIntro from "../../components/common/PageIntro/PageIntro";
import LinkListCta from "../../components/common/LinkListCta/LinkListCta";
import TeamCardsSection from "../../components/team/TeamCardsSection/TeamCardsSection";
import TeamProfilesSection from "../../components/team/TeamProfilesSection/TeamProfilesSection";
import {
    administrators,
    attorneys,
    paralegals,
    practiceConsultants,
    teamPageContent
} from "../../content/people";

function TeamPage() {
    return (
        <main id="main-content">
            <PageIntro {...teamPageContent.intro} />
            <TeamProfilesSection
                section={teamPageContent.attorneys}
                members={attorneys}
                alternate
            />
            <TeamProfilesSection
                section={teamPageContent.consulting}
                members={practiceConsultants}
                surface
                compactHeading
                compactList
                spaced
            />
            <TeamCardsSection section={teamPageContent.paralegals} members={paralegals} />
            <TeamProfilesSection
                section={teamPageContent.administration}
                members={administrators}
                surface
                compactList
                spaced
            />
            <LinkListCta content={teamPageContent.closing} />
        </main>
    );
}

export default TeamPage;
