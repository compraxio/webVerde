'use client';
import { useRouter } from 'next/navigation';

import { Prisma } from '../../generated/prisma/client';
type grupo = Prisma.gruposGetPayload<{
  include: {
    dir_verde: true;
  };
}>;

import { toast } from 'sonner';
import Link from 'next/link';
import { EliminarGrupo } from '@/actions/Grupos';
import { useState } from 'react';
import { AlertDelate } from './alerts/alertDelate';
import { AccionesGrupos } from './Admin/GruposAuth';

export function CuerpoGrupos({ grupos }: Readonly<{ grupos: grupo[] }>) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [id_grupo, setId_grupo] = useState<number>();
  const [url_foto, setUrl_foto] = useState<string>();
  return (
    <>
      <AlertDelate
        open={open}
        setOpen={setOpen}
        title="Estas seguro?"
        descripcion="Si eliminas el grupo sera definitivo"
        funcion={() => {
          if (!id_grupo || !url_foto) {
            toast.error('falta el grupo o el logo del grupo');
          }

          toast.promise(EliminarGrupo(Number(id_grupo), url_foto ?? ''), {
            loading: 'Eliminando grupo...',
            success: (res) => {
              if (!res.ok) throw new Error(res.message);
              router.refresh();
              return 'Grupo eliminado';
            },
            error: (err) => err.message,
          });
        }}
      />
      {grupos.map((g) => (
        <div
          className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-6 hover:shadow-md transition-all group"
          key={g.id_grupo}
        >
          <img
            src={g.logo_grupo ?? ''}
            alt={g.actividad}
            className="bg-cover w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">
              {g.actividad.split(':')[0]}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-md:line-clamp-1">
              {g.actividad.split(':')[1]}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <span className="block max-md:hidden text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-full whitespace-nowrap">
              Negocios ({g.dir_verde.length})
            </span>
            {/* <div className="flex items-center gap-1">
              <Link
                href={`/grupos/editar/${g.id_grupo}`}
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
                  setId_grupo(g.id_grupo);
                  setUrl_foto(g.logo_grupo ?? '');
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
            </div> */}

            <AccionesGrupos
              id_grupo={g.id_grupo}
              setId_grupo={setId_grupo}
              setOpen={setOpen}
              setUrl_foto={setUrl_foto}
              logo={g.logo_grupo}
            />
          </div>
        </div>
      ))}
    </>
  );
}
