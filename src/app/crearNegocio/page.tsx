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

import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);

type Inputs = z.infer<typeof DirVerdeSchema>;

import { Prisma } from '../../../generated/prisma/client';

type grupo = Prisma.gruposGetPayload<{
  include: {
    dir_verde: true;
  };
}>;

type fase = Prisma.fasesGetPayload<object>;

export default function CrearNegocio() {
  const router = useRouter();
  const [files, setFiles] = useState<any[]>([]);
  const [grupos, setGrupos] = useState<grupo[]>();
  const [fases, setFases] = useState<fase[]>();

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


  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData();
    formData.append('negocio', `${data.actividad}`);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(DirVerdeSchema),
    mode: 'onChange',
  });

  const inputClass =
    'w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm';
  return (
    <>
      <form className="m-6" onSubmit={handleSubmit(onSubmit)}>
        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <FaStore size={25} />
              </div>
              <h3 className="text-lg font-bold">Información del Negocio</h3>
            </div>
            <button className="flex items-center max-lg:hidden gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-primary/10">
              <MdSaveAlt size={25} />
              Guardar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="negocio">
                Nombre del Negocio
              </label>
              <input className={inputClass} type="text" id="negocio" {...register('negocio')} />
              {errors.negocio?.message && <p>{errors.negocio.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="id_grupo">
                Grupo
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
                Fase
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
              <label className="text-sm font-semibold" htmlFor="sub_categoria">
                Actividad
              </label>
              <input
                className={inputClass}
                type="text"
                id="sub_categoria"
                {...register('sub_categoria')}
              />
              {errors.sub_categoria?.message && <p>{errors.sub_categoria.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="unidad_productiva">
                Unidad Productiva
              </label>
              <input
                className={inputClass}
                type="text"
                id="unidad_productiva"
                {...register('unidad_productiva')}
              />
              {errors.unidad_productiva?.message && <p>{errors.unidad_productiva.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="descripcion">
                Descripción
              </label>
              <textarea
                className={inputClass}
                rows={3}
                id="descripcion"
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
              <label className="text-sm font-semibold" htmlFor="zona">
                Zona
              </label>
              <input className={inputClass} type="text" id="zona" {...register('zona')} />
              {errors.zona?.message && <p>{errors.zona.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="municipio">
                Municipio
              </label>
              <input className={inputClass} type="text" id="municipio" {...register('municipio')} />
              {errors.municipio?.message && <p>{errors.municipio.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="direccion">
                Dirección
              </label>
              <input className={inputClass} type="text" id="direccion" {...register('direccion')} />
              {errors.direccion?.message && <p>{errors.direccion.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="pos_gps">
                Posición GPS
              </label>
              <input
                className={inputClass}
                type="text"
                id="pos_gps"
                placeholder="Latitud, Longitud"
                {...register('pos_gps')}
              />
              {errors.pos_gps?.message && <p>{errors.pos_gps.message}</p>}
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
                Nombre del Representante
              </label>
              <input
                className={inputClass}
                type="text"
                id="representante"
                {...register('representante')}
              />
              {errors.representante?.message && <p>{errors.representante.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" htmlFor="whatsup">
                WhatsApp
              </label>
              <input className={inputClass} type="text" id="whatsup" {...register('whatsup')} />
              {errors.whatsup?.message && <p>{errors.whatsup.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="correo">
                Correo
              </label>
              <input className={inputClass} type="email" id="correo" {...register('correo')} />
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
                labelIdle='Arrastra tus imágenes o <span class="filepond--label-action">Selecciona</span>'
                acceptedFileTypes={['image/png', 'image/jpeg']}
                labelFileTypeNotAllowed="Archivo no válido"
                fileValidateTypeLabelExpectedTypes="Se espera PNG o JPEG"
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
                {...register('url_tiktok')}
              />
              {errors.url_tiktok?.message && <p>{errors.url_tiktok.message}</p>}
            </div>
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
                Estado
              </label>
              <input className={inputClass} type="text" id="estado" {...register('estado')} />
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
                {...register('a_o_verificacion', {
                  valueAsDate: true,
                })}
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
                {...register('autorizado_por')}
              />
              {errors.autorizado_por?.message && <p>{errors.autorizado_por.message}</p>}
            </div>
          </div>
        </section>
      </form>

      <div className="lg:hidden sticky bottom-6 left-0 right-0 flex justify-center px-4">
        <button className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2">
          <MdOutlinePublishedWithChanges size={25} />
          Publicar Cambios Globales
        </button>
      </div>
    </>
  );
}
