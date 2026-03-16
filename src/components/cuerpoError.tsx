'use client'
import { IoMdRefresh } from 'react-icons/io';
import Link from 'next/link';
export function CuerpoError() {
  return (
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
        onClick={() => globalThis.location.reload()}
      >
        <IoMdRefresh size="25px" />
        Reintentar
      </button>
    </div>
  );
}
