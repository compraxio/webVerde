
import { CuerpoContactos } from '@/components/CuerpoContactos';
import Link from 'next/link';

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
        <Link href="/contactos/crear" className="bg-primary hover:bg-primary/90 text-background-dark font-bold px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="size-6" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0M3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.3 12.3 0 0 1 9.374 21C7.043 21 4.862 20.355 3 19.234Z"/></svg>

          Agregar Contacto
        </Link>
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
