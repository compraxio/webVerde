import prisma from '@/lib/prisma';


export default async function Fase() {
  const fases = await prisma.fases.findMany();

  return (
    <>
      <div className="p-6 lg:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1">Fases</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Estas son las fases disponibles en que tu negocio puede estar
            </p>
          </div>
        </div>
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          <div className="space-y-4">
            {fases.map((g) => (
              <div
                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-6 hover:shadow-md transition-all group"
                key={g.id_fase}
              >
                <img
                  src={g.logo_fase}
                  alt={g.id_fasex ?? ''}
                  className="bg-cover w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white">{g.id_fasex}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm max-md:line-clamp-1">
                    {g.des_fase}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
