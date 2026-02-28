'use client';
import { useRouter } from 'next/navigation';

import { Prisma } from '../../generated/prisma/client';
import { MdCalendarToday, MdVisibility } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { useState } from 'react';
import { AlertDelate } from './alerts/alertDelate';
import { toast } from 'sonner';
import { EliminarEvento } from '@/actions/eventos';
import { AccionesEvento } from './Admin/EventosAuth';
type evento = Prisma.eventosGetPayload<object>;

export function CuerpoEventos({ eventos }: Readonly<{ eventos: evento[] }>) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [id_evento, setId_evento] = useState<number>();
  const [url_foto, setUrl_foto] = useState<string>();
  return (
    <>
      <AlertDelate
        open={open}
        setOpen={setOpen}
        title="Estas seguro?"
        descripcion="Si eliminas el evento sera definitivo"
        funcion={() => {
          if (!id_evento || !url_foto) {
            toast.error('falta el evento o la imagen del evento');
          }

          toast.promise(EliminarEvento(Number(id_evento), url_foto ?? ''), {
            loading: 'Eliminando evento...',
            success: (res) => {
              if (!res.ok) throw new Error(res.message);
              router.refresh();
              return 'Evento eliminado';
            },
            error: (err) => err.message,
          });
        }}
      />
      {eventos.map((evento) => (
        <div
          className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 hover:shadow-md transition-all group"
          key={evento.id_evento}
        >
          <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-zinc-800">
            <img
              alt={evento.evento}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              src={evento.Img_Presentacion}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white truncate">
              {evento.evento}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 mt-1 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <IoLocationOutline size={18} />
                {evento.direccion}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[18px]">
                  <MdCalendarToday />
                </span>
                {evento.fecha?.toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 pr-2">
            <button
              className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
              title="Ver"
            >
              <MdVisibility size={25} />
            </button>
            <AccionesEvento
              id_evento={evento.id_evento}
              setId_evento={setId_evento}
              setOpen={setOpen}
              setUrl_foto={setUrl_foto}
              logo={evento.Img_Presentacion}
            />
          </div>
        </div>
      ))}
    </>
  );
}
