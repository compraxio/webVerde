import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { password } = await request.json();
  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({
      success: true,
      message: 'Inicio de sesión exitoso',
    });
  } else {
    return NextResponse.json({
      success: false,
      message: 'Contraseña incorrecta',
    })
  }
}
