'use server';
import prisma from '@/lib/prisma';
import { Prisma } from '../../generated/prisma/client';

export async function ConseguirMunicipio(cod_munic: number) {
  const Municipio = await prisma.municipios.findFirst({
    where: {
      cod_munic,
    },
  });
  return Municipio;
}

export async function CrearMunicipio(data: {
  departamento: string;
  zona: string;
    municipio: string;
  cod_munic: number
}) {
  try {
    await prisma.municipios.create({
      data: data,
    });
    return {
      ok: true,
      message: 'Municipio creado correctamente',
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          ok: false,
          message: 'Este municipio ya existe',
        };
      }

      return {
        ok: false,
        message: 'Error al crear Municipio',
      };
    }
  }
}

export async function EditarMunicipio(
  cod_munic: number,
  data: { departamento?: string; zona?: string; municipio?: string, codigo_muni?: number },
) {
  try {
    await prisma.municipios.update({
      where: { cod_munic },
      data: {
        departamento: data.departamento,
        cod_munic: data.codigo_muni,
        municipio: data.municipio,
        zona: data.zona
      }
    });
    return { ok: true, message: 'Municipio actualizado correctamente' };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          ok: false,
          message: 'Este municipio ya existe',
        };
      }

      if (error.code === 'P2025') {
        return {
          ok: false,
          message: 'El municipio no existe',
        };
      }
    }

    return {
      ok: false,
      message: 'Error inesperado al actualizar municipio',
    };
  }
}
