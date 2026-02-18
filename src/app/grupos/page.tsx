import { CuerpoGrupos } from "@/components/CuerpoGrupos";
import Link from "next/link";
import { obtenerGrupos } from "@/actions/grupos";

export default async function Grupos() {
  const grupos = await obtenerGrupos()
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
          <CuerpoGrupos grupos={grupos}/>
        </div>
      </div>
    );
}
