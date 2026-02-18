'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GrupoEditarSchema } from '../../../../schemas/GrupoSchema';
import { z } from 'zod';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import type { GruposEditar } from '@/types/gruposType';

type Inputs = z.infer<typeof GrupoEditarSchema>;

type EditarGrupo = {
  actividad: string;
};

type ApiError = {
  response?: {
    status: number;
    data: {
      success: boolean;
      message: string;
    };
  };
};

export default function ActualizarGrupo() {
  const queryCliente = useQueryClient();
  const params = useParams();
  const router = useRouter();

  const id_grupo = params.id_grupo;

  const { data } = useQuery<GruposEditar>({
    queryKey: ['grupos', 'ActualizarGrupo', id_grupo],
    queryFn: async () => {
      const res = await axios(`https://api-base-de-datos.vercel.app/grupos/${id_grupo}`);
      return res.data;
    },
    enabled: !!id_grupo,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const ActualizarGrupo = useMutation({
    mutationFn: async (data: EditarGrupo) => {
      await axios.put(`https://api-base-de-datos.vercel.app/grupos/${id_grupo}`, data);
    },

    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ['grupos'] });
      router.back();
    },
    onError: (error: ApiError) => {
      if (error?.response) {
        toast.error(error.response.data.message);
      }
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.promise(
      () =>
        ActualizarGrupo.mutateAsync({
          actividad: `${data.nombre}:${data.actividad}`,
        }),
      {
        loading: 'Actualizando grupo...',
        success: 'Grupo Actualizado correctamente',
      },
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(GrupoEditarSchema),
    mode: 'onChange',
  });

  setValue(
    'nombre',
    `${ActualizarGrupo.isPending ? 'cargando...' : data?.data.actividad.split(':')[0]}`,
  );
  setValue(
    'actividad',
    `${ActualizarGrupo.isPending ? 'cargando...' : data?.data.actividad.split(':')[1]}`,
  );

  return (
    <form
      className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 mb-6 shadow-sm m-10 flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="size-6"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.1 9.1 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031q0 .338-.037.666A11.94 11.94 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6 6 0 0 1 6 18.719m12 0a5.97 5.97 0 0 0-.941-3.197m0 0A6 6 0 0 0 12 12.75a6 6 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 9 9 0 0 0 3.74.477m.94-3.197a5.97 5.97 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0m6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0m-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold">Grupo</h3>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="size-6"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.1 9.1 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031q0 .338-.037.666A11.94 11.94 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6 6 0 0 1 6 18.719m12 0a5.97 5.97 0 0 0-.941-3.197m0 0A6 6 0 0 0 12 12.75a6 6 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 9 9 0 0 0 3.74.477m.94-3.197a5.97 5.97 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0m6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0m-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0"
            />
          </svg>
          Guardar Cambios
        </button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="nombre"
          >
            Nombre del grupo
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            type="text"
            placeholder="Accion Climatica"
            id="nombre"
            {...register('nombre')}
          />
          {errors.nombre?.message && <p>{errors.nombre.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="actividad"
          >
            Actividad del grupo
          </label>
          <textarea
            rows={3}
            id="actividad"
            placeholder="Accion Climatica"
            {...register('actividad')}
            className="w-full px-4 py-2.5 min-h-20 max-h-28 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
          ></textarea>
          
          {errors.actividad?.message && <p>{errors.actividad.message}</p>}
        </div>
      </div>
    </form>
  );;
}
