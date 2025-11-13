import { getUsers } from '@/actions/users';
import { UsersList } from './users-list';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
      </div>
      <UsersList initialUsers={users} />
    </div>
  );
}

