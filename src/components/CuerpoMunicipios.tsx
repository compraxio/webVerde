import prisma from '@/lib/prisma';
import { AccionesMunicipios } from './Admin/MunicipiosAuth';

export async function CuerpoMunicipios({ zona }: Readonly<{ zona: string }>) {
  const municipios = await prisma.municipios.findMany({
    where:
      zona === 'TODOS'
        ? {}
        : {
            zona: zona,
          },
  });

  return (
    <>
      {municipios.map((m) => (
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
          <AccionesMunicipios cod_munic={m.cod_munic} />
        </tr>
      ))}
    </>
  );
}
