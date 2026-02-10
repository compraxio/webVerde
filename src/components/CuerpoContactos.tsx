'use client';

import type { ContactosResponse } from '@/types/contactosType';
import { useQuery } from '@tanstack/react-query';
export function CuerpoContactos() {
  const { data } = useQuery<ContactosResponse>({
    queryKey: ['contactos'],
    queryFn: async () => {
      const res = await fetch('https://api-base-de-datos.vercel.app/contactos/');
      return res.json();
    },
  });
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

          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 text-right"></td>
        </tr>
      ))}
    </>
  );
}
