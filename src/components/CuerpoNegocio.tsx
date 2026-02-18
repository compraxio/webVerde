'use client';
import type { DirVerde } from '@/types/dir_verdeType';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Skeleton } from './ui/skeleton';
import axios from 'axios';
import { toast } from 'sonner';
import { MdEditNote } from 'react-icons/md';

import Image from 'next/image';
import errorImg from './ui/error.png';
import Link from 'next/link';

type ApiError = {
  response?: {
    status: number;
    data: {
      success: boolean;
      message: string;
    };
  };
};

export function CuerpoNegocio() {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<DirVerde>({
    queryKey: ['negocios'],
    queryFn: async () => {
      const res = await axios('https://api-base-de-datos.vercel.app/dir_verde/');
      return res.data;
    },
  });

  const deleteMutacion = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`https://api-base-de-datos.vercel.app/dir_verde/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['negocios'] });
    },

    onError: (error: ApiError) => {
      if (error?.response) {
        toast.error(error.response.data.message);
      }
    },
  });

  if (isPending) {
    return (
      <>
        <Skeleton className="rounded-2xl min-h-100 min-w-94.5"></Skeleton>
      </>
    );
  }

  return (
    <>
      {data?.data.map((n) => (
        <div
          key={n.id_negocio}
          className="group bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              alt="Honey production"
              className="w-full h-full bg-cover bg-amber-50 group-hover:scale-110 transition-transform duration-500"
              src={n?.logo ?? errorImg}
              height="1508"
              width="1920"
            />
            {n?.ano_verificacion ? (
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="size-4"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8c0 .982-.472 1.854-1.202 2.402a3 3 0 0 1-.848 2.547 3 3 0 0 1-2.548.849A3 3 0 0 1 8 15a3 3 0 0 1-2.402-1.202 3 3 0 0 1-2.547-.848 3 3 0 0 1-.849-2.548A3 3 0 0 1 1 8c0-.982.472-1.854 1.202-2.402a3 3 0 0 1 .848-2.547 3 3 0 0 1 2.548-.849A3 3 0 0 1 8 1c.982 0 1.854.472 2.402 1.202a3 3 0 0 1 2.547.848c.695.695.978 1.645.849 2.548A3 3 0 0 1 15 8m-3.291-2.843a.75.75 0 0 1 .135 1.052l-4.25 5.5a.75.75 0 0 1-1.151.043l-2.25-2.5a.75.75 0 1 1 1.114-1.004l1.65 1.832 3.7-4.789a.75.75 0 0 1 1.052-.134"
                      clipRule="evenodd"
                    />
                  </svg>
                  Certificado
                </span>
              </div>
            ) : (
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
                  No certificado
                </span>
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-lg font-bold text-slate-800 dark:text-white">{n.negocio}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {n?.sub_categoria && n.sub_categoria}
                </p>
              </div>
              <div className="w-10 h-10 bg-slate-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
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
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3 3 0 0 0 3.75-.615A3 3 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a3 3 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3 3 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-6">
              {n.descripcion}
            </p>
            <div className="flex items-center justify-center border-t border-slate-100 dark:border-zinc-800 pt-4">
              <div className="flex items-center gap-2">
                <button
                  className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
                  title="Editar"
                >
                  <MdEditNote size={25}/>
                </button>
                <button
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  onClick={() => {
                    toast.promise(() => deleteMutacion.mutateAsync(n.id_negocio), {
                      loading: 'Eliminando negocio...',
                      success: 'negocio eliminado',
                    });
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
                <Link href={`/verPerfilNegocio/${n.id_negocio}`} className="bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 px-4 py-1.5 rounded-lg text-xs font-semibold">
                  Ver Perfil
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
