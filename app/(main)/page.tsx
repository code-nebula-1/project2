import { Hero } from "@/components/hero";
import { ResearchAreas } from "@/components/research-areas";
import { FeaturedProjects } from "@/components/featured-projects";
import { Publications } from "@/components/publications";
import { Contact } from "@/components/contact";
import { Values } from "@/components/value"
import { Header } from "@/components/header";
import { ResearchInAction } from "@/components/research-in-action";
import { getJoinTeamSettings, getMapLocationSettings } from "@/actions/settings";

export default async function Home() {
  const [joinTeamSettings, locationSettings] = await Promise.all([
    getJoinTeamSettings(),
    getMapLocationSettings(),
  ]);

  return (
    <>
      <Header />
      <Hero
        showMap={locationSettings.status}
        mapData={{
          name: locationSettings.data.name,
          lat: locationSettings.data.lat,
          lng: locationSettings.data.lng,
        }}
      />

      <Values />
      <Contact
        title={joinTeamSettings.data.title}
        content={joinTeamSettings.data.content}
        showApplyButton={joinTeamSettings.status}
      />
    </>
  );
}
