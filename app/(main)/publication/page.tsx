
import { Publications } from "@/components/publications"
import { getPublications } from "@/actions/publications";

export default async function Publication() {
  const publications = await getPublications();

  return (
    <div className="min-h-screen">

      {/* Main Profile Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
            {/* Profile Image and Basic Info */}
              <Publications publications={publications} />
        </div>
      </section>
    </div>
  );
}