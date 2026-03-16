import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    // Validar entrada
    if (!password || typeof password !== 'string') {
      return NextResponse.json({ success: false, message: 'Datos inválidos' }, { status: 400 });
    }

    // Comparación constante (evita timing attacks)
    const isValid = await bcrypt.compare(password, `$2b$10$yFM4W${process.env.ADMIN_PASSWORD}`);

    if (isValid) {
      // Set cookie segura
      const isProduction = process.env.NODE_ENV === 'production';

      (await cookies()).set('admin', 'Consedido', {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
      });

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

export async function DELETE() {
  (await cookies()).delete('admin');
  return NextResponse.json({ success: true, message: 'Des autenticado' }, { status: 200 });
}
