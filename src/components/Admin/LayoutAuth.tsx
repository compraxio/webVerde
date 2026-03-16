'use client';

import { useAuthStore } from '@/store/AuthStore';
import Link from 'next/link';
import { toast } from 'sonner';
import { getUser } from '@/lib/auth-client';
import { useEffect, useState } from 'react';

export function Admin() {
  const logout = useAuthStore((store) => store.logout);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function verificar() {
      const autenticado = await getUser();
      setIsAuthenticated(autenticado);
    }
    verificar();
  }, []);

  if (isAuthenticated === null) return null;
  
  if (!isAuthenticated) {
    return (
      <Link
        href="/auth"
        className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-zinc-800"
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold">Admin Cardique</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Gestionar Directorio</p>
        </div>
        <div className="border p-2 rounded-full b">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="size-6"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0M4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.9 17.9 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632"
            />
          </svg>
        </div>
      </Link>
    );
  }

  return (
    <button
      className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-zinc-800 cursor-pointer"
      onClick={async () => {
        const res = await logout();
        if (!res.success) {
          toast.info(res.message);
          return;
        }
        toast.success(res.message);
        window.location.reload();
      }}
    >
      <div className="text-right hidden sm:block">
        <p className="text-sm font-semibold">Admin Cardique</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Gestionar Directorio</p>
      </div>
      <div className="border p-2 rounded-full b">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          className="size-6"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
          />
        </svg>
      </div>
    </button>
  );
}
