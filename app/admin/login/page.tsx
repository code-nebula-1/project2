import { LoginForm } from './login-form';
import { verifySession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  // If already logged in, redirect to admin dashboard
  const session = await verifySession();
  if (session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-2">Sign in to access the admin panel</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

