'use client';

import { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GrupoSchema } from '../../../schemas/GrupoSchema';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { CrearGrupo } from '@/actions/Grupos';
import { AlertImage } from '@/components/alerts/alertImage';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

type Inputs = z.infer<typeof GrupoSchema>;

export default function CrearGrup() {
  const [files, setFiles] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = () => {
    setOpen(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    resolver: zodResolver(GrupoSchema),
    mode: 'onChange',
  });

  return (
    <>
      <AlertImage
        open={open}
        setOpen={setOpen}
        title="Estas seguro?"
        descripcion="La imagen es obligatoria y ademas de eso luego no podras editarla"
        funcion={() => {
          const formData = new FormData();
          formData.append('actividad', `${getValues('nombre')}:${getValues('actividad')}`);
          if (files[0]?.file) {
            formData.append('logo_grupo', files[0].file);
          }

          //*Ponerse atento a esto
          toast.promise(
            (async () => {
              const res = await CrearGrupo(formData);

              if (!res.ok) {
                throw new Error(res.message);
              }

              router.refresh();
              router.push('/grupos');
              return res.message;
            })(),
            {
              loading: 'Creando grupo...',
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
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              name="files"
              labelIdle='Arrastra tu imágenen o selecciona <span class="filepond--label-action">Foto obligatoria<span style="color: red;">*</span></span>'
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
              Nombre del grupo<span className="text-red-500">*</span>
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
              htmlFor="actividad"
            >
              Actividad del grupo<span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              id="actividad"
              placeholder="Ej:Accion Climatica"
              {...register('actividad')}
              className="w-full px-4 py-2.5 min-h-20 max-h-28 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
            ></textarea>
            {errors.actividad?.message && <p>{errors.actividad.message}</p>}
          </div>
        </div>
      </form>
    </>
  );
}
