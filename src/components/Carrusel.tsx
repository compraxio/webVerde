'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

export function Carrusel() {

  const plugin = Autoplay({ delay: 3000, stopOnInteraction: true });

  return (
    <Carousel className="w-full max-w-48 sm:max-w-xs h-full" plugins={[plugin]}>
      <CarouselContent>
        <CarouselItem className="flex aspect-square items-center justify-center p-6">
          <Image
            src="https://gs2sg87dcifti8xw.public.blob.vercel-storage.com/Cardique.png"
            alt="Cardique"
            height={1024}
            width={1024}
            className="rounded-4xl border shadow"
          />
        </CarouselItem>
        <CarouselItem className="flex aspect-square items-center justify-center p-6">
          <Image
            src="https://gs2sg87dcifti8xw.public.blob.vercel-storage.com/Cardique2.png"
            alt="Cardique"
            height={1024}
            width={1024}
            className="rounded-4xl border shadow"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
