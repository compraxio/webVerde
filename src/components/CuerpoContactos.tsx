'use client';

import type { ContactosResponse } from '@/types/contactosType';
import { useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
export function CuerpoContactos() {
  const queryCliente = useQueryClient()

  const { data } = useQuery<ContactosResponse>({
    queryKey: ['contactos'],
    queryFn: async () => {
      const res = await fetch('https://api-base-de-datos.vercel.app/contactos/');
      return res.json();
    },
  });

  const contacoMutado = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`https://api-base-de-datos.vercel.app/contactos/${id}`, {method: "DELETE"});
    },
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ['contactos'] });
    }
  })
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

          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 text-right">
            <button
              onClick={() => {
                contacoMutado.mutate(c.id_contacto);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="size-6" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0"/></svg>
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
