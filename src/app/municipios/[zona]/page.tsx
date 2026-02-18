import { CuerpoMunicipios } from "@/components/CuerpoMunicipios";
import  Link from "next/link"
export default function Municipio() {
  return (
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
          <Link
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all text-sm"
            href="/municipios/crear"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="size-6"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Agregar Municipio
          </Link>
        </div>
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 dark:bg-zinc-900 z-10">
              <tr className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-zinc-800">
                <th className="px-6 py-4">Municipio</th>
                <th className="px-6 py-4">Zona</th>
                <th className="px-6 py-4">Departamento</th>
                <th className="px-6 py-4 text-right">Código</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
              <CuerpoMunicipios />
            </tbody>
          </table>
        </div>
      </section>
      {/*<aside className="w-80 border-l border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex-shrink-0 flex flex-col">

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase">
            CLEMENCIA
          </h3>
          <div className="flex gap-1">
            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded text-slate-400">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded text-slate-400">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded text-slate-400">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
        <div className="space-y-6 flex-1 overflow-auto custom-scrollbar">
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Municipio
              </span>
              <span className="text-sm font-medium">CLEMENCIA</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Código
              </span>
              <span className="text-sm font-medium">13.222</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Departamento
              </span>
              <span className="text-sm font-medium">BOLIVAR</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Zona
              </span>
              <span className="text-sm font-medium">NORTE</span>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-100 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Negocios Verdes Relacionados
              </h4>
              <span className="text-[10px] bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-slate-500">
                0
              </span>
            </div>
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 dark:border-zinc-800 rounded-2xl">
              <span className="material-symbols-outlined text-slate-200 dark:text-zinc-800 text-4xl mb-2">
                eco
              </span>
              <p className="text-xs text-slate-400 italic">No hay negocios registrados</p>
            </div>
            <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-primary hover:bg-primary/5 rounded-lg border border-primary/20 transition-all">
              <span className="material-symbols-outlined text-sm">add</span>
              Vincular Negocio
            </button>
          </div>
        </div>
        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-zinc-800 flex gap-2">
          <button className="flex-1 py-2 text-xs font-bold bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-xl transition-all">
            Editar Información
          </button>
        </div>
      </aside>*/}
    </div>
  );
}
