'use client';

import type { DirVerde } from '@/types/dir_verdeType';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from './ui/skeleton';
import axios from 'axios';


export function TargetaNegocios() {
  const { data, isPending } = useQuery<DirVerde>({
    queryKey: ['negocios'],
    queryFn: async () => {
      const res = await axios('https://api-base-de-datos.vercel.app/dir_verde/');
      return res.data;
    },
  });

    if (isPending) {
        return <Skeleton className="rounded-2xl min-h-28 min-w-45.75" />;
    }

  return (
      <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
          Total Negocios
        </p>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold">{data?.data.length}</h3>
        </div>
      </div>
  );
}
