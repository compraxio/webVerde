'use client';
import { FaStore } from 'react-icons/fa';
import { MdOutlineLanguage, MdOutlinePublishedWithChanges, MdSaveAlt } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { FaPerson } from 'react-icons/fa6';
import { GoVerified } from 'react-icons/go';

import { DirVerdeSchema } from '@/schemas/NegociosShema';

import { useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { obtenerTodosGrupos } from '@/actions/Grupos';
import { obtenerTodosFases } from '@/actions/Fases';
import { CrearNegocio } from '@/actions/Negocio';

import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
);

type Inputs = z.infer<typeof DirVerdeSchema>;

import { Prisma } from '../../../generated/prisma/client';
import { IoMdPhotos } from 'react-icons/io';
import { AlertImage } from '@/components/alerts/alertImage';
import { useAuthStore } from '@/store/AuthStore';

type grupo = Prisma.gruposGetPayload<{
  include: {
    dir_verde: true;
  };
}>;

type fase = Prisma.fasesGetPayload<object>;

export default function CrearNego() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const router = useRouter();
  const [files, setFiles] = useState<any[]>([]);
  const [fotos, setFotos] = useState<any[]>([]);
  const [grupos, setGrupos] = useState<grupo[]>();
  const [fases, setFases] = useState<fase[]>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para crear un contacto');
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    async function cargarGruposYFases() {
      const grupos = await obtenerTodosGrupos();
      const fases = await obtenerTodosFases();
      if (grupos.length === 0) {
        toast.error('añade un grupo primero');
        router.push('/');
      }
      setGrupos(grupos);
      setFases(fases);
    }
    cargarGruposYFases();
  }, [setGrupos, setFases, router]);

  const onSubmit: SubmitHandler<Inputs> = () => {
    setOpen(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    resolver: zodResolver(DirVerdeSchema),
    mode: 'onChange',
  });

  const inputClass =
    'w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm';
  if (!isAuthenticated) return null;

  return (
    <>
      <AlertImage
        open={open}
        setOpen={setOpen}
        title="Estas seguro?"
        descripcion="El logo es obligatorio y ademas de eso luego no podras cambiarlo"
        funcion={() => {
          const formData = new FormData();
          formData.append('negocio', getValues('negocio'));
          formData.append('id_grupo', String(getValues('id_grupo')));
          formData.append('id_fase', String(getValues('id_fase')));
          formData.append('unidad_productiva', getValues('unidad_productiva') || '');
          formData.append('descripcion', getValues('descripcion'));
          formData.append('actividad', getValues('actividad'));
          formData.append('sub_categoria', getValues('sub_categoria') || '');
          formData.append('zona', getValues('zona'));
          formData.append('municipio', getValues('municipio'));
          formData.append('direccion', getValues('direccion'));
          formData.append('representante', getValues('representante') || '');
          formData.append('whatsup', getValues('whatsup') || '');
          formData.append('correo', getValues('correo'));
          formData.append('url_negocio', getValues('url_negocio') || '');
          formData.append('url_youtube', getValues('url_youtube') || '');
          formData.append('url_facebook', getValues('url_facebook') || '');
          formData.append('url_instagram', getValues('url_instagram') || '');
          formData.append('url_tiktok', getValues('url_tiktok') || '');
          formData.append('estado', getValues('estado'));
          formData.append('latitud', getValues('latitud') || '');
          formData.append('longitud', getValues('longitud') || '');
          if (getValues('a_o_verificacion')) {
            formData.append('a_o_verificacion', getValues('a_o_verificacion') ?? '');
          }
          formData.append('autorizado_por', getValues('autorizado_por') || '');
          if (files[0]?.file) {
            formData.append('logo', files[0].file);
          }

          // Agregar las fotografías (máximo 5)
          // NOTA: Las fotos se guardan en tabla relacionada, necesitas crear el negocio primero
          // para obtener el id_negocio y luego crear las fotografías
          fotos.forEach((foto) => {
            if (foto.file) {
              formData.append('fotografias', foto.file);
            }
          });

          toast.promise(
            (async () => {
              const res = await CrearNegocio(formData);
              if (!res?.ok) {
                throw new Error(res?.message);
              }
              router.refresh();
              router.push('/');
              return res.message;
            })(),
            {
              loading: 'Creando negocio....',
              success: (msg) => msg,
              error: (err) => err.message,
            },
          );
        }}
      />
      <form className="m-6" onSubmit={handleSubmit(onSubmit)}>
        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <FaStore size={25} />
              </div>
              <h3 className="text-lg font-bold">Información del Negocio</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="negocio">
                Nombre del Negocio<span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass}
                type="text"
                id="negocio"
                placeholder="Ej: Panadería La Sierra"
                {...register('negocio')}
              />
              {errors.negocio?.message && <p>{errors.negocio.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="id_grupo">
                Grupo<span className="text-red-500">*</span>
              </label>
              <select className={inputClass} id="id_grupo" {...register('id_grupo')}>
                <option value="">Selecciona un grupo</option>
                {grupos?.map((g) => (
                  <option value={g.id_grupo} key={g.id_grupo}>
                    {g.actividad.split(':')[0]}
                  </option>
                ))}
              </select>
              {errors.id_grupo?.message && <p>{errors.id_grupo.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="id_fase">
                Fase<span className="text-red-500">*</span>
              </label>
              <select className={inputClass} id="id_fase" {...register('id_fase')}>
                <option value="">Selecciona una fase</option>
                {fases?.map((f) => (
                  <option value={f.id_fase} key={f.id_fase}>
                    {f.id_fasex}
                  </option>
                ))}
              </select>
              {errors.id_fase?.message && <p>{errors.id_fase.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="Actividad">
                Actividad<span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass}
                type="text"
                id="Actividad"
                placeholder="Ej: Venta de pan y repostería"
                {...register('actividad')}
              />
              {errors.actividad?.message && <p>{errors.actividad.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="unidad_productiva">
                Unidad Productiva<span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass}
                type="text"
                id="unidad_productiva"
                placeholder="Ej: Unidad familiar / Taller"
                {...register('unidad_productiva')}
              />
              {errors.unidad_productiva?.message && <p>{errors.unidad_productiva.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="sub_categoria">
                Sub categoria
              </label>
              <input
                className={inputClass}
                type="text"
                id="sub_categoria"
                placeholder="Ej: Artesanías, Comida, Servicios"
                {...register('sub_categoria')}
              />
              {errors.sub_categoria?.message && <p>{errors.sub_categoria.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="descripcion">
                Descripción
              </label>
              <textarea
                className={inputClass}
                rows={3}
                id="descripcion"
                placeholder="Breve descripción del negocio: productos, servicios, especialidad..."
                {...register('descripcion')}
              ></textarea>
              {errors.descripcion?.message && <p>{errors.descripcion.message}</p>}
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <IoLocationOutline size={25} />
            </div>
            <h3 className="text-lg font-bold">Ubicación</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label className="text-sm font-semibold" htmlFor="municipio">
                Municipio<span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass}
                type="text"
                id="municipio"
                placeholder="Ej: San José"
                {...register('municipio')}
              />
              {errors.municipio?.message && <p>{errors.municipio.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="direccion">
                Dirección<span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass}
                type="text"
                id="direccion"
                placeholder="Ej: Calle 12 #34-56"
                {...register('direccion')}
              />
              {errors.direccion?.message && <p>{errors.direccion.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="direccion">
                Latitud<span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass}
                type="text"
                id="latitud"
                placeholder="Ej: 4.609722"
                {...register('latitud')}
              />
              {errors.latitud?.message && <p>{errors.latitud.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="longitud">
                Longitud<span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass}
                type="text"
                id="longitud"
                placeholder="Ej: -74.081753"
                {...register('longitud')}
              />
              {errors.longitud?.message && <p>{errors.longitud.message}</p>}
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <FaPerson size={25} />
            </div>
            <h3 className="text-lg font-bold">Representante</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="representante">
                Nombre del Representante<span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass}
                type="text"
                id="representante"
                placeholder="Ej: María Pérez"
                {...register('representante')}
              />
              {errors.representante?.message && <p>{errors.representante.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="whatsup">
                WhatsApp<span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass}
                type="text"
                id="whatsup"
                placeholder="Ej: 300 0000000"
                {...register('whatsup')}
              />
              {errors.whatsup?.message && <p>{errors.whatsup.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="correo">
                Correo<span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass}
                type="email"
                id="correo"
                placeholder="Ej: contacto@ejemplo.com"
                {...register('correo')}
              />
              {errors.correo?.message && <p>{errors.correo.message}</p>}
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <MdOutlineLanguage size={25} />
            </div>
            <h3 className="text-lg font-bold">Redes y Multimedia</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                name="files"
                labelIdle='Arrastra tu imágenen o selecciona o selecciona  <span class="filepond--label-action">Foto obligatoria<span style="color: red;">*</span></span>'
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
              <label className="text-sm font-semibold" htmlFor="url_negocio">
                Página Web
              </label>
              <input
                className={inputClass}
                type="url"
                id="url_negocio"
                placeholder="https://ejemplo.com"
                {...register('url_negocio')}
              />
              {errors.url_negocio?.message && <p>{errors.url_negocio.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="url_youtube">
                YouTube
              </label>
              <input
                className={inputClass}
                type="url"
                id="url_youtube"
                placeholder="https://youtube.com/channel/..."
                {...register('url_youtube')}
              />
              {errors.url_youtube?.message && <p>{errors.url_youtube.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="url_facebook">
                Facebook
              </label>
              <input
                className={inputClass}
                type="url"
                id="url_facebook"
                placeholder="https://facebook.com/tu-pagina"
                {...register('url_facebook')}
              />
              {errors.url_facebook?.message && <p>{errors.url_facebook.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="url_instagram">
                Instagram
              </label>
              <input
                className={inputClass}
                type="url"
                id="url_instagram"
                placeholder="https://instagram.com/tu-usuario"
                {...register('url_instagram')}
              />
              {errors.url_instagram?.message && <p>{errors.url_instagram.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="url_tiktok">
                TikTok
              </label>
              <input
                className={inputClass}
                type="url"
                id="url_tiktok"
                placeholder="https://tiktok.com/@tu_usuario"
                {...register('url_tiktok')}
              />
              {errors.url_tiktok?.message && <p>{errors.url_tiktok.message}</p>}
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <IoMdPhotos size={25} />
            </div>
            <h3 className="text-lg font-bold">Fotografias</h3>
          </div>

          <div className="flex flex-col gap-1.5">
            <FilePond
              files={fotos}
              onupdatefiles={setFotos}
              allowMultiple={true}
              maxFiles={5}
              name="fotos"
              labelIdle='Arrastra maximo 5 de tus imágenes <span class="filepond--label-action">Foto opcional</span>'
              acceptedFileTypes={['image/png', 'image/jpeg']}
              labelFileTypeNotAllowed="Archivo no válido"
              fileValidateTypeLabelExpectedTypes="Se espera PNG o JPEG"
              maxFileSize="1MB"
              labelMaxFileSizeExceeded="El archivo es demasiado grande"
              labelMaxFileSize="El tamaño máximo permitido es {filesize}"
            />
          </div>
        </section>
        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <GoVerified size={25} />
            </div>
            <h3 className="text-lg font-bold">Estado y Verificación</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="estado">
                Estado<span className="text-red-500">*</span>
              </label>
              <select className={inputClass} id="estado" {...register('estado')}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
              {errors.estado?.message && <p>{errors.estado.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="a_o_verificacion">
                Año de Verificación
              </label>
              <input
                className={inputClass}
                type="date"
                id="a_o_verificacion"
                {...register('a_o_verificacion')}
              />
              {errors.a_o_verificacion?.message && <p>{errors.a_o_verificacion.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="autorizado_por">
                Autorizado por
              </label>
              <input
                className={inputClass}
                type="text"
                id="autorizado_por"
                placeholder="Ej: Alcaldía Municipal / Entidad autorizante"
                {...register('autorizado_por')}
              />
              {errors.autorizado_por?.message && <p>{errors.autorizado_por.message}</p>}
            </div>
            <button
              type="submit"
              className="flex items-center justify-center max-lg:hidden md:col-span-2 gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-primary/10"
            >
              <MdSaveAlt size={25} />
              Guardar
            </button>
          </div>
        </section>
        <div className="lg:hidden sticky bottom-6 left-0 right-0 flex justify-center px-4">
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2"
          >
            <MdOutlinePublishedWithChanges size={25} />
            Publicar Cambios Globales
          </button>
        </div>
      </form>
    </>
  );
}
