import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';
import { Auth } from '@/types/authType';
interface AuthState {
  isAuthenticated: boolean;
  login: (password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => { success: boolean; message: string };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,

      login: async (password: string) => {
        if (get().isAuthenticated) {
          return {
            success: true,
            message: 'Ya estás autenticado',
          };
        }

        try {
          const response = await axios.post('/api/auth', { password });
          const data: Auth = response.data;

          if (data.success) {
            set({ isAuthenticated: true });
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
          if( error instanceof Error) {
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

      logout: () => {
        if (!get().isAuthenticated) {
          return {
            success: false,
            message: 'No hay una sesión activa',
          };
        }

        set({ isAuthenticated: false });

        return {
          success: true,
          message: 'Cierre de sesión exitoso',
        };
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
