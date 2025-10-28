// Custom hook for authentication state management

import { useState, useEffect } from 'react';
import { authService } from '../services';
import { AuthState, User, LoginCredentials, RegisterData } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = authService.onAuthStateChange(setAuthState);
    
    // Get initial auth state
    setAuthState(authService.getAuthState());

    return unsubscribe;
  }, []);

  const login = async (credentials: LoginCredentials): Promise<User> => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterData): Promise<User> => {
    try {
      return await authService.register(userData);
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      authService.logout();
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<User> => {
    try {
      return await authService.updateProfile(userData);
    } catch (error) {
      throw error;
    }
  };

  return {
    // State
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    
    // Utilities
    userId: authState.user?.id || null,
    isLoggedIn: authState.isAuthenticated && !!authState.user
  };
};