import { BotonAgregarProducto, BotonAgregarProductoCel } from '@/components/Admin/ProductosAuth';
import { CuerpoProductos } from '@/components/CuerpoProductos';

export default async function Productos({ params }: Readonly<{ params: Promise<{ id_negocio: string }> }>) {
  const { id_negocio } = await params;
  const negocio = Number(id_negocio);
  return (
    <div className="flex-1 overflow-auto custom-scrollbar p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Productos</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Gestiona el catálogo de productos de los negocios verdes
          </p>
        </div>
        <BotonAgregarProducto />
      </div>
      <hr className="mb-8"></hr>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CuerpoProductos negocio={negocio} />
      </div>
      {/* Boton add en cel*/}
      <BotonAgregarProductoCel />
    </div>
  );
}
