import { CuerpoProductos } from "@/components/CuerpoProductos";

export default function Productos() {
  return (
    <div className="flex-1 overflow-auto custom-scrollbar p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Productos</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Gestiona el catálogo de productos de los negocios verdes
          </p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all">
          {/*<span className="material-symbols-outlined">add</span>*/}
          Agregar Producto
        </button>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <h3 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-sm">
          ASOAGROPAT
        </h3>
        <span className="bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 text-[11px] px-2 py-0.5 rounded-full font-bold">
          7
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CuerpoProductos />
      </div>
    </div>
  );
}
