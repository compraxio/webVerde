'use client';

import { Skeleton } from './ui/skeleton';
import Link from 'next/link';

import type { ContactosResponse } from '@/types/contactosType';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export function CuerpoContactos() {
  const queryCliente = useQueryClient();

  const { data, isPending } = useQuery<ContactosResponse>({
    queryKey: ['contactos'],
    queryFn: async () => {
      const res = await axios('https://api-base-de-datos.vercel.app/contactos/');
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`https://api-base-de-datos.vercel.app/contactos/${id}`);
    },
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ['contactos'] });
      toast.success('contacto eliminado', {position: "top-right"})
    },
  });

  if (isPending) {
    return (
      <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
        <td className="px-6 py-4">
          <Skeleton className="max-h-7.25 max-w-61.5" />
        </td>

        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
          <Skeleton className="max-h-7.25 max-w-61.5" />
        </td>

        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
          <Skeleton className="max-h-7.25 max-w-61.5" />
        </td>

        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 text-right">
          <Skeleton className="max-h-6 max-w-6" />
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
            <button
              onClick={() => {
                deleteMutation.mutate(c.id_contacto);
              }}
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
                  d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0M4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.3 12.3 0 0 1 10.374 21C8.043 21 5.862 20.355 4 19.234Z"
                />
              </svg>
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
