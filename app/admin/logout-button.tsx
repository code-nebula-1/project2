'use client';

import { logout } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button
        type="submit"
        size="admin"

        className="w-full bg-dark-blue text-white"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </form>
  );
}

