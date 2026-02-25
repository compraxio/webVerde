'use client';

import { useAuthStore } from '@/store/AuthStore';
import Link from 'next/link';

export function BotonAgregarProducto() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    if (!isAuthenticated) return null;
    return (
      <Link
        href="/productos/crear"
        className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-semibold flex max-lg:hidden items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          className="size-6"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Agregar Producto
      </Link>
    );
}

export function BotonAgregarProductoCel() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    if (!isAuthenticated) return null;
    return (
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <Link
          href="/productos/crear"
          className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="size-6"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Link>
      </div>
    );
}

export function AccionesProductos({id_prodcucto}: {id_prodcucto: number}) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    if (!isAuthenticated) return null;
    return (
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-center">
        <Link
          href={`/productos/editar/${id_prodcucto}`}
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
    );
}
