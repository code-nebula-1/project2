import { Publications } from "@/components/publications"
import { TranslatedPageTitle } from "@/components/translated-page-title";
import { getPaginatedPublications } from "@/actions/publications";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Publication({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const paginatedData = await getPaginatedPublications(currentPage, 10);

  return (
    <div className="min-h-screen">

      {/* Main Profile Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <TranslatedPageTitle
            titleKey="publications.title"
            subtitleKey="publications.subtitle"
            size="large"
          />
          {/* Profile Image and Basic Info */}
          <Publications
            publications={paginatedData.publications}
            pagination={{
              currentPage: paginatedData.currentPage,
              totalPages: paginatedData.totalPages,
              totalCount: paginatedData.totalCount,
            }}
          />
        </div>
      </section>
    </div>
  );
}