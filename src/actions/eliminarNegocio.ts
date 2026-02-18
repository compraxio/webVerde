'use server';

import prisma from '@/lib/prisma';
import { del } from '@vercel/blob';
import { Prisma } from '../../generated/prisma/client';

export async function EliminarNegocio(id_negocio: number, url: string) {
  try {
    await prisma.dir_verde.delete({
      where: { id_negocio },
    });
    if (url) await del(url);
    return { ok: true };
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return {
          ok: false,
          message: 'No puedes eliminar este grupo porque tiene elementos asociados a el.',
        };
      }
    }
    return {
      ok: false,
      message: 'Error al eliminar el grupo.',
    };
  }
}
