import { Team } from "@/components/team";
import { TranslatedPageTitle } from "@/components/translated-page-title";
import { getTeamMembers } from "@/actions/teams";

export default async function Teams() {
  const members = await getTeamMembers();

  return (
    <div className="min-h-screen">
      {/* Main Profile Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <TranslatedPageTitle
            titleKey="teams.title"
            subtitleKey="teams.subtitle"
            size="large"
          />
          {/* Profile Image and Basic Info */}
          <Team members={members} />
        </div>
      </section>
    </div>
  );
}
