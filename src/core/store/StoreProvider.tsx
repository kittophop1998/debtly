'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from './authStore';

interface StoreProviderProps {
  children: React.ReactNode;
}

// Initialize stores on app start
const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const checkAuthStatus = useAuthStore(state => state.checkAuthStatus);

  useEffect(() => {
    // Initialize auth state from localStorage
    checkAuthStatus();

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      // Apply theme logic if needed
    }

    // Initialize language from localStorage
    const savedLanguage = localStorage.getItem('language') as 'en' | 'th' | null;
    if (savedLanguage) {
      // Apply language logic if needed
    }
  }, [checkAuthStatus]);

  return <>{children}</>;
};

export default StoreProvider;