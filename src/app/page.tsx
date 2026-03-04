import { Metadata } from 'next';

import { TargetaNegocios } from '@/components/targetaNegocios';

import prisma from '@/lib/prisma';
import {
  BotonAgregarNegocio,
  BotonAgregarNegocioCel,
  BotonAgregarNegocioTargeta,
} from '@/components/Admin/NegociosAuth';
import { CuerpoNegocio } from '@/components/CuerpoNegocio';

export const metadata: Metadata = {
  title: 'Directorio de Negocios Verdes Cardique',
  description:
    'Explora el directorio de negocios verdes en la jurisdicción de Cardique. Empresas comprometidas con el desarrollo sostenible y el cuidado del medio ambiente en Colombia.',
  openGraph: {
    title: 'Directorio de Negocios Verdes Cardique',
    description:
      'Empresas sostenibles en Cardique. Descubre negocios ecológicos y responsables con el medio ambiente.',
    url: 'https://web-verde.vercel.app/',
  },
};

export default async function Home() {
  const negocios = await prisma.dir_verde.findMany();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Negocios Verdes Cardique',
    description: 'Directorio de negocios verdes en Cardique',
    url: 'https://web-verde.vercel.app/',
    publisher: {
      '@type': 'Organization',
      name: 'Cardique',
    },
    areaServed: {
      '@type': 'State',
      name: 'Cartagena, Bolívar, Colombia',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://web-verde.vercel.app/buscar?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="p-6 lg:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Directorio de Negocios Verdes
            </h2>
            <p className="text-slate-500 dark:text-slate-400 italic">
              Empresas que impactan positivamente la naturaleza en la jurisdicción de Cardique.
            </p>
          </div>

          <BotonAgregarNegocio />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <TargetaNegocios />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <CuerpoNegocio negocios={negocios} />
          <BotonAgregarNegocioTargeta />
        </div>
        {/* Boton add en cel*/}
        <BotonAgregarNegocioCel />
      </div>
    </>
  );
}
