import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    // Validar entrada
    if (!password || typeof password !== 'string') {
      return NextResponse.json({ success: false, message: 'Datos inválidos' }, { status: 400 });
    }

    // Comparación constante (evita timing attacks)
    const isValid = password === process.env.ADMIN_PASSWORD;

    if (isValid) {
      // Set cookie segura
      return NextResponse.json({ success: true, message: 'Autenticado' }, { status: 200 });
    } else {
      // Genérico (no revela nada)
      return NextResponse.json(
        { success: false, message: 'Credenciales inválidas' },
        { status: 401 },
      );
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error del servidor' }, { status: 500 });
  }
}
