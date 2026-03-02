import { Client } from '@googlemaps/google-maps-services-js';
import { NextResponse } from 'next/server';

const client = new Client({});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const origen = searchParams.get('origen')?.trim();
  const destino = searchParams.get('destino')?.trim();
  const modo = searchParams.get('mode')?.trim() || 'driving';
  const alternativas = searchParams.get('alternativas') === 'true';

  // Validar entrada
  if (!origen || !destino) {
    return NextResponse.json({ ok: false, message: 'Falta origen o destino' }, { status: 400 });
  }

  if (origen.length > 200 || destino.length > 200 || modo.length > 200) {
    return NextResponse.json({ ok: false, message: 'Parámetros muy largos' }, { status: 400 });
  }

  if (!process.env.GOOGLE_MAPS_API_KEY) {
    return NextResponse.json({ ok: false, message: 'Error del servidor' }, { status: 500 });
  }

  try {
    const response = await client.directions({
      params: {
        origin: origen,
        destination: destino,
        mode: modo as any,
        alternatives: alternativas,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    // Validar que existan rutas
    if (!response.data.routes || response.data.routes.length === 0) {
      return NextResponse.json({ ok: false, message: 'No se encontró ruta' }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      message: response.data.routes,
    });
  } catch (error) {
    console.error('Google Maps error:', error);
    return NextResponse.json(
      { ok: false, message: 'Error al procesar la solicitud' },
      { status: 500 },
    );
  }
}
