import { CuerpoNegocio } from "@/components/CuerpoNegocio";

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
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all">
          {/* <span className="material-icons">add</span> */}
          Registrar Negocio
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Negocios</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold">482</h3>
            <span className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded">+12%</span>
          </div>
        </div>
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
      <CuerpoNegocio/>
    </div>
  );
}
