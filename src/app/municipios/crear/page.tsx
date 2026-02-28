'use client';

import { PiCity } from 'react-icons/pi';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MunicipiosSchema } from '../../../schemas/MunicipiosSchema';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { CrearMunicipio } from '@/actions/Municipios';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/AuthStore';
type Inputs = z.infer<typeof MunicipiosSchema>;

export default function CrearMuni() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para crear un municipio');
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(MunicipiosSchema),
    mode: 'onChange',
  });

  if (!isAuthenticated) return null;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.promise(
      CrearMunicipio({
        departamento: data.departamento,
        municipio: data.municipio,
        zona: data.zona,
        cod_munic: Number(data.cod_munic),
      }),
      {
        loading: 'Creando Municipio',
        success: (res) => {
          if (!res?.ok) throw new Error(res?.message);
          router.refresh();
          router.back();
          return res.message;
        },
        error: (err) => {
          return err.message || 'Error al crear Municipio';
        },
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
            <PiCity size={25} />
          </div>
          <h3 className="text-lg font-bold">Municipio</h3>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="cod_munic"
          >
            Codigo del Municipio<span className="text-red-500">*</span>
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            type="number"
            placeholder="Ej:13006"
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
            Departamento<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6 ">
            <input
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
              type="text"
              placeholder="Ej:BOLIVAR"
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
            zona<span className="text-red-500">*</span>
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
            municipio<span className="text-red-500">*</span>
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            type="text"
            placeholder="Ej:ACHI"
            id="municipio"
            {...register('municipio')}
          />
          {errors.municipio?.message && <p>{errors.municipio.message}</p>}
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md"
        >
          <PiCity size={25}/>
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}
