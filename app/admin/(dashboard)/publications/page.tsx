import { getPublications } from '@/actions/publications';
import { getUsers } from '@/actions/users';
import { PageTitle } from '@/components/page-title';
import { PublicationsList } from './publications-list';

export default async function PublicationsPage() {
  const publications = await getPublications();
  const users = await getUsers();

  return (
    <div>
      <PageTitle title="Publications" />
      <PublicationsList initialPublications={publications} users={users} />
    </div>
  );
}

