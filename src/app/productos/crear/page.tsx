'use client';

import { useState, useEffect } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductoSchema } from '../../../schemas/productosSchema';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { CrearProducto } from '@/actions/Productos';
import { AlertImage } from '@/components/alerts/alertImage';
import { useAuthStore } from '@/store/AuthStore';
import { ConseguirTodosNegocios } from '@/actions/Negocio';
import { Prisma } from '../../../../generated/prisma/client';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
);

type Inputs = z.infer<typeof ProductoSchema>;
type Negocio = Prisma.dir_verdeGetPayload<object>;
/**/
export default function CrearProduc() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [negocios, setNegocios] = useState<Negocio[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    function verificarAutenticacion() {
      if (!isAuthenticated) {
        toast.error('Debes iniciar sesión para crear un producto');
        router.push('/auth');
      }
    }
    async function cargarNegocios() {
      const negocios = await ConseguirTodosNegocios()
      if (negocios.length === 0) {
        toast.error('Debes crear un negocio antes de crear un producto');
        router.push('/');
      }

      setNegocios(negocios);
    }
    verificarAutenticacion();
    cargarNegocios();

  }, [isAuthenticated, router, setNegocios]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    resolver: zodResolver(ProductoSchema),
    mode: 'onChange',
  });

  if (!isAuthenticated) return null;

  const onSubmit: SubmitHandler<Inputs> = () => {
    setOpen(true);
  };

  return (
    <>
      <AlertImage
        open={open}
        setOpen={setOpen}
        title="Estas seguro?"
        descripcion="La imagen es obligatoria y ademas de eso luego no podras editarla"
        funcion={() => {
          const formData = new FormData();
          formData.append('nombre', getValues('nombre'));
          formData.append('descripcion', getValues('descripcion'));
          formData.append('precio', getValues('precio'));
          formData.append('id_negocio', getValues('id_negocio'));
          if (files[0]?.file) {
            formData.append('img_prodcto', files[0].file);
          }
          //*Ponerse atento a esto
          toast.promise(
            (async () => {
              const res = await CrearProducto(formData);
              if (!res.ok) {
                throw new Error(res.message);
              }
              router.refresh();
              router.push('/productos/0');
              return res.message;
            })(),
            {
              loading: 'Creando producto....',
              success: (msg) => msg,
              error: (err) => err.message,
            },
          );
        }}
      />
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
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              name="files"
              labelIdle='Arrastra tu imágenen o selecciona o selecciona o selecciona <span class="filepond--label-action">Foto obligatoria<span style="color: red;">*</span></span>'
              acceptedFileTypes={['image/png', 'image/jpeg']}
              labelFileTypeNotAllowed="Archivo no válido"
              fileValidateTypeLabelExpectedTypes="Se espera PNG o JPEG"
              maxFileSize="1MB"
              labelMaxFileSizeExceeded="El archivo es demasiado grande"
              labelMaxFileSize="El tamaño máximo permitido es {filesize}"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="nombre"
            >
              Nombre del producto <span className="text-red-500">*</span>
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
              Descripcion <span className="text-red-500">*</span>
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
              Precio del producto <span className="text-red-500">*</span>
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
            className="flex  items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md"
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
    </>
  );
}
