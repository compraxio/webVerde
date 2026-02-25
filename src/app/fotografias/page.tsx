import prisma from '@/lib/prisma';

export default async function Fotografias() {
  const fotos = await prisma.fotografias.findMany({
    include: {
      dir_verde: true,
    },
  });
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Fotos</h2>
          <p className="text-slate-500 dark:text-slate-400 italic">
            Gestión de imágenes de negocios verdes y paisajes de la jurisdicción.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {fotos.map((f) => (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden group shadow-sm hover:shadow-md transition-all" key={f.id_foto}>
            <div className="aspect-video overflow-hidden relative">
              <img
                alt={f.dir_verde.negocio}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={f.url_foto ?? ''}
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <h4 className="font-medium text-sm text-slate-800 dark:text-white truncate pr-2">
                {f.dir_verde.negocio}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
