'use client';
import Link from 'next/link';
import { getUser } from '@/lib/auth';
import { useEffect, useState } from 'react';
export function BotonAgregarMunicipio() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    async function verificar() {
      const autenticado = await getUser();
      setIsAuthenticated(autenticado);
    }
    verificar();
  }, []);
  if (!isAuthenticated) return null;
  return (
    <Link
      className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all text-sm"
      href="/admin/municipios/crear"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        className="size-5"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Agregar
    </Link>
  );
}
export function AccionesMunicipios({ cod_munic }: Readonly<{ cod_munic: number }>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    async function verificar() {
      const autenticado = await getUser();
      setIsAuthenticated(autenticado);
    }
    verificar();
  }, []);
  if (!isAuthenticated) return null;
  return (
    <Link
      className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
      href={`/admin/municipios/editar/${cod_munic}`}
      title="Editar"
    >
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
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    </Link>
  );
}
