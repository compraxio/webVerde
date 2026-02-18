'use client';

import Link from 'next/link';

import type { Municipios } from '@/types/municipiosType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useParams } from 'next/navigation';

export function CuerpoMunicipios() {
  const params = useParams();
  const zona = params.zona as string;

  const { data, isPending } = useQuery<Municipios>({
    queryKey: ['municipios'],
    queryFn: async () => {
      const res = await axios('https://api-base-de-datos.vercel.app/municipios');
      return res.data;
    },
  });

  if (isPending) {
    return (
      <tr className=" cursor-pointer transition-colors group hover:bg-primary/10 hover:outline-4 hover:outline-primary">
        <td className="px-6 py-4">cargando....</td>
        <td className="px-6 py-4">cargando....</td>
        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">cargando....</td>
        <td className="px-6 py-4 text-right font-mono text-sm">cargando....</td>
      </tr>
    );
  }

  if (zona === 'norte') {
    return (
      <>
        {data?.data
          .filter((m) => m.zona === 'NORTE')
          .map((m) => (
            <tr
              className=" cursor-pointer transition-colors group hover:bg-primary/10 hover:outline-4 hover:outline-primary"
              key={m.cod_munic}
            >
              <td className="px-6 py-4 font-medium">{m.municipio}</td>
              <td className="px-6 py-4">
                <span className="text-xs bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded">
                  {m.zona}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
                {m.departamento}
              </td>
              <td className="px-6 py-4 text-right font-mono text-sm">{m.cod_munic}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    className="p-1 text-slate-400 hover:text-primary"
                    href={`/municipios/editar/${m.cod_munic}`}
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
      </>
    );
  } else if (zona === 'centro') {
    return (
      <>
        {data?.data
          .filter((m) => m.zona === 'CENTRO')
          .map((m) => (
            <tr
              className=" cursor-pointer transition-colors group hover:bg-primary/10 hover:outline-4 hover:outline-primary"
              key={m.cod_munic}
            >
              <td className="px-6 py-4 font-medium">{m.municipio}</td>
              <td className="px-6 py-4">
                <span className="text-xs bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded">
                  {m.zona}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
                {m.departamento}
              </td>
              <td className="px-6 py-4 text-right font-mono text-sm">{m.cod_munic}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    className="p-1 text-slate-400 hover:text-primary"
                    href={`/municipios/editar/${m.cod_munic}`}
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
      </>
    );
  } else if (zona === 'sur') {
    return (
      <>
        {data?.data
          .filter((m) => m.zona === 'SUR')
          .map((m) => (
            <tr
              className=" cursor-pointer transition-colors group hover:bg-primary/10 hover:outline-4 hover:outline-primary"
              key={m.cod_munic}
            >
              <td className="px-6 py-4 font-medium">{m.municipio}</td>
              <td className="px-6 py-4">
                <span className="text-xs bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded">
                  {m.zona}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
                {m.departamento}
              </td>
              <td className="px-6 py-4 text-right font-mono text-sm">{m.cod_munic}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    className="p-1 text-slate-400 hover:text-primary"
                    href={`/municipios/editar/${m.cod_munic}`}
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
      </>
    );
  }
  return (
    <>
      {data?.data.map((m) => (
        <tr
          className=" cursor-pointer transition-colors group hover:bg-primary/10 hover:outline-4 hover:outline-primary"
          key={m.cod_munic}
        >
          <td className="px-6 py-4 font-medium">{m.municipio}</td>
          <td className="px-6 py-4">
            <span className="text-xs bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded">
              {m.zona}
            </span>
          </td>
          <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">{m.departamento}</td>
          <td className="px-6 py-4 text-right font-mono text-sm">{m.cod_munic}</td>
          <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                className="p-1 text-slate-400 hover:text-primary"
                href={`/municipios/editar/${m.cod_munic}`}
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
