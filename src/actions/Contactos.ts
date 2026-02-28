'use server';
import prisma from '@/lib/prisma';
import { Prisma } from '../../generated/prisma/client';

export async function ConseguirContacto(id_contacto: number) {
  const contacto = await prisma.contactos.findFirst({
    where: {
      id_contacto,
    },
  });
  return contacto;
}

export async function CrearContacto(data: { nombre: string; telefono: string; correo?: string, id_negocio: number }) {
  try {
    await prisma.contactos.create({
      data: data,
    });

    return {
      ok: true,
      message: 'Contacto creado correctamente',
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          ok: false,
          message: 'Teléfono o correo ya registrado',
        };
      }
    }

    return {
      ok: false,
      message: 'Error al crear contacto',
    };
  }
}

export async function EditarContacto(
  id_contacto: number,
  data: {
    nombre?: string;
    telefono?: string;
    correo?: string;
  },
) {
  try {
    await prisma.contactos.update({
      where: { id_contacto },
      data,
    });

    return { ok: true, message: 'Contacto actualizado correctamente' };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          ok: false,
          message: 'El teléfono o correo ya pertenece a otro contacto',
        };
      }

      if (error.code === 'P2025') {
        return {
          ok: false,
          message: 'El contacto no existe',
        };
      }
    }

    return {
      ok: false,
      message: 'Error inesperado al actualizar contacto',
    };
  }
}
