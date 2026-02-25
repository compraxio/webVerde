import { CuerpoContactos } from '@/components/CuerpoContactos';
import { BotonAgregar, SeccionAcciones } from '@/components/Admin/ContactosAuth';

export default function Contactos() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Directorio de Contactos
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Gestiona la red de contactos vinculada a los Negocios Verdes.
          </p>
        </div>

        <BotonAgregar />
      </div>
      <hr className="mb-8"></hr>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Nombre Completo
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Correo Electrónico
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Teléfono
                </th>
                <SeccionAcciones />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <CuerpoContactos />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
