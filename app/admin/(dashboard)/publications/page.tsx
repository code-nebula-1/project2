import { getPublications } from '@/actions/publications';
import { getUsers } from '@/actions/users';
import { PublicationsList } from './publications-list';

export default async function PublicationsPage() {
  const publications = await getPublications();
  const users = await getUsers();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Publications</h1>
      </div>
      <PublicationsList initialPublications={publications} users={users} />
    </div>
  );
}

