'use client';

import { useAuthStore } from '@/store/AuthStore';
import Link from 'next/link';
import { MdAddBusiness, MdEditNote } from 'react-icons/md';

export function BotonAgregarNegocio() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return null;
  return (
    <Link
      href="/crearNegocio"
      className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold flex max-lg:hidden items-center gap-2 shadow-lg shadow-primary/20 transition-all"
    >
      <MdAddBusiness size={25} />
      Registrar Negocio
    </Link>
  );
}

export function BotonAgregarNegocioCel() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return null;
  return (
    <div className="lg:hidden fixed bottom-6 right-6 z-30">
      <Link
        href="/crearNegocio"
        className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center"
      >
        <MdAddBusiness size={25} />
      </Link>
    </div>
  );
}

export function BotonAgregarNegocioTargeta() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return null;
  return (

      <Link
        href="/crearNegocio"
        className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-white dark:hover:bg-zinc-900 hover:border-primary/50 transition-all cursor-pointer min-h-100"
      >
        <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center text-slate-400 text-3xl">
          <MdAddBusiness />
        </div>
        <div>
          <p className="font-bold text-slate-800 dark:text-white">Añadir Nueva Empresa</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Inicia el proceso de certificación y registro en el directorio.
          </p>
        </div>
      </Link>
  );
}

export function AccionesNegocios({
  id_negocio,
  setOpen,
  setId_negocio,
  setUrl_foto,
  logo,
}: {
  id_negocio: number;
  setOpen: (open: boolean) => void;
  setId_negocio: (id: number) => void;
  setUrl_foto: (url: string) => void;
  logo?: string | null;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return null;
  return (
    <>
      <Link
        className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
        href={`/editarNegocio/${id_negocio}`}
      >
        <MdEditNote size={25} />
      </Link>
      <button
        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
        onClick={() => {
          setOpen(true);
          setId_negocio(id_negocio);
          setUrl_foto(logo ?? '');
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
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </>
  );
}
