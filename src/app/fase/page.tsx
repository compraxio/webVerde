'use client';

import type { Fase } from '@/types/faseType';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '../../components/ui/skeleton';
import axios from 'axios';

export default function Fase() {
  const { data, isPending } = useQuery<Fase>({
    queryKey: ['fase'],
    queryFn: async () => {
      const res = await axios('https://api-base-de-datos.vercel.app/fases/');
      return res.data;
    },
  });

  if (isPending) {
      return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          <div className="space-y-4">
            <Skeleton className="rounded-2xl min-h-26.5 min-w-193.25" />
            <Skeleton className="rounded-2xl min-h-26.5 min-w-193.25" />
            <Skeleton className="rounded-2xl min-h-26.5 min-w-193.25" />
            <Skeleton className="rounded-2xl min-h-26.5 min-w-193.25" />
            <Skeleton className="rounded-2xl min-h-26.5 min-w-193.25" />
            <Skeleton className="rounded-2xl min-h-26.5 min-w-193.25" />
          </div>
        </div>
      );
  }
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        {data?.data.map((g) => (
          <div
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-6 hover:shadow-md transition-all group"
            key={g.id_fase}
          >
            <img
              src={g.logo_fase}
              alt={g.id_fasex}
              className="bg-cover w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">{g.id_fasex}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-md:line-clamp-1">
                {g.des_fase}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
