"use client";
// React Context-based store for global app state

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User } from '../types';

// Types
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  timestamp: string;
  read: boolean;
}

interface AppState {
  auth: AuthState;
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  searchHistory: string[];
  notifications: Notification[];
}

type AppAction =
  | { type: 'SET_AUTH'; payload: AuthState }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'SET_SIDEBAR_OPEN'; payload: boolean }
  | { type: 'ADD_SEARCH_HISTORY'; payload: string }
  | { type: 'CLEAR_SEARCH_HISTORY' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp' | 'read'> }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'LOAD_PERSISTED_STATE'; payload: Partial<AppState> };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  setAuth: (auth: AuthState) => void;
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setSidebarOpen: (open: boolean) => void;
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// Initial state
const initialState: AppState = {
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false
  },
  theme: 'system',
  sidebarOpen: false,
  searchHistory: [],
  notifications: []
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_AUTH':
      return { ...state, auth: action.payload };
    
    case 'SET_USER':
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload,
          isAuthenticated: !!action.payload
        }
      };
    
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    
    case 'SET_SIDEBAR_OPEN':
      return { ...state, sidebarOpen: action.payload };
    
    case 'ADD_SEARCH_HISTORY':
      const filteredHistory = state.searchHistory.filter(item => item !== action.payload);
      const newHistory = [action.payload, ...filteredHistory].slice(0, 10);
      return { ...state, searchHistory: newHistory };
    
    case 'CLEAR_SEARCH_HISTORY':
      return { ...state, searchHistory: [] };
    
    case 'ADD_NOTIFICATION':
      const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newNotification: Notification = {
        ...action.payload,
        id,
        timestamp: new Date().toISOString(),
        read: false
      };
      return {
        ...state,
        notifications: [newNotification, ...state.notifications]
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload 
            ? { ...notification, read: true } 
            : notification
        )
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      };
    
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    
    case 'LOAD_PERSISTED_STATE':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted state from localStorage
  useEffect(() => {
    try {
      const persistedState = localStorage.getItem('wegowhere-storage');
      if (persistedState) {
        const parsed = JSON.parse(persistedState);
        dispatch({ type: 'LOAD_PERSISTED_STATE', payload: parsed });
      }
    } catch (error) {
      console.error('Failed to load persisted state:', error);
    }
  }, []);

  // Persist state to localStorage
  useEffect(() => {
    try {
      const stateToStore = {
        theme: state.theme,
        searchHistory: state.searchHistory
      };
      localStorage.setItem('wegowhere-storage', JSON.stringify(stateToStore));
    } catch (error) {
      console.error('Failed to persist state:', error);
    }
  }, [state.theme, state.searchHistory]);

  // Helper functions
  const setAuth = (auth: AuthState) => dispatch({ type: 'SET_AUTH', payload: auth });
  const setUser = (user: User | null) => dispatch({ type: 'SET_USER', payload: user });
  const setTheme = (theme: 'light' | 'dark' | 'system') => dispatch({ type: 'SET_THEME', payload: theme });
  const setSidebarOpen = (open: boolean) => dispatch({ type: 'SET_SIDEBAR_OPEN', payload: open });
  const addSearchHistory = (query: string) => dispatch({ type: 'ADD_SEARCH_HISTORY', payload: query });
  const clearSearchHistory = () => dispatch({ type: 'CLEAR_SEARCH_HISTORY' });
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => 
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  const markNotificationAsRead = (id: string) => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  const removeNotification = (id: string) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  const clearNotifications = () => dispatch({ type: 'CLEAR_NOTIFICATIONS' });

  const value: AppContextType = {
    state,
    dispatch,
    setAuth,
    setUser,
    setTheme,
    setSidebarOpen,
    addSearchHistory,
    clearSearchHistory,
    addNotification,
    markNotificationAsRead,
    removeNotification,
    clearNotifications
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppStore = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};

// Specific hooks for common use cases
export const useAuthState = () => {
  const { state } = useAppStore();
  return state.auth;
};

export const useTheme = () => {
  const { state, setTheme } = useAppStore();
  return { theme: state.theme, setTheme };
};

export const useSidebar = () => {
  const { state, setSidebarOpen } = useAppStore();
  return {
    isOpen: state.sidebarOpen,
    toggle: () => setSidebarOpen(!state.sidebarOpen),
    open: () => setSidebarOpen(true),
    close: () => setSidebarOpen(false)
  };
};

export const useNotifications = () => {
  const { state, addNotification, markNotificationAsRead, removeNotification, clearNotifications } = useAppStore();
  return {
    notifications: state.notifications,
    unreadCount: state.notifications.filter(n => !n.read).length,
    addNotification,
    markAsRead: markNotificationAsRead,
    remove: removeNotification,
    clear: clearNotifications
  };
};