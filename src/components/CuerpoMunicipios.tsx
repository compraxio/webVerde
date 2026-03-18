import prisma from '@/lib/prisma';
import { AccionesMunicipios } from './Admin/MunicipiosAuth';
import { MapPin } from 'lucide-react';
export async function CuerpoMunicipios({
  zona,
  skip,
  pageSize,
}: Readonly<{ zona: string; skip: number; pageSize: number }>) {
  const [municipios] = await Promise.all([
    prisma.municipios.findMany({
      where: zona === 'TODOS' ? {} : { zona: zona },
      skip,
      take: pageSize,
    }),
  ]);
  return (
    <>
      {municipios.map((m) => (
        <div
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:border-primary/50 transition-all group"
          key={m.cod_munic}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-card-foreground truncate">{m.municipio}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-medium">
                  {m.zona}
                </span>
                <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                  {m.departamento}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <code className="text-xs text-muted-foreground font-mono">#{m.cod_munic}</code>
            <AccionesMunicipios cod_munic={m.cod_munic} />
          </div>
        </div>
      ))}
    </>
  );
}
