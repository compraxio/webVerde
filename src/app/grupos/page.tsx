import { CuerpoGrupos } from "@/components/CuerpoGrupos";
import Link from "next/link";
export default function Grupos() {
    return (
      <div className="p-6 lg:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1">Grupos</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Organiza y gestiona las categorías de negocios verdes.
            </p>
          </div>
          <Link href='/grupos/crear' className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all">
            {/* <span className="material-symbols-outlined">add</span> */}
            Agregar Grupo
          </Link>
        </div>
        <hr className="mb-8"></hr>

        <div className="space-y-4">
          <CuerpoGrupos/>
        </div>
        {/* <div className="mt-12 flex items-center justify-between border-t border-slate-200 dark:border-zinc-800 pt-8">
          <p className="text-sm text-slate-500 dark:text-slate-400">Mostrando 5 de 5 grupos en total</p>
          <div className="flex items-center gap-2">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-800 disabled:opacity-50"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-medium shadow-sm">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div> */}
      </div>
    );
}
