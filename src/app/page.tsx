import { CuerpoNegocio } from '@/components/CuerpoNegocio';
import { TargetaNegocios } from '@/components/targetaNegocios';
import Link from 'next/link';
import { MdAddBusiness } from 'react-icons/md';

export default function Home() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Directorio de Negocios Verdes</h2>
          <p className="text-slate-500 dark:text-slate-400 italic">
            Empresas que impactan positivamente la naturaleza en la jurisdicción de Cardique.
          </p>
        </div>
        <Link
          href="/crearNegocio"
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all"
        >
          <MdAddBusiness size={25} />
          Registrar Negocio
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <TargetaNegocios />
      </div>
      {/* <div className="flex flex-wrap items-center gap-3 mb-6">
        <button className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-zinc-800">
          <span className="material-icons text-sm">filter_list</span>
          Filtrar por Categoría
        </button>
        <button className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-zinc-800">
          <span className="material-icons text-sm">sort</span>
          Ordenar por Nivel
        </button>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <CuerpoNegocio />
        <Link
          href="/crearNegocio"
          className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-white dark:hover:bg-zinc-900 hover:border-primary/50 transition-all cursor-pointer min-h-100"
        >
          <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center text-slate-400 text-3xl">
            <MdAddBusiness />
          </div>
          <div>
            <p className="font-bold text-slate-800 dark:text-white">Añadir Nueva Empresa</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Inicia el proceso de certificación y registro en el directorio.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
