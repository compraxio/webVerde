

import prisma from '@/lib/prisma';

export async function ApoyoNegocios() {
  const negocios = await prisma.dir_verde.findMany()

  return (
    <div className="bg-secondary/10 dark:bg-secondary/5 p-4 rounded-2xl border border-secondary/20">
      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
        Impacto Ambiental
      </p>
      <p className="text-sm text-slate-600 dark:text-gray-300">
        {negocios.length > 0 &&
          `estas apoyando a ${negocios.length} negocios`}

        {negocios.length === 0 && 'No apoyas a ningun negocio'}
      </p>
    </div>
  );
}
