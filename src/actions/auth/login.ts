'use server';

import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { randomUUID } from 'node:crypto';



export async function login(contrasena: string) {
  try {
    // Validar entrada
    if (!contrasena || typeof contrasena !== 'string') {
      return { success: false, message: 'Datos inválidos' };
    }

    const isValid = await bcrypt.compare(contrasena, `$2b$10$yFM4W${process.env.ADMIN_PASSWORD}`);

    if (isValid) {
      // Set cookie segura
      const isProduction = process.env.NODE_ENV === 'production';
      const token = randomUUID();

      (await cookies()).set('admin', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
      });

      return { success: true, message: 'Autenticado' };
    } else {
      // Genérico (no revela nada)

      return {
        success: false,
        message: 'Credenciales inválidas',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error del servidor',
    };
  }
}
