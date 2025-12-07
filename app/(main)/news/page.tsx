import { getPaginatedNews } from "@/actions/news";
import { NewsComponent } from "@/components/news";
import { TranslatedPageTitle } from "@/components/translated-page-title";

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
          <TranslatedPageTitle
            titleKey="news.title"
            subtitleKey="news.subtitle"
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
