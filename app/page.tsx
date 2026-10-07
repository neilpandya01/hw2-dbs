import HubHeader from "@/components/hub/HubHeader";
import MoodBoardLinks from "@/components/hub/MoodBoardLinks";
import DesignSystemLinks from "@/components/hub/DesignSystemLinks";
import SiteLink from "@/components/hub/SiteLink";

export default function Hub() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <HubHeader />
      <MoodBoardLinks />
      <DesignSystemLinks />
      <SiteLink />
    </main>
  );
}
