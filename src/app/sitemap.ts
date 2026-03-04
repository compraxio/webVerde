import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://web-verde.vercel.app/';

  // Rutas estáticas
  const staticRoutes = [
    '',
    '/contactos/0',
    '/municipios/todos',
    '/productos/0',
    '/grupos',
    '/mapa',
    '/fotografias',
    '/eventos/Activo',
    '/auth',
  ];
  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  // Rutas dinámicas de negocios
  const negocios = await prisma.dir_verde.findMany({
    select: { id_negocio: true },
  });
  const negocioUrls = negocios.map((negocio) => ({
    url: `${baseUrl}/verPerfilNegocio/${negocio.id_negocio}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  return [...staticUrls, ...negocioUrls];
}
