'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contacEditarSchema } from '@/schemas/contactSchema';
import { z } from 'zod';
import { useRouter, useParams } from 'next/navigation';

import { toast } from 'sonner';
import { ConseguirContacto, EditarContacto } from '@/actions/Contactos';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/AuthStore';
import { ConseguirTodosNegocios } from '@/actions/Negocio';
import { Prisma } from '../../../../../generated/prisma/client';

type Inputs = z.infer<typeof contacEditarSchema>;
type Negocio = Prisma.dir_verdeGetPayload<object>;

export default function EditarCon() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const params = useParams();
  const id_contacto = Number(params.id);
  const [negocios, setNegocios] = useState<Negocio[]>([]);

  useEffect(() => {
    function verificarAutorizacion() {
      if (!isAuthenticated) {
        toast.error('Debes iniciar sesión para editar un negocio');
        router.push('/auth');
      }
    }
    async function cargarContactos() {
      const negocios = await ConseguirTodosNegocios();
      if (negocios.length === 0) {
        toast.error('Debes crear un negocio antes de editar un contacto');
        router.push('/');
      }
      setNegocios(negocios);
    }
    verificarAutorizacion();
    cargarContactos();
  }, [isAuthenticated, router, setNegocios]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(contacEditarSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    async function cargarContacto() {
      const contacto = await ConseguirContacto(id_contacto);

      if (!contacto) {
        toast.error('Contacto no encontrado');
        router.push('/contactos/0');
      }

      setValue('nombre', contacto?.nombre ?? '');
      setValue('numero', contacto?.telefono ?? '');
      setValue('correo', contacto?.correo ?? '');
      setValue('id_negocio', contacto?.id_negocio ? String(contacto.id_negocio) : '');
    }
    cargarContacto();
  }, [id_contacto, setValue, router]);

  if (!isAuthenticated) return null;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.promise(
      async () => {
        const res = await EditarContacto(id_contacto, {
          nombre: data.nombre,
          telefono: data.numero,
          correo: data.correo,
        });
        if (!res.ok) throw new Error(res.message);
        return res.message;
      },
      {
        loading: 'Actualizando contacto....',
        success: (msg) => {
          router.push('/contactos/0');
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
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="Nombre"
          >
            Nombre de contacto
            <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            type="text"
            placeholder={'María Fernanda González'}
            id="Nombre"
            {...register('nombre')}
          />
          {errors.nombre?.message && <p>{errors.nombre.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="extension"
          >
            Numero
            <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6 ">
            <input
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
              type="tel"
              placeholder={'300 123 4567'}
              {...register('numero')}
            />
          </div>
          {errors.numero?.message && <p>{errors.numero.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="Correo"
          >
            Correo Electrónico
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            type="email"
            placeholder={'contacto@campoverde.eco'}
            id="Correo"
            {...register('correo')}
          />
          {errors.correo?.message && <p>{errors.correo.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="Negocio"
          >
            Negocio al que pertenece<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            id="Negocio"
            {...register('id_negocio')}
          >
            <option value="">Selecciona un negocio</option>
            {negocios.map((n) => (
              <option key={n.id_negocio} value={n.id_negocio}>
                {n.negocio}
              </option>
            ))}
          </select>
          {errors.id_negocio?.message && <p>{errors.id_negocio.message}</p>}
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
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0M3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.3 12.3 0 0 1 9.374 21C7.043 21 4.862 20.355 3 19.234Z"
            />
          </svg>
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}
