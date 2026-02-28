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
