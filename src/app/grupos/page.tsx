import { CuerpoGrupos } from "@/components/CuerpoGrupos";
import { obtenerTodosGrupos } from "@/actions/Grupos";
import { BotonAgregarGrupo, BotonAgregarGrupoCel } from "@/components/Admin/GruposAuth";

export default async function Grupos() {
  const grupos = await obtenerTodosGrupos()
    return (
      <div className="p-6 lg:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1">Grupos</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Organiza y gestiona las categorías de negocios verdes.
            </p>
          </div>
          <BotonAgregarGrupo />
        </div>
        <hr className="mb-8"></hr>

        <div className="space-y-4">
          <CuerpoGrupos grupos={grupos} />
        </div>
        {/* Boton add en cel*/}
        <BotonAgregarGrupoCel />
      </div>
    );
}
