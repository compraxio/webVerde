'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '../../generated/prisma/client';
import { del, put } from '@vercel/blob';

export async function obtenerTodosGrupos() {
  const grupos = await prisma.grupos.findMany({
    include: {
      dir_verde: true,
    },
  });

  return grupos;
}

export async function ConseguirGrupo(id_grupo: number) {
  const grupo = await prisma.grupos.findFirst({
    where: {
      id_grupo,
    },
  });
  return grupo;
}

export async function CrearGrupo(formData: FormData) {
  const actividad = formData.get('actividad') as string;
  const logo = formData.get('logo_grupo') as File;

  if (!actividad || !logo) {
    return {
      ok: false,
      message: 'Datos incompletos',
    };
  }

  let blobUrl: string | null = null;

  try {
    const blob = await put(`grupos/${crypto.randomUUID()}`, logo, { access: 'public' });

    blobUrl = blob.url;

    await prisma.grupos.create({
      data: {
        actividad: actividad,
        logo_grupo: blobUrl,
      },
    });

    return {
      ok: true,
      message: 'Grupo creado correctamente',
    };
  } catch (error: unknown) {
    if (blobUrl) {
      await del(blobUrl).catch(() => {});
    }

    // 🧠 Error normal
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    }

    return {
      ok: false,
      message: 'Error inesperado al crear grupo',
    };
  }
}

export async function EditarGrupo(id_grupo: number, actividad: string) {
  try {
    await prisma.grupos.update({
      where: {
        id_grupo,
      },
      data: {
        actividad: actividad,
      },
    });

    return {
      ok: true,
      message: 'Grupo editado correctamente',
    };
  } catch (error: unknown) {
    // 🧠 Error normal
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    }

    return {
      ok: false,
      message: 'Error inesperado al editar grupo',
    };
  }
}

export async function EliminarGrupo(id_grupo: number, url: string) {
  try {
    await prisma.grupos.delete({
      where: { id_grupo },
    });
    if (url) await del(url);

    return { ok: true };
  } catch (error) {
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
