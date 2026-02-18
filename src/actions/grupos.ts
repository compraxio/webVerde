'use server';
import prisma from '@/lib/prisma';

export async function obtenerGrupos() {
  const grupos = await prisma.grupos.findMany({
    include: {
      dir_verde: true,
    },
  });

  return grupos;
}
