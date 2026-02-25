'use client';
import { useAuthStore } from '@/store/AuthStore';
import Link from 'next/link';


export function BotonAgregarGrupo() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return null;

  return (
    <Link
      href="/grupos/crear"
      className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold flex max-lg:hidden items-center gap-2 shadow-lg shadow-primary/20 transition-all"
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
      Agregar Grupo
    </Link>
  );
}

export function BotonAgregarGrupoCel() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return null;

  return (
    <div className="lg:hidden fixed bottom-6 right-6 z-30">
      <Link
        href="/grupos/crear"
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

export function AccionesGrupos({
  id_grupo,
  setOpen,
  setId_grupo,
  setUrl_foto,
  logo,
}: {
  id_grupo: number;
  setOpen: (open: boolean) => void;
  setId_grupo: (id: number) => void;
  setUrl_foto: (url: string) => void;
  logo?: string | null;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return null;

  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/grupos/editar/${id_grupo}`}
        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
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
      <button
        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
        onClick={() => {
          setOpen(true);
          setId_grupo(id_grupo);
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
    </div>
  );
}
