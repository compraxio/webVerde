import prisma from '@/lib/prisma';

import { AccionesProductos } from './Admin/ProductosAuth';
import Image from 'next/image';
import errorImg from './ui/error.png';

export async function CuerpoProductos({ negocio }: Readonly<{ negocio: number }>) {
  const productos = await prisma.productos.findMany({
    where:
      negocio === 0
        ? {}
        : {
            id_negocio: negocio,
        },
    include: {
      dir_verde: true
    }
  });

  return (
    <>
      {productos.map((p) => (
        <div
          className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all hover:shadow-md group"
          key={p.id_prodcucto}
        >
          <div className="bg-slate-100 dark:bg-zinc-800 flex items-center justify-center relative overflow-hidden h-48 w-full">
            {p.img_prodcto ? (
              <Image
                src={p.img_prodcto}
                alt={p.nombre ?? ''}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <Image
                src={errorImg} // placeholder
                alt="Placeholder"
                width={1920}
                height={1508}
                unoptimized
                className="object-cover"
              />
            )}
          </div>

          <div className="p-4">
            <h4 className="font-bold text-slate-900 dark:text-white truncate">{p.nombre}</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-tight">
              {p.descripcion}
            </p>
            <p className="text-sm font-semibold text-primary">{`${p.precio} cop`}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-tight">
              {p.dir_verde?.negocio}
            </p>
            <AccionesProductos id_prodcucto={p.id_prodcucto} />
          </div>
        </div>
      ))}
    </>
  );
}
