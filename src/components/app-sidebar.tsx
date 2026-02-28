import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Suspense } from 'react';
import { ApoyoNegociosEsqueleto } from './esqueletons/Apoyo-negociosEsqueleto';
import { ApoyoNegocios } from './Apoyo-negocios';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
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
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
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
              Negocios verdes
            </Link>
            <Link
              className="flex items-center gap-3 px-4 py-3 text-primary dark:text-gray-300 rounded-xl font-medium hover:bg-black/10 transition-colors"
              href="/contactos/0"
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
              href="/productos/0"
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
            <Link
              className="flex items-center gap-3 px-4 py-3 text-primary dark:text-gray-300   rounded-xl font-medium hover:bg-black/10 transition-colors"
              href="/mapa"
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
                  d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934a1.12 1.12 0 0 1-1.006 0L9.503 3.252a1.13 1.13 0 0 0-1.006 0L3.622 5.689A1.13 1.13 0 0 0 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934a1.12 1.12 0 0 1 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                />
              </svg>
              Mapa
            </Link>
            <Link
              className="flex items-center gap-3 px-4 py-3 text-primary dark:text-gray-300   rounded-xl font-medium hover:bg-black/10 transition-colors"
              href="/fotografias"
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
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5m10.5-11.25h.008v.008h-.008zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0"
                />
              </svg>
              Fotos
            </Link>
          </nav>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 mt-auto">
          <Suspense fallback={<ApoyoNegociosEsqueleto />}>
            <ApoyoNegocios />
          </Suspense>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
