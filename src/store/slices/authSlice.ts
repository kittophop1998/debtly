import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

// Function to get initial state from localStorage if available
const getInitialState = (): AuthState => {
    if (typeof window !== 'undefined') {
        try {
            const storedAuth = localStorage.getItem('auth');
            if (storedAuth) {
                const parsedAuth = JSON.parse(storedAuth);
                return {
                    ...parsedAuth,
                    isLoading: false, // Always start with loading false
                };
            }
        } catch (error) {
            console.warn('Error reading auth from localStorage:', error);
        }
    }
    
    return {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
    };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState(state, action: PayloadAction<AuthState>) {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.isLoading = action.payload.isLoading;
            
            // Save to localStorage
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('auth', JSON.stringify({
                        token: state.token,
                        user: state.user,
                        isAuthenticated: state.isAuthenticated,
                        isLoading: false, // Don't persist loading state
                    }));
                } catch (error) {
                    console.warn('Error saving auth to localStorage:', error);
                }
            }
        },
        clearAuthState(state) {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            
            // Clear from localStorage
            if (typeof window !== 'undefined') {
                try {
                    localStorage.removeItem('auth');
                } catch (error) {
                    console.warn('Error clearing auth from localStorage:', error);
                }
            }
        },
        login(state, action: PayloadAction<{ token: string; user: User }>) {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isLoading = false;
            
            // Save to localStorage
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('auth', JSON.stringify({
                        token: state.token,
                        user: state.user,
                        isAuthenticated: state.isAuthenticated,
                        isLoading: false,
                    }));
                } catch (error) {
                    console.warn('Error saving auth to localStorage:', error);
                }
            }
        },
        logout(state) {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            
            // Clear from localStorage
            if (typeof window !== 'undefined') {
                try {
                    localStorage.removeItem('auth');
                } catch (error) {
                    console.warn('Error clearing auth from localStorage:', error);
                }
            }
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    }
});

export const { setAuthState, clearAuthState, login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;