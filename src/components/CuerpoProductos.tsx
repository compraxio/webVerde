import prisma from '@/lib/prisma';


import { AccionesProductos } from './Admin/ProductosAuth';

export async function CuerpoProductos() {
      const productos = await prisma.productos.findMany();

  return (
    <>
      {productos.map((p) => (
        <div
          className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all hover:shadow-md group"
          key={p.id_prodcucto}
        >
          <div className="bg-slate-100 dark:bg-zinc-800 flex items-center justify-center relative overflow-hidden">
            <img src={p.img_prodcto ?? ''} alt={p.nombre ?? ''} className="bg-cover" />
          </div>
          <div className="p-4">
            <h4 className="font-bold text-slate-900 dark:text-white truncate">{p.nombre}</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-tight">
              {p.descripcion}
            </p>
            <p className="text-sm font-semibold text-primary">{`${p.precio} cop`}</p>
            <AccionesProductos id_prodcucto={p.id_prodcucto} />
          </div>
        </div>
      ))}
    </>
  );
}
