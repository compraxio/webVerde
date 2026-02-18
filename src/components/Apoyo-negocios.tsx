

import type { DirVerde } from '@/types/dir_verdeType';

export async function ApoyoNegocios() {
  const response = await fetch('https://api-base-de-datos.vercel.app/dir_verde', {
    next: { revalidate: 30 }
  });
  if (!response.ok) {
    throw new Error('La peticion fallo');
  }
  const data: DirVerde = await response.json();

  return (
    <div className="bg-secondary/10 dark:bg-secondary/5 p-4 rounded-2xl border border-secondary/20">
      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
        Impacto Ambiental
      </p>
      <p className="text-sm text-slate-600 dark:text-gray-300">
        {Object.keys(data.data).length > 0 &&
          `estas apoyando a ${Object.keys(data.data).length} negocios`}

        {Object.keys(data.data).length === 0 && 'No apoyas a ningun negocio'}
      </p>
    </div>
  );
}
