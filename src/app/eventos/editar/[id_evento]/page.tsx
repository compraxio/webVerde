'use client';
import { useState, useEffect } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';

import { useAuthStore } from '@/store/AuthStore';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventoSchema } from '../../../../schemas/eventoSchema';
import type { EventoInput } from '../../../../schemas/eventoSchema';
import { AlertImage } from '@/components/alerts/alertImage';
import { IoMdAdd } from 'react-icons/io';
import { ConseguirEvento, CrearEvento, EditarEvento } from '@/actions/eventos';

export default function ActualizarEvento() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const params = useParams();

  const id_evento = Number(params.id_evento);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<EventoInput>({
    mode: 'onChange',
    resolver: zodResolver(eventoSchema),
  });

  useEffect(() => {
    function verificarAutenticacion() {
      if (!isAuthenticated) {
        toast.error('Debes iniciar sesión para editar un evento');
        router.push('/auth');
      }
    }
    async function cargarEvento() {
      const evento = await ConseguirEvento(id_evento);
      if (!evento) {
        toast.error('Evento no encontrado');
        router.refresh();
        router.back();
      }
      setValue('nombre', `${evento?.evento}`);
      setValue('direccion', `${evento?.direccion}`);
      setValue('fecha', `${evento?.fecha?.toISOString().split('T')[0]}`);
      setValue('hora', `${evento?.hora}`);
      setValue('link', `${evento?.link}`);
      setValue('tema', `${evento?.temas}`);
      setValue('tipo', `${evento?.tipo_evento}`);
      setValue('estado', evento?.estado as 'Activo' | 'Inactivo');
    }
    verificarAutenticacion();
    cargarEvento();
  }, [id_evento, setValue, router, isAuthenticated]);

  if (!isAuthenticated) return null;

  const onSubmit: SubmitHandler<EventoInput> = (data) => {
    toast.promise(
      async () => {
        const formData = new FormData();
        formData.append('nombre', data.nombre);
        if (getValues('fecha')) {
          formData.append('fecha', data.fecha ?? '');
        }
        formData.append('hora', data.hora);
        formData.append('direccion', data.direccion);
        formData.append('link', data.link || '');
        formData.append('tema', data.tema || '');
        formData.append('tipo', data.tipo || '');
        formData.append('estado', data.estado);

        const res = await EditarEvento(id_evento, formData);
        if (!res.ok) throw new Error(res.message);
        return res.message;
      },
      {
        loading: 'Actualizando evento',
        success: (msg) => {
          router.back();
          return msg;
        },
        error: (err) => err.message,
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
            <IoMdAdd size={25} />
          </div>
          <h3 className="text-lg font-bold">Evento</h3>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="nombre"
            >
              Nombre del evento<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
              type="text"
              placeholder="Ej:Accion Climatica"
              id="nombre"
              {...register('nombre')}
            />
            {errors.nombre?.message && <p>{errors.nombre.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="fecha"
            >
              Fecha del evento<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
              type="date"
              id="fecha"
              {...register('fecha')}
            />
            {errors.fecha?.message && <p>{errors.fecha.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="direccion"
            >
              Direccion del evento<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
              type="text"
              placeholder="Ej:Accion Climatica"
              id="direccion"
              {...register('direccion')}
            />
            {errors.direccion?.message && <p>{errors.direccion.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="hora"
            >
              Hora del evento<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
              type="time"
              id="hora"
              {...register('hora')}
            />
            {errors.hora?.message && <p>{errors.hora.message}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="Link"
          >
            Link del evento
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            type="text"
            id="Link"
            {...register('link')}
          />
          {errors.link?.message && <p>{errors.link.message}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="tema"
            >
              tema del evento
            </label>
            <input
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
              type="text"
              id="tema"
              {...register('tema')}
            />
            {errors.tema?.message && <p>{errors.tema.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="tipo"
            >
              tipo de evento
            </label>
            <input
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
              type="text"
              id="tipo"
              {...register('tipo')}
            />
            {errors.tipo?.message && <p>{errors.tipo.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="estado"
          >
            Estado del evento<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            id="estado"
            {...register('estado')}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          {errors.estado?.message && <p>{errors.estado.message}</p>}
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md"
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
    </form>
  );
}
