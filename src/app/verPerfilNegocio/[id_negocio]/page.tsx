'use client';
import { useParams } from 'next/navigation';
import { CiCircleCheck, CiEdit, CiLocationOn } from 'react-icons/ci';
import {
  MdOutlineChat,
  MdLanguage,
  MdOutlineSettingsApplications,
  MdOutlinePublic,
  MdOutlineDescription,
} from 'react-icons/md';
import { IoMdShare } from 'react-icons/io';
import { FaRegIdBadge } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';

import { useQuery } from '@tanstack/react-query';
import type { DirVerdeInfo } from '@/types/dir_verdeType';
import axios from 'axios';
import { toast } from 'sonner';
export default function usePerfilNegocio() {
  const params = useParams();
  const id_negocio = params.id_negocio;

  const { data, isPending } = useQuery<DirVerdeInfo>({
    queryKey: ['negocios', id_negocio],
    queryFn: async () => {
      const res = await axios(`https://api-base-de-datos.vercel.app/dir_verde/${id_negocio}`);
      return res.data;
    },
    enabled: !!id_negocio,
  });

  const copiarTexto = async () => {
    if (data?.data.url_negocio) {
      await navigator.clipboard.writeText(data?.data.url_negocio);
    } else {
      toast.info('Este negocio no tiene pagina web');
    }
    toast.success('Pagina web del nogico copiada');
  };

  const fase = (id_fase: number) => {
    if (id_fase === 1) {
      return 'Inicial';
    } else if (id_fase === 2) {
      return 'Basico';
    } else if (id_fase === 3) {
      return 'Intermedio';
    } else if (id_fase === 4) {
      return 'Satisfactorio';
    } else if (id_fase === 5) {
      return 'Avanzado';
    } else if (id_fase === 6) {
      return 'ideal';
    } else {
      return 'notiene';
    }
  };
  return (
    <div className="p-8 @container max-w-350 mx-auto w-full">
      <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-amber-50/10 p-6 mb-8">
        <div className="flex flex-col @[800px]:flex-row gap-8 items-start">
          <div className="relative">
            <div
              className={`size-32 @[800px]:size-40 rounded-xl bg-leaf/5 flex items-center justify-center border-2 ${data?.data.ano_verificacion ? 'border-primary' : 'border-red-500'} overflow-hidden`}
            >
              {/* <img
                alt={data?.data.negocio}
                className="object-contain p-4"
                data-alt={data?.data.actividad}
                src={data?.data.logo ?? ''}
              /> */}
            </div>
            {data?.data.ano_verificacion ? (
              <div className="absolute -bottom-2 -right-2 bg-primary text-forest px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <CiCircleCheck size={15} />
                VERIFICADO
              </div>
            ) : (
              <div className="absolute -bottom-2 -right-2 bg-red-500 text-forest px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                NO VERIFICADO
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-black tracking-tight text-forest dark:text-white">
                {data?.data.negocio}
              </h1>
              <span className="px-3 py-1 bg-amber-50/10 text-leaf rounded text-xs font-bold uppercase tracking-wider">
                {data?.data.estado ?? 'No hay estado'}
              </span>
            </div>
            <p className="text-leaf text-lg mb-6 max-w-2xl font-medium">{data?.data.actividad}</p>
            <div className="flex flex-wrap gap-3">
              {data?.data.whatsup && (
                <a
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-bold hover:brightness-95 transition-all shadow-sm"
                  href={`https://wa.me/${data?.data.whatsup}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdOutlineChat size={20} />
                  WhatsApp
                </a>
              )}
              {data?.data.url_negocio && (
                <a
                  className="inline-flex items-center gap-2 bg-primary text-forest px-5 py-2.5 rounded-lg font-bold hover:brightness-95 transition-all shadow-sm"
                  href={data?.data.url_negocio}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdLanguage size={20} />
                  Visitar Sitio Web
                </a>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => copiarTexto()}
                  className="size-10 flex items-center justify-center rounded-lg border border-leaf/20 text-leaf hover:bg-leaf/5"
                >
                  <IoMdShare size={23} />
                </button>
                <button className="size-10 flex items-center justify-center rounded-lg border border-leaf/20 text-leaf hover:bg-leaf/5">
                  <CiEdit size={23} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 @[1000px]:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-amber-50/10 shadow-sm @[1000px]:col-span-3">
          <div className="flex items-center gap-3 mb-4">
            <MdOutlineDescription size={25} />

            <h2 className="font-bold text-lg">Descripción del Negocio</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-leaf/80 leading-relaxed">
            {data?.data.descripcion}
          </div>
        </div>
        <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-amber-50/10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <FaRegIdBadge size={25} />

            <h2 className="font-bold text-lg">Identificación General</h2>
          </div>
          <div className="space-y-4">
            {data?.data.sub_categoria && (
              <div>
                <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">
                  Categoría
                </h3>
                <p className="text-forest dark:text-white font-medium">
                  {data?.data.sub_categoria}
                </p>
              </div>
            )}
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">Grupo</h3>
              <p className="text-forest dark:text-white font-medium">
                {data?.data.grupo.actividad.split(':')[0]}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-amber-50/10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <MdOutlineSettingsApplications size={25} />
            <h2 className="font-bold text-lg">Detalles Operativos</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">Actividad</h3>
              <p className="text-forest dark:text-white font-medium">{data?.data.actividad}</p>
            </div>
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">
                Unidad Productiva
              </h3>
              <p className="text-forest dark:text-white font-medium">
                {data?.data.unidad_productiva}
              </p>
            </div>
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">
                Fase de Desarrollo
              </h3>
              <p className="text-forest dark:text-white font-medium">
                {data?.data.id_fase && fase(data?.data.id_fase)}
              </p>
            </div>
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">Estado</h3>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`size-2 rounded-full ${data?.data.estado === 'Activo' ? 'bg-primary' : 'bg-red-500'} animate-pulse`}
                ></div>
                <p className="text-forest dark:text-white font-bold">{data?.data.estado}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-amber-50/10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <CiLocationOn size={25} />
            <h2 className="font-bold text-lg">Ubicación y Contacto</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">
                Municipio / Zona
              </h3>
              <p className="text-forest dark:text-white font-medium">
                {`${data?.data.municipio} | ${data?.data.zona}`}
              </p>
            </div>
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">Dirección</h3>
              <p className="text-forest dark:text-white font-medium">{data?.data.direccion}</p>
            </div>
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">
                Representante Legal
              </h3>
              <p className="text-forest dark:text-white font-medium">{data?.data.representante}</p>
            </div>
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">
                Correo Electrónico
              </h3>
              <p className="text-forest dark:text-white font-medium truncate">
                {data?.data.correo}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-amber-50/10 shadow-sm @[1000px]:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MdOutlinePublic size={25} />
              <h2 className="font-bold text-lg">Presencia Social y Digital</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 @[600px]:grid-cols-4 gap-4">
            {data?.data.url_youtube && (
              <a
                className="flex items-center gap-3 p-3 bg-leaf/5 rounded-lg hover:bg-amber-50/10 transition-colors group"
                href={data?.data.url_youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="size-8 rounded flex items-center justify-center bg-red-600 text-white font-bold text-xs">
                  YT
                </span>
                <span className="text-sm font-bold text-leaf group-hover:text-forest">YouTube</span>
              </a>
            )}
            {data?.data.url_facebook && (
              <a
                className="flex items-center gap-3 p-3 bg-leaf/5 rounded-lg hover:bg-amber-50/10 transition-colors group"
                href={data?.data.url_facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="size-8 rounded flex items-center justify-center bg-blue-700 text-white font-bold text-xs">
                  FB
                </span>
                <span className="text-sm font-bold text-leaf group-hover:text-forest">
                  Facebook
                </span>
              </a>
            )}
            {data?.data.url_instagram && (
              <a
                className="flex items-center gap-3 p-3 bg-leaf/5 rounded-lg hover:bg-amber-50/10 transition-colors group"
                href={data?.data.url_instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="size-8 rounded flex items-center justify-center bg-pink-600 text-white font-bold text-xs">
                  IG
                </span>
                <span className="text-sm font-bold text-leaf group-hover:text-forest">
                  Instagram
                </span>
              </a>
            )}
            {data?.data.url_tiktok && (
              <a
                className="flex items-center gap-3 p-3 bg-leaf/5 rounded-lg hover:bg-amber-50/10 transition-colors group"
                href={data?.data.url_tiktok}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="size-8 rounded flex items-center justify-center bg-black text-white font-bold text-xs">
                  TK
                </span>
                <span className="text-sm font-bold text-leaf group-hover:text-forest">TikTok</span>
              </a>
            )}
          </div>
        </div>
        {data?.data.ano_verificacion && (
          <div className="bg-forest dark:bg-primary/5 bg-primary p-6 rounded-xl shadow-sm @[1000px]:col-span-1 text-white dark:text-forest">
            <div className="flex items-center gap-3 mb-6">
              <GoVerified size={22} />
              <h2 className="font-bold text-lg text-white dark:text-white">Cumplimiento</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 dark:bg-primary/10 p-4 rounded-lg">
                <h3 className="text-[10px] dark:text-primary text-white font-black uppercase tracking-widest">
                  Año de Verificación
                </h3>
                <p className="text-2xl font-black">{data.data.ano_verificacion}</p>
              </div>
              <div>
                <h3 className="text-xs text-leaf/80 font-bold uppercase tracking-tighter">
                  Autorizado Por
                </h3>
                <p className="font-bold text-white dark:text-white">{data.data.autorizado_por}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
