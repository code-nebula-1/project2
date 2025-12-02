import { Hero } from "@/components/hero";
import { ResearchAreas } from "@/components/research-areas";
import { FeaturedProjects } from "@/components/featured-projects";
import { Publications } from "@/components/publications";
import { Contact } from "@/components/contact";
import { Values } from "@/components/value"
import { Header } from "@/components/header";
import { ResearchInAction } from "@/components/research-in-action";
import { getSettings } from "@/actions/settings";

export default async function Home() {
  const settings = await getSettings();

  return (
    <>
      <Header />
      <Hero />

      <Values />
      <Contact
        title={settings.joinTeamTitle}
        content={settings.joinTeamContent}
        showApplyButton={settings.showJoinTeam}
      />
    </>
  );
}
