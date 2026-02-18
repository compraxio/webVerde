'use client';

import { Skeleton } from "./ui/skeleton";
import type { Productos } from '@/types/productosType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

export function CuerpoProductos() {
  const { data, isPending } = useQuery<Productos>({
    queryKey: ['productos'],
    queryFn: async () => {
      const res = await axios('https://api-base-de-datos.vercel.app/productos/');
      return res.data;
    },
  });


  if (isPending) {
    return (
      <>
        <Skeleton className="rounded-2xl min-h-73.25 min-w-73"></Skeleton>
        <Skeleton className="rounded-2xl min-h-73.25 min-w-73"></Skeleton>
        <Skeleton className="rounded-2xl min-h-73.25 min-w-73"></Skeleton>
        <Skeleton className="rounded-2xl min-h-73.25 min-w-73"></Skeleton>
      </>
    );
  }
  return (
    <>
      {data?.data.map((p) => (
        <div
          className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all hover:shadow-md group"
          key={p.id_prodcucto}
        >
          <div className="bg-slate-100 dark:bg-zinc-800 flex items-center justify-center relative overflow-hidden">
            <img src={p.img_prodcto} alt={p.nombre} className="bg-cover" />
          </div>
          <div className="p-4">
            <h4 className="font-bold text-slate-900 dark:text-white truncate">{p.nombre}</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-tight">
              {p.descripcion}
            </p>
            <p className="text-sm font-semibold text-primary">{`${p.precio} cop`}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-center">
              <Link
                href={`/productos/editar/${p.id_prodcucto}`}
                className="text-xs font-bold text-primary hover:underline uppercase tracking-wider"
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Link>
              {/*<div className="flex gap-3 text-slate-400">
                <button className="hover:text-red-500 transition-colors">
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
                <button className="hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">reorder</span>
                </button>
              </div>*/}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
