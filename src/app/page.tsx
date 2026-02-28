import { TargetaNegocios } from '@/components/targetaNegocios';

import prisma from '@/lib/prisma';
import {
  BotonAgregarNegocio,
  BotonAgregarNegocioCel,
  BotonAgregarNegocioTargeta,
} from '@/components/Admin/NegociosAuth';
import { CuerpoNegocio } from '@/components/CuerpoNegocio';

export default async function Home() {
  const negocios = await prisma.dir_verde.findMany();
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Directorio de Negocios Verdes</h2>
          <p className="text-slate-500 dark:text-slate-400 italic">
            Empresas que impactan positivamente la naturaleza en la jurisdicción de Cardique.
          </p>
        </div>

        <BotonAgregarNegocio />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <TargetaNegocios />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <CuerpoNegocio negocios={negocios} />
        <BotonAgregarNegocioTargeta />
      </div>
      {/* Boton add en cel*/}
      <BotonAgregarNegocioCel />
    </div>
  );
}
