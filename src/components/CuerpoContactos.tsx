'use client';

import { Skeleton } from './ui/skeleton';
import Link from 'next/link';

import type { ContactosResponse } from '@/types/contactosType';
import { useQuery} from '@tanstack/react-query';
import axios from 'axios';

export function CuerpoContactos() {

  const { data, isPending } = useQuery<ContactosResponse>({
    queryKey: ['contactos'],
    queryFn: async () => {
      const res = await axios('https://api-base-de-datos.vercel.app/contactos/');
      return res.data;
    },
  });


  if (isPending) {
    return (
      <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
        <td className="px-6 py-4">
          <Skeleton className="min-h-6 min-w-6" />
        </td>

        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
          <Skeleton className="min-h-6 min-w-6" />
        </td>

        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
          <Skeleton className="min-h-6 min-w-6" />
        </td>

        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 text-right">
          <Skeleton className="min-h-6 min-w-6" />
        </td>
      </tr>
    );
  }
  return (
    <>
      {data?.data.map((c) => (
        <tr
          className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
          key={c.id_contacto}
        >
          <td className="px-6 py-4">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{c.nombre}</p>
          </td>

          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{c.correo}</td>

          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{c.telefono}</td>

          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 flex justify-end gap-2">
            <Link href={`/contactos/editar/${c.id_contacto}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="size-6" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>
            </Link>

          </td>
        </tr>
      ))}
    </>
  );
}
