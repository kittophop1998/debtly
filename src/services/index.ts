// Services barrel export

export { BaseApiService } from './base';
export { API_CONFIG, ApiError, type RequestConfig } from './config';

// Service instances
export { authService, AuthService } from './auth';
export { activityService, ActivityService } from './activity';
export { chatService, ChatService } from './chat';
export { userService, UserService } from './user';

// Service types
export type {
  AuthState
} from '@/features/auth/types/auth';