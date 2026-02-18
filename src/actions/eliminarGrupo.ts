'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '../../generated/prisma/client';
import { del } from '@vercel/blob';

export async function EliminarGrupo(id_grupo: number, url: string) {
  try {
    await prisma.grupos.delete({
      where: { id_grupo },
    });
    if(url) await del(url);

    return { ok: true };
  } catch (error) {
    console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return {
          ok: false,
          message: 'No puedes eliminar este grupo porque tiene negocios asociados.',
        };
      }
    }

    return {
      ok: false,
      message: 'Error al eliminar el grupo.',
    };
  }
}
