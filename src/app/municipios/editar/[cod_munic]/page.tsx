'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MunicipiosEditarSchema } from '../../../../schemas/MunicipiosSchema';
import { z } from 'zod';
import { useRouter, useParams } from 'next/navigation';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { MunicipiosEditar } from '@/types/municipiosType';

type Inputs = z.infer<typeof MunicipiosEditarSchema>;

type EditarMunicipio = {
  cod_munic: number;
  departamento: string;
  zona: string;
  municipio: string;
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

export default function EditarMunicipio() {
  const queryCliente = useQueryClient();
  const router = useRouter();

  const params = useParams();
  const cod_munic = params.cod_munic;

  const { data, isPending } = useQuery<MunicipiosEditar>({
    queryKey: ['actualizarContacto', cod_munic],
    queryFn: async () => {
      const res = await axios(`https://api-base-de-datos.vercel.app/municipios/${cod_munic}`);
      return res.data;
    },
    enabled: !!cod_munic,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const crearContacto = useMutation({
    mutationFn: async (data: EditarMunicipio) => {
      await axios.put(`https://api-base-de-datos.vercel.app/municipios/${cod_munic}`, data);
    },

    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ['contactos'] });
      router.back();
    },

    onError: (error: ApiError) => {
      if (error?.response) {
        toast.error(error.response.data.message);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(MunicipiosEditarSchema),
    mode: 'onChange',
  });

  setValue('cod_munic', `${data?.data.cod_munic}`);
  setValue('departamento', `${data?.data.departamento}`);
  setValue('zona', (data?.data?.zona ?? 'NORTE') as 'NORTE' | 'SUR' | 'CENTRO');
  setValue('municipio', `${data?.data.municipio}`);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.promise(
      () =>
        crearContacto.mutateAsync({
          cod_munic: Number(data.cod_munic),
          departamento: data.departamento,
          zona: data.zona,
          municipio: data.municipio,
        }),
      {
        loading: 'Actualizando municipio...',
        success: 'Municipio Actualizado correctamente',
      },
    );
  };

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
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.04 12.04 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold">Contacto</h3>
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
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0M3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.3 12.3 0 0 1 9.374 21C7.043 21 4.862 20.355 3 19.234Z"
            />
          </svg>
          Guardar Cambios
        </button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="cod_munic"
          >
            Codigo del Municipio
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            type="number"
            placeholder={isPending ? 'cargando...' : '13006'}
            id="cod_munic"
            {...register('cod_munic')}
          />
          {errors.cod_munic?.message && <p>{errors.cod_munic.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="departamento"
          >
            Departamento
          </label>
          <div className="flex gap-6 ">
            <input
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
              type="text"
              placeholder={isPending ? 'cargando...' : 'BOLIVAR'}
              id="departamento"
              {...register('departamento')}
            />
          </div>
          {errors.departamento?.message && <p>{errors.departamento.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="zona"
          >
            zona
          </label>
          <select
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            id="zona"
            {...register('zona')}
          >
            <option value="NORTE">NORTE</option>
            <option value="SUR">SUR</option>
            <option value="CENTRO">CENTRO</option>
          </select>

          {errors.zona?.message && <p>{errors.zona.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="municipio"
          >
            municipio
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            type="text"
            placeholder={isPending ? 'cargando....' : 'ACHI'}
            id="municipio"
            {...register('municipio')}
          />
          {errors.municipio?.message && <p>{errors.municipio.message}</p>}
        </div>
      </div>
    </form>
  );
}
