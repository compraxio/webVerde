'use client';
import Link from 'next/link';
import { IoMdRefresh } from 'react-icons/io';

import { MdForest, MdOutlinePsychologyAlt } from 'react-icons/md';

export default function ErrorPage({
  error,
  reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
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
                500
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-[#0d1b12] dark:text-white tracking-tight">
              ¡Ups! Algo salió mal
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              ha ocurrido un error inesperado en nuestro ecosistema digital.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-background-dark px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
              href="/"
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
                  d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Volver a negocios verdes
            </Link>
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary dark:text-primary px-8 py-4 rounded-xl font-bold transition-all"
              onClick={() => reset()}
            >
              <IoMdRefresh size="25px" />
              Reintentar
            </button>
          </div>
          <p className="mt-4">{error?.message}</p>
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
