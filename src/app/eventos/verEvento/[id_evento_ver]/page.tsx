import prisma from '@/lib/prisma';
import { FaInfoCircle } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { MdCalendarMonth, MdOutlineDescription, MdOutlineSchedule } from 'react-icons/md';

export default async function VerEvento({
  params,
}: Readonly<{ params: Promise<{ id_evento_ver: string }> }>) {
  const { id_evento_ver } = await params;
  const id_evento = Number(id_evento_ver);
  const evento = await prisma.eventos.findFirst({
    where: {
      id_evento,
    },
  });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-background-dark/50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="relative w-full h-100 rounded-2xl overflow-hidden mb-8 shadow-xl">
          <img
            alt={evento?.evento}
            className="w-full h-full object-cover"
            data-alt="Panoramic view of dense tropical rainforest with mist"
            src={evento?.Img_Presentacion}
          />
          <div className="absolute inset-0 bg-linear-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 flex flex-col md:flex-row md:items-end justify-between w-full gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                {evento?.estado}
              </span>
              <h1 className="text-white text-5xl font-black tracking-tight leading-none mb-3">
                {evento?.evento}
              </h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-primary/5 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className=" text-primary">
                  <MdOutlineDescription size={25} />
                </span>
                Sobre el evento
              </h3>
              <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
                <p>{evento?.tipo_evento}</p>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-bold mb-4">Temas del evento</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {evento?.temas?.split(',').map((t) => (
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10"
                      key={t}
                    >
                      <span className=" text-primary">
                        <FaInfoCircle size={25} />
                      </span>
                      <span className="text-sm font-medium">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {evento?.link && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/5 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 text-center">
                  <h3 className="text-lg font-bold">Organizador</h3>
                </div>
                <div className="p-6 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary/10">
                      <img
                        alt="Organizer logo"
                        className="w-full h-full object-cover"
                        data-alt="Professional logo of Amazon Conservation Association"
                        src={evento?.Img_Presentacion}
                      />
                    </div>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold leading-tight">
                        {evento?.evento}
                      </h4>
                    </div>
                  </div>
                  <a
                    href={evento?.link ?? ''}
                    className="w-full py-2.5 rounded-xl bg-primary text-background-dark font-bold text-sm hover:brightness-105 transition-all shadow-lg shadow-primary/20 text-center"
                  >
                    Ir a la pagina del evento
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/5 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold">Event Information</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className=" text-primary">
                      <MdCalendarMonth size={25} />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      Fecha
                    </p>
                    <p className="text-slate-900 dark:text-white font-semibold">
                      {evento?.fecha?.toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className=" text-primary">
                      <MdOutlineSchedule size={25} />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      Hora
                    </p>
                    <p className="text-slate-900 dark:text-white font-semibold">{evento?.hora}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className=" text-primary">
                      <IoLocationOutline size={25} />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      Localisation
                    </p>
                    <p className="text-slate-900 dark:text-white font-semibold">
                      {evento?.direccion}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="w-full h-40 rounded-xl bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  <img
                    alt="Map view"
                    className="w-full h-full object-cover opacity-60"
                    data-alt="Stylized map showing Manaus city center location"
                    data-location="Manaus, Brazil"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbBiW4uP0KtztQMo-VY0RkctSF056kMnPVP6kerlz4ndp3VNmSyO-alj7oqab1G6RqNdeQVGeewjIrIs8zeuWvqKFtttO6sGtoQONJ0fNk0-oQ5c5D0vhp48VQd19xh0AwtjkxFo0LcpTTvPYGZxz8ejXO4GeF0hWUEUaBsuBmrqAIi3E6_zXDMDhjsuaYPr1Hu0oWFHyjhmIMSKHemOaRGGXUJ76etSlsuNhzK3VFhv2ESvpFx2Ob-ZfP5qL6R338-95Yp9fWVcNR"
                  />
                  <div className="absolute inset-0 flex items-center flex-col justify-center">
                    <div className="bg-primary text-background-dark p-2 rounded-full shadow-lg">
                      <span className="text-2xl">
                        <IoLocationOutline size={25} />
                      </span>
                    </div>
                    <span className="text-[15px]">Al abrir el mapa dar click en buscar</span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(evento?.direccion ?? '')}`}
                      className="px-3 py-1 bg-white dark:bg-slate-900 text-xs font-bold rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir en el mapa
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
