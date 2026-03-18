import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { CuerpoMunicipios } from '@/components/CuerpoMunicipios';
import { BotonAgregarMunicipio } from '@/components/Admin/MunicipiosAuth';
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
  const pageSize = 9;
  const skip = (pageNumber - 1) * pageSize;
  const total = await prisma.municipios.count();
  const totalPages = Math.ceil(total / pageSize);
  const zonaMayus = zona.toUpperCase().trim();
  // Obtener conteos por zona
  const [norteCount, centroCount, surCount] = await Promise.all([
    prisma.municipios.count({ where: { zona: 'NORTE' } }),
    prisma.municipios.count({ where: { zona: 'CENTRO' } }),
    prisma.municipios.count({ where: { zona: 'SUR' } }),
  ]);
  const zonas = ['todos', 'norte', 'centro', 'sur'] as const;
  const zonaLabels: Record<string, string> = {
    todos: 'Todos',
    norte: 'Norte',
    centro: 'Centro',
    sur: 'Sur',
  };
  const zonaCounts: Record<string, number> = {
    todos: total,
    norte: norteCount,
    centro: centroCount,
    sur: surCount,
  };
  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
      {/* Sidebar de Zonas */}
      <aside className="lg:w-64 border-b lg:border-b-0 lg:border-r border-border p-6 shrink-0">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
          Zonas
        </h3>
        <nav className="space-y-1">
          {zonas.map((z) => {
            const isActive = zona === z;
            return (
              <Link
                key={z}
                href={`/municipios/${z}`}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-muted-foreground hover:bg-accent'
                }`}
              >
                <span>{zonaLabels[z]}</span>
                <span
                  className={`text-xs ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}
                >
                  {zonaCounts[z]}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
      {/* Contenido Principal */}
      <section className="flex-1 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-card-foreground">Municipios</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {zona === 'todos'
                ? `${total} municipios en la jurisdicción de Cardique`
                : `${zonaCounts[zona] || 0} municipios en la zona ${zonaLabels[zona] || zona}`}
            </p>
          </div>
          <BotonAgregarMunicipio />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense
            fallback={Array.from({ length: 6 }).map((_, i) => (
              <CuerpoMunicipiosEsqueleto key={i} />
            ))}
          >
            <CuerpoMunicipios zona={zonaMayus} skip={skip} pageSize={pageSize} />
          </Suspense>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Página {pageNumber} de {totalPages}
            </p>
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
      </section>
    </div>
  );
}
