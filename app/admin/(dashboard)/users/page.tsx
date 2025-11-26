import { getUsers } from '@/actions/users';
import { PageTitle } from '@/components/page-title';
import { UsersList } from './users-list';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <PageTitle title="Users" />
      <UsersList initialUsers={users} />
    </div>
  );
}

