import { create } from 'zustand';
import axios from 'axios';
import { Auth } from '@/types/authType';

interface AuthState {
  login: (password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<{ success: boolean; message: string }>;
}

export const useAuthStore = create<AuthState>()(
  (set, get) => ({
    login: async (password: string) => {
      try {
        const response = await axios.post('/api/auth', { password });
        const data: Auth = response.data;

        if (data.success) {
          return {
            success: true,
            message: data.message || 'Inicio de sesión exitoso',
          };
        }

        return {
          success: false,
          message: data.message || 'Error desconocido al iniciar sesión',
        };
      } catch (error) {
        if (error instanceof Error) {
          return {
            success: false,
            message: error.message || 'Error desconocido al iniciar sesión',
          };
        }
        return {
          success: false,
          message: 'Error de conexión con el servidor',
        };
      }
    },

    logout: async () => {
      try {
        const response = await axios.delete('/api/auth');
        const data: Auth = response.data;

        if (data.success) {
          return {
            success: true,
            message: data.message || 'Saliste correctamente',
          };
        }
      } catch (error) {
        if (error instanceof Error) {
          return {
            success: false,
            message: error.message || 'Error desconocido al iniciar sesión',
          };
        }
        return {
          success: false,
          message: 'Error de conexión con el servidor',
        };
      }

      return {
        success: true,
        message: 'Cierre de sesión exitoso',
      };
    },
  }),
);
