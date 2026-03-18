import prisma from '@/lib/prisma';
import { AccionesMunicipios } from './Admin/MunicipiosAuth';

export async function CuerpoMunicipios({
  zona,
  skip,
  pageSize,
}: Readonly<{ zona: string; skip: number; pageSize: number}>) {
  const [municipios] = await Promise.all([
    prisma.municipios.findMany({
      where:
        zona === 'TODOS'
          ? {}
          : {
              zona: zona,
            },
      skip,
      take: pageSize,
    }),
  ]);


  return (
    <>
      {municipios.map((m) => (
        <tr
          className="cursor-pointer transition-colors group hover:bg-primary/10 hover:outline-4 hover:outline-primary"
          key={m.cod_munic}
        >
          <td className="px-6 py-4 font-medium text-card-foreground">{m.municipio}</td>
          <td className="px-6 py-4">
            <span className="text-xs bg-muted px-2 py-1 rounded">
              {m.zona}
            </span>
          </td>
          <td className="px-6 py-4 text-muted-foreground text-sm">{m.departamento}</td>
          <td className="px-6 py-4 text-right font-mono text-sm text-muted-foreground">{m.cod_munic}</td>
          <AccionesMunicipios cod_munic={m.cod_munic} />
        </tr>
      ))}
    </>
  );
}
