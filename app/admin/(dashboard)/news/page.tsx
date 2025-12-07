import { getNews } from '@/actions/news';
import { PageTitle } from '@/components/page-title';
import { NewsList } from './news-list';

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div>
      <PageTitle title="News Management" />
      <NewsList initialNews={news} />
    </div>
  );
}
