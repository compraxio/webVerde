
import { CuerpoContactos } from '@/components/CuerpoContactos';
import { Suspense } from 'react';

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
        <button className="bg-primary hover:bg-primary/90 text-background-dark font-bold px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
          {/*<span className="material-icons text-lg">person_add</span>*/}
          <span>Agregar Contacto</span>
        </button>
      </div>
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
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <CuerpoContactos />
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Mostrando 1 a 4 de 24 contactos
          </p>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors disabled:opacity-50">
              <span className="material-icons text-sm">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded bg-primary text-background-dark font-bold text-xs flex items-center justify-center">
              1
            </button>
            <button className="w-8 h-8 rounded text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs flex items-center justify-center font-medium">
              2
            </button>
            <button className="w-8 h-8 rounded text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs flex items-center justify-center font-medium">
              3
            </button>
            <button className="p-1 rounded border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors">
              <span className="material-icons text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
