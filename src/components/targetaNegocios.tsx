import prisma from '@/lib/prisma';


export async function TargetaNegocios() {
  const negocios = await prisma.dir_verde.findMany();
  return (
    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800">
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Negocios</p>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-bold">{negocios.length}</h3>
      </div>
    </div>
  );
}
