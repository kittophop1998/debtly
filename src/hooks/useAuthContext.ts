import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, logout, setAuthState } from '@/store/slices/authSlice';
import { User } from '@/types';

// Interface สำหรับ useAuthContext ที่เข้ากันได้กับเดิม
export interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthContext = (): AuthContextValue => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  console.log('Auth State:', { user, token, isAuthenticated, isLoading });

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      // Set loading to true while keeping other current states
      dispatch(setAuthState({ 
        token: token || null, 
        user: user || null, 
        isAuthenticated: isAuthenticated || false, 
        isLoading: true 
      }));

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock authentication logic - แทนที่ด้วย API call จริง
      if (username === 'admin' && password === 'password') {
        const timestamp = new Date().toISOString();
        const mockUser: User = {
          id: '1',
          email: 'admin@example.com',
          username: 'admin',
          displayName: 'Admin User',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        const mockToken = `Bearer-${Math.random().toString(36).substring(7)}-${Date.now()}`;
        
        // Use the login action which will automatically set isAuthenticated to true and isLoading to false
        dispatch(login({ token: mockToken, user: mockUser }));
        return true;
      } else {
        // Login failed - clear everything and set loading to false
        dispatch(setAuthState({ 
          token: null, 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        }));
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      // Error occurred - clear everything and set loading to false
      dispatch(setAuthState({ 
        token: null, 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      }));
      return false;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSetLoading = (loading: boolean) => {
    dispatch(setAuthState({ 
      token: token || null, 
      user: user || null, 
      isAuthenticated: isAuthenticated || false, 
      isLoading: loading 
    }));
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    setLoading: handleSetLoading,
  };
};