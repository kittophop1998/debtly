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
      dispatch(setAuthState({ 
        token, 
        user, 
        isAuthenticated, 
        isLoading: true 
      }));

      // Mock authentication logic - แทนที่ด้วย API call จริง
      if (username === 'admin' && password === 'password') {
        const mockUser: User = {
          id: '1',
          email: 'admin@example.com',
          username: 'admin',
          displayName: 'Admin User',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const mockToken = 'mock-token-123';
        
        dispatch(login({ token: mockToken, user: mockUser }));
        return true;
      } else {
        dispatch(setAuthState({ 
          token, 
          user, 
          isAuthenticated, 
          isLoading: false 
        }));
        return false;
      }
    } catch {
      dispatch(setAuthState({ 
        token, 
        user, 
        isAuthenticated, 
        isLoading: false 
      }));
      return false;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const setLoading = (loading: boolean) => {
    dispatch(setAuthState({ 
      token, 
      user, 
      isAuthenticated, 
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
    setLoading,
  };
};