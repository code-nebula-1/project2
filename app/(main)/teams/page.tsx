import { Team } from "@/components/team";
import { PageTitle } from "@/components/page-title";
import { getTeamMembers } from "@/actions/teams";

export default async function Teams() {
  const members = await getTeamMembers();

  return (
    <div className="min-h-screen">
      {/* Main Profile Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <PageTitle
            title="Meet the Team"
            subtitle="Our diverse team of researchers, faculty, and students working at the intersection of human-computer interaction and robotics."
            size="large"
          />
          {/* Profile Image and Basic Info */}
          <Team members={members} />
        </div>
      </section>
    </div>
  );
}
