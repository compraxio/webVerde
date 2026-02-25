'use client';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import Image from 'next/image';
import errorImg from './ui/error.png';
import Link from 'next/link';

import { Prisma } from '../../generated/prisma/client';
import { EliminarNegocio } from '@/actions/Negocio';
import { useState } from 'react';
import { AlertDelate } from './alerts/alertDelate';
import { AccionesNegocios } from './Admin/NegociosAuth';

export type negocios = Prisma.dir_verdeGetPayload<object>;

export function CuerpoNegocio({ negocios }: Readonly<{ negocios: negocios[] }>) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [id_negocio, setId_negocio] = useState<number>();
  const [url_foto, setUrl_foto] = useState<string>();
  return (
    <>
      <AlertDelate
        open={open}
        setOpen={setOpen}
        title="Estas seguro?"
        descripcion="Si eliminas el negocio tambien se eliminaran sus fotografias"
        funcion={() => {
          if (!id_negocio || !url_foto) {
            toast.error('falta el grupo o el logo del grupo');
          }

          toast.promise(EliminarNegocio(Number(id_negocio), url_foto ?? ''), {
            loading: 'Eliminando negocio...',
            success: (res) => {
              if (!res.ok) throw new Error(res.message);
              router.refresh();
              return 'Negocio eliminado';
            },
            error: (err) => err.message,
          });
        }}
      />
      {negocios.map((n) => (
        <div
          key={n.id_negocio}
          className="group bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <div className="relative h-48 overflow-hidden">
            {n.logo ? (
              <img
                src={n.logo}
                alt={n.negocio}
                className="w-full h-full bg-cover bg-amber-50 group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <Image
                alt="Honey production"
                className="w-full h-full bg-cover bg-amber-50 group-hover:scale-110 transition-transform duration-500"
                src={errorImg}
                height="1508"
                width="1920"
              />
            )}
            {n.a_o_verificacion?.toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }) === '31 de diciembre de 1969' ? (
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-red-500 flex items-center gap-1 shadow-sm">
                  No certificado
                </span>
              </div>
            ) : (
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

                <AccionesNegocios
                  id_negocio={n.id_negocio}
                  setOpen={setOpen}
                  setId_negocio={setId_negocio}
                  setUrl_foto={setUrl_foto}
                  logo={n.logo}
                />
                <Link
                  href={`/verPerfilNegocio/${n.id_negocio}`}
                  className="bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 px-4 py-1.5 rounded-lg text-xs font-semibold"
                >
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
