'use client';

import { useAuthStore } from '@/store/AuthStore';
import Link from 'next/link';

export function BotonAgregar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return null;

  return (
    <Link
      href="/contactos/crear"
      className="bg-primary hover:bg-primary/90 text-white font-bold px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
    >
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
          d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0M3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.3 12.3 0 0 1 9.374 21C7.043 21 4.862 20.355 3 19.234Z"
        />
      </svg>
      Agregar Contacto
    </Link>
  );
}

export function SeccionAcciones() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return null;

  return (
    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
      Acciones
    </th>
  );
}

export function AccionesContacto({ id }: { id: number }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return null;
  return (
    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 flex justify-end gap-2">
      <Link href={`/contactos/editar/${id}`}>
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </Link>
    </td>
  );
}
