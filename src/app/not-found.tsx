import { CuerpoError } from '@/components/cuerpoError';
import { MdOutlinePsychologyAlt, MdForest } from 'react-icons/md';

export default function NotFound() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-full shadow-xl shadow-primary/5 border border-primary/10">
                <span className=" text-primary/40 dark:text-amber-50 text-8xl leading-none!">
                  <MdOutlinePsychologyAlt />
                </span>
              </div>
              <div className="absolute -top-4 -right-4 bg-primary text-background-dark font-black px-4 py-2 rounded-xl rotate-12 shadow-lg">
                404
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-[#0d1b12] dark:text-white tracking-tight">
              ¡Ups! Algo salió mal
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              No pudimos encontrar la página que buscas o ha ocurrido un error inesperado en nuestro
              ecosistema digital.
            </p>
          </div>
          <CuerpoError/>
        </div>
      </main>
      <div className="fixed top-20 right-0 p-8 opacity-10 pointer-events-none hidden lg:block">
        <span className=" text-primary">
          <MdForest />
        </span>
      </div>
    </>
  );
}
