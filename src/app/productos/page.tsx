import { CuerpoProductos } from "@/components/CuerpoProductos";
import Link from "next/link";
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
        <Link
          href="/productos/crear"
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="size-6" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
          Agregar Producto
        </Link>
      </div>
      <hr className="mb-8"></hr>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CuerpoProductos />
      </div>
    </div>
  );
}
