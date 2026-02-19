'use server';

import prisma from '@/lib/prisma';
import { del, put } from '@vercel/blob';

export async function ConseguirProducto(id_prodcucto: number) {
  const producto = await prisma.productos.findFirst({
    where: {
      id_prodcucto,
    },
  });
  return producto;
}

export async function CrearProducto(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const descripcion = formData.get('descripcion') as string;
  const precio = formData.get('precio') as unknown;
  const img_prodcto = formData.get('img_prodcto') as File;

  if (!nombre || !img_prodcto || !precio) {
    return {
      ok: false,
      message: 'Datos incompletos',
    };
  }

  let blobUrl: string | null = null;

  try {
    const blob = await put(`productos/${crypto.randomUUID()}`, img_prodcto, { access: 'public' });

    blobUrl = blob.url;

    await prisma.productos.create({
      data: {
        nombre,
        descripcion,
        precio: Number(precio),
        img_prodcto: blobUrl
      }
    });

    return {
      ok: true,
      message: 'Producto creado correctamente',
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
      message: 'Error inesperado al crear producto',
    };
  }
}

export async function EditarProducto(
  id_prodcucto: number,
  nombre: string,
  descripcion: string,
  precio: number,
) {
  try {
    await prisma.productos.update({
      where: {
        id_prodcucto,
      },
      data: {
        nombre,
        descripcion,
        precio: Number(precio)
      },
    });

    return {
      ok: true,
      message: 'Producto editado correctamente',
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    }

    return {
      ok: false,
      message: 'Error inesperado al editar producto',
    };
  }
}
