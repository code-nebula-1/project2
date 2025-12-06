import { getUsers } from '@/actions/users';
import { getPublications } from '@/actions/publications';
import { getTeamMembers } from '@/actions/teams';
import { getJoinTeamSettings } from '@/actions/settings';
import { PageTitle } from '@/components/page-title';
import { Users, FileText, UserCircle, Settings } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const users = await getUsers();
  const publications = await getPublications();
  const teams = await getTeamMembers();
  const settings = await getJoinTeamSettings();

  return (
    <div>
      <PageTitle title="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Users</h2>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{users.length}</p>
          <p className="text-gray-600 mt-2">Total users in the system</p>
        </div>

        {/* Publications Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Publications</h2>
            <div className="bg-green-100 p-3 rounded-full">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{publications.length}</p>
          <p className="text-gray-600 mt-2">Total publications</p>
        </div>

        {/* Team Members Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
            <div className="bg-purple-100 p-3 rounded-full">
              <UserCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{teams.length}</p>
          <p className="text-gray-600 mt-2">Total team members</p>
        </div>

        {/* Settings Card */}
        <Link href="/admin/settings">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
              <div className="bg-orange-100 p-3 rounded-full">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">Join Team Section</p>
              <p className={`text-xs px-2 py-1 rounded-full inline-block ${settings.status
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
                }`}>
                {settings.status ? 'Active' : 'Hidden'}
              </p>
            </div>
            <p className="text-gray-600 mt-2 text-sm">Click to manage settings</p>
          </div>
        </Link>
      </div>

      {/* Recent Users */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.slice(0, 5).map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

