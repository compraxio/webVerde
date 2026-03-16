import Link from 'next/link';
import prisma from '@/lib/prisma';

import { CuerpoEventos } from '@/components/CuerpoEventos';
import { BotonAgregarEvento } from '@/components/Admin/EventosAuth';

export default async function EventosPage({ params }: Readonly<{ params: Promise<{ Estado: string }> }>) {
  const { Estado } = await params;
  const todosEventos = await prisma.eventos.findMany();

  const eventos = todosEventos.filter((e) => e.estado === Estado);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">Eventos</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Administra las ferias y talleres de negocios verdes.
          </p>
        </div>
        <BotonAgregarEvento />
      </div>
      <div className="flex items-center gap-8 border-b border-slate-200 dark:border-zinc-800 mb-8 ">
        <Link
          href="/eventos/Activo"
          className={`pb-4 px-2 tab-active flex items-center gap-2 ${Estado === 'Activo' ? 'text-primary' : 'text-slate-500 dark:text-slate-400'} hover:text-primary transition-colors`}
        >
          Activos
          <span className="px-2 py-0.5 text-xs bg-primary/10 rounded-full">
            {todosEventos.filter((e) => e.estado === 'Activo').length}
          </span>
        </Link>
        <Link
          href="/eventos/Inactivo"
          className={`pb-4 px-2 ${Estado === 'Inactivo' ? 'text-primary' : 'text-slate-500 dark:text-slate-400'} hover:text-primary transition-colors flex items-center gap-2`}
        >
          Inactivos
          <span className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-zinc-800 rounded-full">
            {todosEventos.filter((e) => e.estado === 'Inactivo').length}
          </span>
        </Link>
      </div>
      <div className="space-y-4">
        <CuerpoEventos eventos={eventos} />
      </div>

      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <button className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
}
