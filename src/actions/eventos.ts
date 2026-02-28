'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '../../generated/prisma/client';
import { del, put } from '@vercel/blob';

export async function ObtenerEventos() {
  const eventos = await prisma.eventos.findMany();
  return eventos;
}

export async function ConseguirEvento(id_evento: number) {
  const evento = await prisma.eventos.findFirst({
    where: {
      id_evento,
    },
  });
  return evento;
}

export async function CrearEvento(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const fecha = formData.get('fecha') as string;
  const hora = formData.get('hora') as string;
  const direccion = formData.get('direccion') as string;
  const imagen = formData.get('imagen') as File;
  const link = formData.get('link') as string;
  const tema = formData.get('tema') as string;
  const tipo = formData.get('tipo') as string;
  const estado = formData.get('estado') as string;

  if (!nombre || !fecha || !hora || !direccion || !imagen) {
    return {
      ok: false,
      message: 'Datos incompletos',
    };
  }

  let blobUrl: string | null = null;

  try {
    const blob = await put(`eventos/${crypto.randomUUID()}`, imagen, { access: 'public' });

    blobUrl = blob.url;

    await prisma.eventos.create({
      data: {
        evento: nombre,
        fecha: new Date(fecha),
        hora,
        direccion,
        Img_Presentacion: blobUrl,
        link,
        temas: tema,
        tipo_evento: tipo,
        estado,
      },
    });

    return {
      ok: true,
      message: 'Evento creado correctamente',
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
      message: 'Error inesperado al crear evento',
    };
  }
}

export async function EditarEvento(id_evento: number, formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const fecha = formData.get('fecha') as string;
  const hora = formData.get('hora') as string;
  const direccion = formData.get('direccion') as string;
  const link = formData.get('link') as string;
  const tema = formData.get('tema') as string;
  const tipo = formData.get('tipo') as string;
  const estado = formData.get('estado') as string;

  if (!nombre || !fecha || !hora || !direccion) {
    return {
      ok: false,
      message: 'Datos incompletos',
    };
  }

  try {
    await prisma.eventos.update({
      where: { id_evento },
      data: {
        evento: nombre,
        fecha: new Date(fecha),
        hora,
        direccion,
        link,
        temas: tema,
        tipo_evento: tipo,
        estado,
      },
    });
  } catch (error: unknown) {

    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    }

    return {
      ok: false,
      message: 'Error al actualizar el evento',
    };
  }

  return {
    ok: true,
    message: 'Evento actualizado correctamente',
  };
}

export async function EliminarEvento(id_evento: number, url: string) {
  try {
    await prisma.eventos.delete({
      where: { id_evento },
    });
    if (url) await del(url);

    return { ok: true };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return {
          ok: false,
          message: 'No puedes eliminar este evento porque tiene negocios asociados.',
        };
      }
    }

    return {
      ok: false,
      message: 'Error al eliminar el evento.',
    };
  }
}
