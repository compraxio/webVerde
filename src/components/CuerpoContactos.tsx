import prisma from '@/lib/prisma';

import { AccionesContacto } from './Admin/ContactosAuth';

export async function CuerpoContactos({ negocio }: Readonly<{ negocio: number }>) {
  const contactos = await prisma.contactos.findMany({
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
      {contactos.map((c) => (
        <tr
          className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
          key={c.id_contacto}
        >
          <td className="px-6 py-4">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{c.nombre}</p>
          </td>

          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{c.correo}</td>

          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{c.telefono}</td>

          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{c.dir_verde?.negocio}</td>

          <AccionesContacto id={c.id_contacto} />
        </tr>
      ))}
    </>
  );
}
