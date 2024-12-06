import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: async (data) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
        
        toast.success('Profile updated successfully!');
      },
      deleteAccount: async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);