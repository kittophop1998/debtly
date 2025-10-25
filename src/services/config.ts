// Base API configuration and utilities

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  WEBSOCKET_URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
  TIMEOUT: 10000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      PROFILE: '/auth/profile'
    },
    ACTIVITIES: {
      BASE: '/activities',
      SEARCH: '/activities/search',
      JOIN: (id: string) => `/activities/${id}/join`,
      LEAVE: (id: string) => `/activities/${id}/leave`,
      BY_USER: (userId: string) => `/activities/user/${userId}`
    },
    CHAT: {
      ROOMS: '/chat/rooms',
      MESSAGES: (roomId: string) => `/chat/rooms/${roomId}/messages`,
      SEND: (roomId: string) => `/chat/rooms/${roomId}/send`
    },
    USERS: {
      BASE: '/users',
      PROFILE: (id: string) => `/users/${id}`,
      UPDATE_PROFILE: '/users/profile'
    }
  }
} as const;

export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  cache?: RequestCache;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const handleApiError = (error: any): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }
  
  // Handle axios errors
  if (error.isAxiosError) {
    if (error.response) {
      // Server responded with error status
      return new ApiError(
        error.response.data?.message || 'An error occurred',
        error.response.status,
        error.response.statusText,
        error.response.data
      );
    } else if (error.request) {
      // Request was made but no response received
      return new ApiError('Network error', 0, 'Network Error');
    } else {
      // Something else happened
      return new ApiError(error.message || 'Request failed', 0, 'Request Error');
    }
  }
  
  // Fallback for other types of errors
  return new ApiError(error.message || 'Unknown error', 0, 'Unknown Error');
};