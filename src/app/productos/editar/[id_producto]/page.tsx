'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductoEditarSchema } from '../../../../schemas/productosSchema';
import { z } from 'zod';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { ConseguirProducto, EditarProducto } from '@/actions/Productos';

type Inputs = z.infer<typeof ProductoEditarSchema>;

export default function ActualizarProducto() {
  const params = useParams();
  const router = useRouter();
  const id_producto = Number(params.id_producto);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(ProductoEditarSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    async function cargarProducto() {
      const producto = await ConseguirProducto(id_producto);
      if (!producto) {
        toast.error('Producto no encontrado');
        router.refresh();
        router.back();
      }
      setValue('nombre', `${producto?.nombre}`);
      setValue('descripcion', `${producto?.descripcion}`);
      setValue('precio', `${producto?.precio}`);
    }
    cargarProducto();
  }, [id_producto, setValue, router]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.promise(
      async () => {
        const res = await EditarProducto(
          id_producto,
          data.nombre,
          data.descripcion,
          Number(data.precio),
        );
        return res;
      },
      {
        loading: 'Actualizando producto',
        success: (msg) => {
          router.push('/productos');
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
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007M8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0m7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold">Producto</h3>
        </div>
        <button
          type="submit"
          className="flex items-center max-lg:hidden gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md"
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60 60 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"
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
            Nombre del producto
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            type="text"
            placeholder="Ej:Papaya"
            id="nombre"
            {...register('nombre')}
          />
          {errors.nombre?.message && <p>{errors.nombre.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="descripcion"
          >
            Descripcion
          </label>
          <div className="flex gap-6 ">
            <textarea
              rows={3}
              id="descripcion"
              placeholder="Ej:Papaya fresca rica en Vitamina C, A y Fibra."
              {...register('descripcion')}
              className="w-full px-4 py-2.5 min-h-20 max-h-28 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            ></textarea>
          </div>
          {errors.descripcion?.message && <p>{errors.descripcion.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            htmlFor="precio"
          >
            Precio del producto
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            type="number"
            placeholder="Ej:1200"
            id="precio"
            {...register('precio')}
          />
          {errors.precio?.message && <p>{errors.precio.message}</p>}
        </div>
        <button
          type="submit"
          className="flex md:hidden items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md"
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60 60 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"
            />
          </svg>
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}
