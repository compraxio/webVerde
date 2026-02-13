'use client';

import type { Productos } from '@/types/productosType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function CuerpoProductos() {
  const { data, isPending } = useQuery<Productos>({
    queryKey: ['productos'],
    queryFn: async () => {
      const res = await axios('https://api-base-de-datos.vercel.app/productos/');
      return res.data;
    },
  });
  return (
    <>
      {data?.data.map((p) => (
        <div
          className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all hover:shadow-md group"
          key={p.id_prodcucto}
        >
              <div className="bg-slate-100 dark:bg-zinc-800 flex items-center justify-center relative overflow-hidden">
                  <img src={p.img_prodcto} alt={p.nombre} className='bg-cover'/>
          </div>
          <div className="p-4"> 
            <h4 className="font-bold text-slate-900 dark:text-white truncate">{p.nombre}</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-tight">
              {p.descripcion}
            </p>
            <p className="text-sm font-semibold text-primary">{`${p.precio} cop`}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
              <button className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">
                EDIT
              </button>
              <div className="flex gap-3 text-slate-400">
                <button className="hover:text-red-500 transition-colors">
                  {/*<span className="material-symbols-outlined text-xl">delete</span>*/}
                </button>
                <button className="hover:text-primary transition-colors">
                  {/*<span className="material-symbols-outlined text-xl">reorder</span>*/}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
