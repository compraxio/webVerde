'use client';

import Link from 'next/link';

import type { Municipios } from '@/types/municipiosType';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export function CuerpoMunicipios() {
    const queryCliente = useQueryClient();

    const { data, isPending } = useQuery<Municipios>({
      queryKey: ['municipios'],
      queryFn: async () => {
        const res = await axios('https://api-base-de-datos.vercel.app/municipios');
        return res.data;
      },
    });

    const deleteMutation = useMutation({
      mutationFn: async (id: number) => {
        await axios.delete(`https://api-base-de-datos.vercel.app/municipios/${id}`);
      },
      onSuccess: () => {
        queryCliente.invalidateQueries({ queryKey: ['municipios'] });
        toast.success('Municipio eliminado', { position: 'top-right' });
      },
    });

    if (isPending) {
      return (
        <tr className=" cursor-pointer transition-colors group hover:bg-primary/10 hover:outline-4 hover:outline-primary">
          <td className="px-6 py-4">cargando....</td>
          <td className="px-6 py-4">cargando....</td>
          <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">cargando....</td>
          <td className="px-6 py-4 text-right font-mono text-sm">cargando....</td>
        </tr>
      );
    }

    return (
      <>
        {data?.data.map((m) => (
          <tr className=" cursor-pointer transition-colors group hover:bg-primary/10 hover:outline-4 hover:outline-primary" key={m.cod_munic}>
                <td className="px-6 py-4 font-medium">{ m.municipio}</td>
            <td className="px-6 py-4">
                    <span className="text-xs bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded">{ m.zona}</span>
            </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">{ m.departamento}</td>
                <td className="px-6 py-4 text-right font-mono text-sm">{ m.cod_munic}</td>
            <td className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link className="p-1 text-slate-400 hover:text-primary" href="#">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </Link>
                <button className="p-1 text-slate-400 hover:text-red-500" onClick={() => {deleteMutation.mutate(m.cod_munic)}}>
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </>
    );
}
