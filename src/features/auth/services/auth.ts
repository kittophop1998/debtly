// Authentication Service

import { BaseApiService } from './base';
import { API_CONFIG } from './config';
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  ApiResponse,
  AuthState 
} from '../types';

export class AuthService extends BaseApiService {
  private static instance: AuthService;
  private authStateListeners: ((state: AuthState) => void)[] = [];
  private currentAuthState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false
  };

  constructor() {
    super();
    this.initializeAuth();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Initialize auth state from localStorage
  private async initializeAuth(): Promise<void> {
    this.setAuthState({ ...this.currentAuthState, isLoading: true });
    
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const user = await this.getCurrentUser();
        this.setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        this.setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      this.logout();
    }
  }

  // Auth state management
  private setAuthState(newState: AuthState): void {
    this.currentAuthState = newState;
    this.authStateListeners.forEach(listener => listener(newState));
  }

  public onAuthStateChange(listener: (state: AuthState) => void): () => void {
    this.authStateListeners.push(listener);
    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(listener);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  public getAuthState(): AuthState {
    return { ...this.currentAuthState };
  }

  // Authentication methods
  public async login(credentials: LoginCredentials): Promise<User> {
    this.setAuthState({ ...this.currentAuthState, isLoading: true });
    
    try {
      const response = await this.post<ApiResponse<{ user: User; token: string }>>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      if (response.success && response.data) {
        const { user, token } = response.data;
        localStorage.setItem('authToken', token);
        
        this.setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });

        return user;
      }

      throw new Error(response.message || 'Login failed');
    } catch (error) {
      this.setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
      throw error;
    }
  }

  public async register(userData: RegisterData): Promise<User> {
    this.setAuthState({ ...this.currentAuthState, isLoading: true });
    
    try {
      const response = await this.post<ApiResponse<{ user: User; token: string }>>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        userData
      );

      if (response.success && response.data) {
        const { user, token } = response.data;
        localStorage.setItem('authToken', token);
        
        this.setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });

        return user;
      }

      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      this.setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      this.setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }

  public async getCurrentUser(): Promise<User> {
    const response = await this.get<ApiResponse<User>>(
      API_CONFIG.ENDPOINTS.AUTH.PROFILE
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to get user profile');
  }

  public async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await this.put<ApiResponse<User>>(
      API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE,
      userData
    );

    if (response.success && response.data) {
      this.setAuthState({
        ...this.currentAuthState,
        user: response.data
      });
      return response.data;
    }

    throw new Error(response.message || 'Failed to update profile');
  }

  public async refreshToken(): Promise<string> {
    const response = await this.post<ApiResponse<{ token: string }>>(
      API_CONFIG.ENDPOINTS.AUTH.REFRESH
    );

    if (response.success && response.data) {
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      return token;
    }

    throw new Error('Failed to refresh token');
  }

  // Utility methods
  public isAuthenticated(): boolean {
    return this.currentAuthState.isAuthenticated;
  }

  public getCurrentUserId(): string | null {
    return this.currentAuthState.user?.id || null;
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();