import { Metadata } from 'next';
import prisma from '@/lib/prisma';

import { CuerpoMunicipios } from '@/components/CuerpoMunicipios';
import {
  BotonAgregarMunicipio,
  SeccionAccionesMunicipiosTabla,
} from '@/components/Admin/MunicipiosAuth';
import Link from 'next/link';
import { Suspense } from 'react';
import { CuerpoMunicipiosEsqueleto } from '@/components/esqueletons/CuerpoMunicipiosEsqueleto';
import { Button } from '@/components/ui/button';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ zona: string }>;
}): Promise<Metadata> => {
  const { zona } = await params;
  const zonaFormateada = zona === 'todos' ? 'Todos los Municipios' : zona;

  return {
    title: `${zonaFormateada} | Negocios Verdes Cardique`,
    description: `Negocios verdes en ${zonaFormateada}. Encuentra empresas sostenibles en este municipio de la jurisdicción de Cardique.`,
    openGraph: {
      title: `Negocios Verdes en ${zonaFormateada}`,
      description: `Directorio de negocios ecológicos en ${zonaFormateada}, Cardique.`,
    },
  };
};

export default async function Municipio({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ zona: string }>;
  searchParams: Promise<{ page?: string }>;
}>) {
  const { zona } = await params;
  const { page } = await searchParams;
  const pageNumber = parseInt(page || '1');
  const pageSize = 8;
  const skip = (pageNumber - 1) * pageSize;
  const total = await prisma.municipios.count()
  const totalPages = Math.ceil(total / pageSize);
  const zonaMayus = zona.toUpperCase().trim();

  return (
    <>
      <div className="flex-1 flex overflow-hidden">
        <aside className="flex flex-col items-center h-full border-r border-slate-200 dark:border-zinc-800 p-6 shrink-0 bg-white/50 dark:bg-background-dark">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
            Zonas
          </h3>
          <div className="space-y-2">
            <Link
              className="w-full flex items-center justify-between px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
              href="/municipios/todos"
            >
              <span>Todos</span>
            </Link>
            <Link
              className="w-full flex items-center justify-between px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
              href="/municipios/norte"
            >
              <span>Norte</span>
            </Link>
            <Link
              className="w-full flex items-center justify-between px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
              href="/municipios/centro"
            >
              <span>Centro</span>
            </Link>
            <Link
              className="w-full flex items-center justify-between px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
              href="/municipios/sur"
            >
              <span>Sur</span>
            </Link>
          </div>
        </aside>
        <section className="flex-1 flex flex-col min-w-0 bg-white dark:bg-background-dark">
          <div className="p-6 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Municipios</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Administración territorial de negocios verdes
              </p>
            </div>
            <BotonAgregarMunicipio />
          </div>
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-slate-50 dark:bg-zinc-900 z-10">
                <tr className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-zinc-800">
                  <th className="px-6 py-4">Municipio</th>
                  <th className="px-6 py-4">Zona</th>
                  <th className="px-6 py-4">Departamento</th>
                  <th className="px-6 py-4 text-right">Código</th>
                  <SeccionAccionesMunicipiosTabla />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                <Suspense fallback={<CuerpoMunicipiosEsqueleto />}>
                  <CuerpoMunicipios zona={zonaMayus} skip={skip} pageSize={pageSize} />
                </Suspense>
              </tbody>
            </table>
          </div>
        </section>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 pt-4 border-t">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Página {pageNumber} de {totalPages} ({total} municipios)
          </div>
          <div className="flex gap-2">
            {pageNumber > 1 && (
              <Link href={`/municipios/${zona}?page=${pageNumber - 1}`}>
                <Button variant="outline" size="sm">
                  Anterior
                </Button>
              </Link>
            )}
            {pageNumber < totalPages && (
              <Link href={`/municipios/${zona}?page=${pageNumber + 1}`}>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
