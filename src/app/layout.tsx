import './globals.css';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

import { Inter } from 'next/font/google';
import { ApoyoNegocios } from '@/components/Apoyo-negocios';
import { Suspense } from 'react';
import { ApoyoNegociosEsqueleto } from '@/components/esqueletons/Apoyo-negociosEsqueleto';

import Providers from './providers';

import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-200`}
      >
        <Providers>
          <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 hidden lg:flex flex-col z-20">
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-leaf"
                    viewBox="0 0 24 24"
                  >
                    <path fill="none" stroke="none" d="M0 0h24v24H0z" />
                    <path d="M5 21c.5-4.5 2.5-8 7-10" />
                    <path d="M9 18c6.218 0 10.5-3.288 11-12V4h-4.014c-9 0-11.986 4-12 9 0 1 0 3 2 5z" />
                  </svg>
                </div>
                <h1 className="font-bold text-lg leading-tight text-primary flex flex-col">
                  Negocios
                  <p className="text-secondary">Verdes</p>
                </h1>
              </div>
            </div>
            <nav className="flex-1 px-4 space-y-1 mt-4">
              <Link
                className="flex items-center gap-3 px-4 py-3 text-primary dark:text-gray-300 rounded-xl font-medium hover:bg-black/10 transition-colors"
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
                Inicio
              </Link>
              <Link
                className="flex items-center gap-3 px-4 py-3 text-primary dark:text-gray-300 rounded-xl font-medium hover:bg-black/10 transition-colors"
                href="/contactos"
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
                Contactos
              </Link>
              <Link
                className="flex items-center gap-3 px-4 py-3 text-primary dark:text-gray-300 rounded-xl font-medium hover:bg-black/10 transition-colors"
                href="/municipios/todos"
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
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008zm0 3h.008v.008h-.008zm0 3h.008v.008h-.008z"
                  />
                </svg>
                Municipios
              </Link>
              <Link
                className="flex items-center gap-3 px-4 py-3 text-primary dark:text-gray-300 rounded-xl font-medium hover:bg-black/10 transition-colors"
                href="/productos"
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
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007M8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0m7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0"
                  />
                </svg>
                Productos
              </Link>
              <Link
                className="flex items-center gap-3 px-4 py-3 text-primary dark:text-gray-300   rounded-xl font-medium hover:bg-black/10 transition-colors"
                href="/grupos"
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
                Grupos
              </Link>
              <Link
                className="flex items-center gap-3 px-4 py-3 text-primary dark:text-gray-300   rounded-xl font-medium hover:bg-black/10 transition-colors"
                href="/fase"
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
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  />
                </svg>
                Fase
              </Link>
              {/* <Link
                className="flex items-center gap-3 px-4 py-3 text-primary dark:text-gray-300   rounded-xl font-medium hover:bg-black/10 transition-colors"
                href="/mapa"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="size-6" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934a1.12 1.12 0 0 1-1.006 0L9.503 3.252a1.13 1.13 0 0 0-1.006 0L3.622 5.689A1.13 1.13 0 0 0 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934a1.12 1.12 0 0 1 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"/></svg>

                Mapa
              </Link> */}
            </nav>
            <div className="p-4 mt-auto">
              <Suspense fallback={<ApoyoNegociosEsqueleto />}>
                <ApoyoNegocios />
              </Suspense>
            </div>
          </aside>
          <main className="lg:ml-64 min-h-screen da">
            <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-slate-200 dark:border-zinc-800">
              <form className="relative flex-1 max-w-md hidden md:block">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    className="size-5"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607"
                    />
                  </svg>
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-xl focus:outline-2 focus:outline-primary dark:text-white transition-colors font-medium"
                  placeholder="Buscar negocios por nombre o categoría..."
                  type="text"
                />
              </form>
              <div className="flex items-center gap-4">
                <ModeToggle />
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-400 relative">
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
                      d="M14.857 17.082a24 24 0 0 0 5.454-1.31A8.97 8.97 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.97 8.97 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.3 24.3 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-zinc-800">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold">Admin Cardique</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Gestionar Directorio
                    </p>
                  </div>
                  <div className="border p-2 rounded-full">
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
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0M4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.9 17.9 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </header>
            {children}
          </main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
