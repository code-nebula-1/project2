'use server';

import { authenticateUser } from './users';
import { createSession, deleteSession, verifySession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function login(email: string, password: string) {
  // Authenticate the user
  const result = await authenticateUser(email, password);

  if (!result.success || !result.user) {
    return { success: false, error: result.error || 'Invalid credentials' };
  }

  // Create session
  await createSession(result.user.id, result.user.email, result.user.role);

  return { success: true };
}

export async function logout() {
  await deleteSession();
  redirect('/admin/login');
}

export async function getSession() {
  return await verifySession();
}

