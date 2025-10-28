import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

// UI State Types
export interface ModalState {
  type: 'add-debt' | 'edit-debt' | 'payment' | 'confirm-delete' | null;
  data?: Record<string, unknown>;
}

export interface ToastState {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface UIState {
  // Modal management
  modal: ModalState;
  
  // Toast notifications
  toasts: ToastState[];
  
  // Loading states
  globalLoading: boolean;
  
  // Theme
  theme: 'light' | 'dark' | 'system';
  
  // Language
  language: 'en' | 'th';
  
  // Sidebar (for dashboard)
  sidebarOpen: boolean;
}

export interface UIActions {
  // Modal actions
  openModal: (type: ModalState['type'], data?: Record<string, unknown>) => void;
  closeModal: () => void;
  
  // Toast actions
  showToast: (toast: Omit<ToastState, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  
  // Loading actions
  setGlobalLoading: (loading: boolean) => void;
  
  // Theme actions
  setTheme: (theme: UIState['theme']) => void;
  
  // Language actions
  setLanguage: (language: UIState['language']) => void;
  
  // Sidebar actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

// UI Store
export const useUIStore = create<UIState & UIActions>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // State
      modal: { type: null },
      toasts: [],
      globalLoading: false,
      theme: 'system',
      language: 'th', // Default to Thai
      sidebarOpen: true,

      // Actions
      openModal: (type, data) => {
        set({ modal: { type, data } });
      },

      closeModal: () => {
        set({ modal: { type: null } });
      },

      showToast: (toast) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast: ToastState = {
          ...toast,
          id,
          duration: toast.duration || 5000,
        };

        set(state => ({
          toasts: [...state.toasts, newToast],
        }));

        // Auto remove toast after duration
        setTimeout(() => {
          get().removeToast(id);
        }, newToast.duration);
      },

      removeToast: (id) => {
        set(state => ({
          toasts: state.toasts.filter(toast => toast.id !== id),
        }));
      },

      clearToasts: () => {
        set({ toasts: [] });
      },

      setGlobalLoading: (globalLoading) => {
        set({ globalLoading });
      },

      setTheme: (theme) => {
        set({ theme });
        localStorage.setItem('theme', theme);
      },

      setLanguage: (language) => {
        set({ language });
        localStorage.setItem('language', language);
      },

      toggleSidebar: () => {
        set(state => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSidebarOpen: (sidebarOpen) => {
        set({ sidebarOpen });
      },
    })),
    {
      name: 'ui-store',
    }
  )
);

// Selector hooks for better performance
export const useModal = () => useUIStore((state) => state.modal);
export const useToasts = () => useUIStore((state) => state.toasts);
export const useTheme = () => useUIStore((state) => state.theme);
export const useLanguage = () => useUIStore((state) => state.language);
export const useSidebar = () => useUIStore((state) => state.sidebarOpen);