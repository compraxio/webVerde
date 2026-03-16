'use server';
import prisma from '@/lib/prisma';

export async function obtenerTodosFases() {
  const fases = await prisma.fases.findMany();

  return fases;
}
