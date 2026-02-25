'use server';

import prisma from '@/lib/prisma';
import { del, put } from '@vercel/blob';
import { Prisma } from '../../generated/prisma/client';
import type { Maps } from '@/types/mapsApi';


export async function ConseguirTodosNegocios() {
  const negocios = await prisma.dir_verde.findMany()
  return negocios
}

export async function ConseguirNegocio(id_negocio: number) {
  const negocio = await prisma.dir_verde.findFirst({
    where: {
      id_negocio,

    },
    include: {
      grupos:true
    }
  });
  return negocio;
}

export async function CrearNegocio(formData: FormData) {

  const negocio = formData.get('negocio') as string;
  const id_grupo = formData.get('id_grupo') as unknown;
  const id_fase = formData.get('id_fase') as unknown;
  const unidad_productiva = formData.get('unidad_productiva') as string;
  const descripcion = formData.get('descripcion') as string;
  const actividad = formData.get('actividad') as string;
  const sub_categoria = formData.get('sub_categoria') as string;
  const zona = formData.get('zona') as string;
  const municipio = formData.get('municipio') as string;
  const direccion = formData.get('direccion') as string;
  const representante = formData.get('representante') as string;
  const whatsup = formData.get('whatsup') as string;
  const correo = formData.get('correo') as string;
  const url_negocio = formData.get('url_negocio') as string;
  const url_youtube = formData.get('url_youtube') as string;
  const url_facebook = formData.get('url_facebook') as string;
  const url_instagram = formData.get('url_instagram') as string;
  const url_tiktok = formData.get('url_tiktok') as string;
  const estado = formData.get('estado') as string;
  const a_o_verificacion = formData.get('a_o_verificacion') as string;
  const autorizado_por = formData.get('autorizado_por') as string;
  const logo = formData.get('logo') as File;
  const fotografias = formData.getAll('fotografias') as File[];
  const lat = formData.get('latitud') as string;
  const lng = formData.get('longitud') as string;

  if (
    !negocio ||
    !id_grupo ||
    !actividad ||
    !zona ||
    !municipio ||
    !direccion ||
    !correo ||
    !logo ||
    !lat ||
    !lng
  ) {
    return {
      ok: false,
      message: 'Datos incompletos',
    };
  }

  let blobUrl: string | null = null;

  try {

    const blob = await put(`dir_verde/${crypto.randomUUID()}`, logo, { access: 'public' });
    blobUrl = blob.url;

    const nuevoNegocio = await prisma.dir_verde.create({
      data: {
        negocio,
        actividad,
        sub_categoria,
        correo,
        direccion,
        municipio,
        zona,
        a_o_verificacion: new Date(a_o_verificacion).toISOString(),
        autorizado_por,
        descripcion,
        whatsup,
        url_youtube,
        url_tiktok,
        url_negocio,
        url_instagram,
        url_facebook,
        unidad_productiva,
        representante,
        pos_gps: `${lat},${lng}`,
        logo: blobUrl,
        id_grupo: Number(id_grupo),
        id_fase: Number(id_fase),
        estado,
      },
    });

    // Subir fotografías y guardarlas en la base de datos
    if (fotografias.length > 0) {
      for (const foto of fotografias) {
        if (foto && foto.size > 0) {
          const blobFoto = await put(`dir_verde/fotos/${crypto.randomUUID()}`, foto, {
            access: 'public',
          });
          await prisma.fotografias.create({
            data: {
              id_negocio: nuevoNegocio.id_negocio,
              url_foto: blobFoto.url,
            },
          });
        }
      }
    }

    return {
      ok: true,
      message: 'Negocio creado correctamente',
    };
  } catch (error: unknown) {
    console.log(error);
    if (blobUrl) {
      await del(blobUrl).catch(() => {});
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          ok: false,
          message: 'correo ya registrado',
        };
      }
    }

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

export async function EliminarNegocio(id_negocio: number, url: string) {
  try {
    // Obtener las fotografías del negocio
    const fotos = await prisma.fotografias.findMany({
      where: { id_negocio },
    });

    // Eliminar las fotos de Vercel Blob
    for (const foto of fotos) {
      if (foto.url_foto) {
        await del(foto.url_foto).catch(() => {});
      }
    }

    // Eliminar los registros de fotografías
    await prisma.fotografias.deleteMany({
      where: { id_negocio },
    });

    // Eliminar el logo de Vercel Blob
    if (url) await del(url);

    // Eliminar el negocio
    await prisma.dir_verde.delete({
      where: { id_negocio },
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return {
          ok: false,
          message: 'No puedes eliminar este negocio porque tiene elementos asociados a el.',
        };
      }
    }
    return {
      ok: false,
      message: 'Error al eliminar el negocio.',
    };
  }
}

export async function EditarNegocio(formData: FormData, id_negocio:number) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error('API key no configurada');
  }

  const negocio = formData.get('negocio') as string;
  const id_grupo = formData.get('id_grupo') as unknown;
  const id_fase = formData.get('id_fase') as unknown;
  const unidad_productiva = formData.get('unidad_productiva') as string;
  const descripcion = formData.get('descripcion') as string;
  const actividad = formData.get('actividad') as string;
  const sub_categoria = formData.get('sub_categoria') as string;
  const zona = formData.get('zona') as string;
  const municipio = formData.get('municipio') as string;
  const direccion = formData.get('direccion') as string;
  const representante = formData.get('representante') as string;
  const whatsup = formData.get('whatsup') as string;
  const correo = formData.get('correo') as string;
  const url_negocio = formData.get('url_negocio') as string;
  const url_youtube = formData.get('url_youtube') as string;
  const url_facebook = formData.get('url_facebook') as string;
  const url_instagram = formData.get('url_instagram') as string;
  const url_tiktok = formData.get('url_tiktok') as string;
  const estado = formData.get('estado') as string;
  const a_o_verificacion = formData.get('a_o_verificacion') as string;
  const autorizado_por = formData.get('autorizado_por') as string;

  if (
    !id_negocio ||
    !negocio ||
    !id_grupo ||
    !actividad ||
    !zona ||
    !municipio ||
    !direccion ||
    !correo
  ) {
    return {
      ok: false,
      message: 'Datos incompletos',
    };
  }

  try {
    const negocioExistente = await prisma.dir_verde.findUnique({
      where: { id_negocio: Number(id_negocio) },
    });

    if (!negocioExistente) {
      return {
        ok: false,
        message: 'Negocio no encontrado',
      };
    }

    let pos_gps = negocioExistente.pos_gps;
    const direccionHaCambiado = direccion !== negocioExistente.direccion;

    if (direccionHaCambiado) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          direccion,
        )}&key=${apiKey}`,
      );
      const dataApi: Maps = await response.json();
      if (!dataApi.results.length) {
        throw new Error('No se encontraron coordenadas');
      }

      const { lat, lng } = dataApi.results[0].geometry.location;
      pos_gps = `${lat},${lng}`;
    }

    await prisma.dir_verde.update({
      where: { id_negocio: Number(id_negocio) },
      data: {
        negocio,
        actividad,
        sub_categoria,
        correo,
        direccion,
        municipio,
        zona,
        a_o_verificacion: new Date(a_o_verificacion).toISOString(),
        autorizado_por,
        descripcion,
        whatsup,
        url_youtube,
        url_tiktok,
        url_negocio,
        url_instagram,
        url_facebook,
        unidad_productiva,
        representante,
        pos_gps,
        id_grupo: Number(id_grupo),
        id_fase: Number(id_fase),
        estado,
      },
    });

    return {
      ok: true,
      message: 'Negocio actualizado correctamente',
    };
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          ok: false,
          message: 'Correo ya registrado',
        };
      }
    }

    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    }

    return {
      ok: false,
      message: 'Error inesperado al actualizar negocio',
    };
  }
}
