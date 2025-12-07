import { getPaginatedNews } from "@/actions/news";
import { NewsComponent } from "@/components/news";
import { PageTitle } from "@/components/page-title";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function NewsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const { news, totalCount, totalPages, currentPage, pageSize } = await getPaginatedNews(page, 12);

  return (
    <div className="min-h-screen">
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <PageTitle
            title="News & Updates"
            subtitle="Stay updated with the latest news, announcements, and social media highlights"
            size="large"
            className="mb-8"
          />
        </div>
      </section>

      <NewsComponent
        news={news}
        pagination={{
          currentPage,
          totalPages,
          totalCount,
        }}
      />
    </div>
  );
}
