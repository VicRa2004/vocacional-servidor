import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string | number;
  nombre: string;
  correo: string;
  rol: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setAuthData: (token: string, user: User) => void;
  logout: () => void;
  clearAuthData: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      hasHydrated: false,

      setAuthData: (token: string, user: User) => {
        set({
          token,
          user,
          isAuthenticated: true
        });
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false
        });
      },

      clearAuthData: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false
        });
      },

      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state });
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
