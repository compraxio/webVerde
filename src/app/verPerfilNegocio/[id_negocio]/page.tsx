import prisma from '@/lib/prisma';
import Image from 'next/image';
import errorImg from '../../../components/ui/error.png';

import { CiCircleCheck, CiLocationOn } from 'react-icons/ci';
import {
  MdOutlineChat,
  MdOutlineSettingsApplications,
  MdOutlinePublic,
  MdOutlineDescription,
  MdOutlineProductionQuantityLimits,
} from 'react-icons/md';
import { FaRegIdBadge } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { BotonesFormulario } from '@/components/botones/BotonesFormulario';
import Link from 'next/link';

export default async function usePerfilNegocio({
  params,
}: Readonly<{ params: Promise<{ id_negocio: string }> }>) {
  const { id_negocio } = await params;
  const negocio = await prisma.dir_verde.findFirst({
    where: {
      id_negocio: Number(id_negocio),
    },
    include: {
      grupos: true,
      contactos: true,
      municipios: true,
      productos: true,
    },
  });

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
    <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
      <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-amber-50/10 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative">
            <div
              className={`size-32 md:size-40 rounded-xl bg-leaf/5 flex items-center justify-center border-2 ${
                negocio?.a_o_verificacion?.toLocaleDateString('es-CO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }) === '31 de diciembre de 1969'
                  ? 'border-red-500'
                  : 'border-primary'
              } overflow-hidden`}
            >
              {negocio?.logo ? (
                <img alt={negocio?.negocio} className="object-contain p-4" src={negocio.logo} />
              ) : (
                <Image
                  alt="Honey production"
                  className="object-contain p-4 bg-white "
                  src={negocio?.logo ?? errorImg}
                  height="1508"
                  width="1920"
                />
              )}
            </div>
            {negocio?.a_o_verificacion?.toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }) === '31 de diciembre de 1969' ? (
              <div className="absolute -bottom-2 -right-2 bg-red-500 text-forest px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                NO VERIFICADO
              </div>
            ) : (
              <div className="absolute -bottom-2 -right-2 bg-primary text-forest px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <CiCircleCheck size={15} />
                VERIFICADO
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-black tracking-tight text-forest dark:text-white">
                {negocio?.negocio}
              </h1>
              <span className="px-3 py-1 bg-amber-50/10 text-leaf rounded text-xs font-bold uppercase tracking-wider">
                {negocio?.estado ?? 'No hay estado'}
              </span>
            </div>
            <p className="text-leaf text-lg mb-6 max-w-2xl font-medium">{negocio?.actividad}</p>
            <div className="flex flex-wrap gap-3">
              {negocio?.contactos && negocio.contactos.length > 0 && (
                <Link
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-bold hover:brightness-95 transition-all shadow-sm"
                  href={`/contactos/${id_negocio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdOutlineChat size={20} />
                  Ver contactos
                </Link>
              )}
              {negocio?.productos && negocio.productos.length > 0 && (
                <Link
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-bold hover:brightness-95 transition-all shadow-sm"
                  href={`/productos/${id_negocio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdOutlineProductionQuantityLimits size={25} />
                  Ver productos
                </Link>
              )}
              {negocio?.url_negocio && (
                <a
                  className="inline-flex items-center gap-2 bg-primary text-forest px-5 py-2.5 rounded-lg font-bold hover:brightness-95 transition-all shadow-sm"
                  href={negocio?.url_negocio}
                  target="_blank"
                  rel="noopener noreferrer"
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
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.04 12.04 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5z"
                    />
                  </svg>
                  Visitar Sitio Web
                </a>
              )}
              {negocio?.url_negocio && (
                <BotonesFormulario
                  url={negocio?.url_negocio ?? ''}
                  linkEdit={`/editarNegocio/${negocio.id_negocio}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {negocio?.descripcion && <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-amber-50/10 shadow-sm lg:col-span-3">
          <div className="flex items-center gap-3 mb-4">
            <MdOutlineDescription size={25} />

            <h2 className="font-bold text-lg">Descripción del Negocio</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-leaf/80 leading-relaxed">
            {negocio?.descripcion}
          </div>
        </div>}
        <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-amber-50/10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <FaRegIdBadge size={25} />

            <h2 className="font-bold text-lg">Identificación General</h2>
          </div>
          <div className="space-y-4">
            {negocio?.sub_categoria && (
              <div>
                <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">
                  Categoría
                </h3>
                <p className="text-forest dark:text-white font-medium">{negocio?.sub_categoria}</p>
              </div>
            )}
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">Grupo</h3>
              <p className="text-forest dark:text-white font-medium">
                {negocio?.grupos.actividad.split(':')[0]}
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
              <p className="text-forest dark:text-white font-medium">{negocio?.actividad}</p>
            </div>
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">
                Unidad Productiva
              </h3>
              <p className="text-forest dark:text-white font-medium">
                {negocio?.unidad_productiva}
              </p>
            </div>
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">
                Fase de Desarrollo
              </h3>
              <p className="text-forest dark:text-white font-medium">
                {negocio?.id_fase && fase(negocio?.id_fase)}
              </p>
            </div>
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">Estado</h3>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`size-2 rounded-full ${negocio?.estado === 'Activo' ? 'bg-primary' : 'bg-red-500'} animate-pulse`}
                ></div>
                <p className="text-forest dark:text-white font-bold">{negocio?.estado}</p>
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
                {`${negocio?.municipios.municipio} | ${negocio?.municipios.zona}`}
              </p>
            </div>
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">Dirección</h3>
              <p className="text-forest dark:text-white font-medium">{negocio?.direccion}</p>
            </div>
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">
                Latitud y Longitud
              </h3>
              <p className="text-forest dark:text-white font-medium">{negocio?.pos_gps}</p>
            </div>
            <div>
              <h3 className="text-xs text-leaf font-bold uppercase tracking-tighter">
                Representante Legal
              </h3>
              <p className="text-forest dark:text-white font-medium">{negocio?.representante}</p>
            </div>
          </div>
        </div>
        {negocio?.url_youtube || negocio?.url_facebook || negocio?.url_instagram || negocio?.url_tiktok ? (
          <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-amber-50/10 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <MdOutlinePublic size={25} />
                <h2 className="font-bold text-lg">Presencia Social y Digital</h2>
              </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {negocio?.url_youtube && (
              <a
                className="flex items-center gap-3 p-3 bg-leaf/5 rounded-lg hover:bg-amber-50/10 transition-colors group"
                href={negocio?.url_youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="size-8 rounded flex items-center justify-center bg-red-600 text-white font-bold text-xs">
                  YT
                </span>
                <span className="text-sm font-bold text-leaf group-hover:text-forest">YouTube</span>
              </a>
            )}
            {negocio?.url_facebook && (
              <a
                className="flex items-center gap-3 p-3 bg-leaf/5 rounded-lg hover:bg-amber-50/10 transition-colors group"
                href={negocio?.url_facebook}
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
            {negocio?.url_instagram && (
              <a
                className="flex items-center gap-3 p-3 bg-leaf/5 rounded-lg hover:bg-amber-50/10 transition-colors group"
                href={negocio?.url_instagram}
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
            {negocio?.url_tiktok && (
              <a
                className="flex items-center gap-3 p-3 bg-leaf/5 rounded-lg hover:bg-amber-50/10 transition-colors group"
                href={negocio?.url_tiktok}
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
        </div>) : null}
        {negocio?.a_o_verificacion?.toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }) === '31 de diciembre de 1969' ? (
          ''
        ) : (
          <div className="bg-forest dark:bg-primary/5 bg-primary p-6 rounded-xl shadow-sm lg:col-span-1 text-white dark:text-forest">
            <div className="flex items-center gap-3 mb-6">
              <GoVerified size={22} />
              <h2 className="font-bold text-lg text-white dark:text-white">Cumplimiento</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 dark:bg-primary/10 p-4 rounded-lg">
                <h3 className="text-[10px] dark:text-primary text-white font-black uppercase tracking-widest">
                  Año de Verificación
                </h3>
                <p className="text-2xl font-black">
                  {negocio?.a_o_verificacion?.toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <h3 className="text-xs text-leaf/80 font-bold uppercase tracking-tighter">
                  Autorizado Por
                </h3>
                <p className="font-bold text-white dark:text-white">{negocio?.autorizado_por}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
