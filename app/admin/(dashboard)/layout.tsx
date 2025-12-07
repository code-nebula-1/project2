import Link from 'next/link';
import { Users, FileText, LayoutDashboard, UserCircle, Settings, Newspaper } from 'lucide-react';
import { verifySession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { LogoutButton } from '../logout-button';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verify session
  const session = await verifySession();

  // If no session, redirect to login
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <nav className="mt-6 flex-1">
            <Link
              href="/admin"
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Users className="w-5 h-5 mr-3" />
              Users
            </Link>
            <Link
              href="/admin/publications"
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <FileText className="w-5 h-5 mr-3" />
              Publications
            </Link>
            <Link
              href="/admin/news"
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Newspaper className="w-5 h-5 mr-3" />
              News
            </Link>
            <Link
              href="/admin/teams"
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <UserCircle className="w-5 h-5 mr-3" />
              Teams
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </nav>

          {/* User Info and Logout */}
          <div className="p-6 border-t border-gray-800">
            <div className="mb-3">
              <p className="text-xs text-gray-400">Logged in as</p>
              <p className="text-sm font-medium text-white truncate">{session.email}</p>
              <p className="text-xs text-gray-400 capitalize">{session.role}</p>
            </div>
            <LogoutButton />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

