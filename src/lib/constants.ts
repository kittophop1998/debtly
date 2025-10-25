// Constants used throughout the application

export const APP_CONFIG = {
  NAME: 'WeGoWhere',
  VERSION: '1.0.0',
  DESCRIPTION: 'Join activities and connect with others',
  SUPPORT_EMAIL: 'support@wegowhere.com'
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  LANGUAGE: 'language'
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ACTIVITIES: '/activities',
  ACTIVITY_DETAIL: (id: string) => `/activities/${id}`,
  CREATE_ACTIVITY: '/activities/create',
  EDIT_ACTIVITY: (id: string) => `/activities/${id}/edit`,
  CHAT: (roomId: string) => `/chat/${roomId}`,
  SEARCH: '/search',
  SETTINGS: '/settings'
} as const;

export const ACTIVITY_TYPES = [
  { value: 'outdoor', label: 'Outdoor', icon: '🌳' },
  { value: 'indoor', label: 'Indoor', icon: '🏠' },
  { value: 'sport', label: 'Sport', icon: '⚽' },
  { value: 'food', label: 'Food & Drink', icon: '🍕' },
  { value: 'cultural', label: 'Cultural', icon: '🎭' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { value: 'learning', label: 'Learning', icon: '📚' },
  { value: 'travel', label: 'Travel', icon: '✈️' },
  { value: 'other', label: 'Other', icon: '🌟' }
] as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  DEFAULT_PAGE: 1
} as const;

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
} as const;

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  DISPLAY_NAME_MAX_LENGTH: 50,
  ACTIVITY_TITLE_MAX_LENGTH: 100,
  ACTIVITY_DESCRIPTION_MAX_LENGTH: 1000,
  MESSAGE_MAX_LENGTH: 500
} as const;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
} as const;

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'th', name: 'ไทย' }
] as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  INVALID_FILE_TYPE: 'Invalid file type.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters.`,
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.'
} as const;

export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully!',
  ACTIVITY_CREATED: 'Activity created successfully!',
  ACTIVITY_UPDATED: 'Activity updated successfully!',
  ACTIVITY_DELETED: 'Activity deleted successfully!',
  JOINED_ACTIVITY: 'You have joined the activity!',
  LEFT_ACTIVITY: 'You have left the activity.',
  MESSAGE_SENT: 'Message sent!',
  FILE_UPLOADED: 'File uploaded successfully!',
  COPIED_TO_CLIPBOARD: 'Copied to clipboard!'
} as const;

export const CONNECTION_STATUS = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  DISCONNECTED: 'disconnected',
  RECONNECTING: 'reconnecting'
} as const;

export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  NEW_MESSAGE: 'new_message',
  USER_JOINED: 'user_joined',
  USER_LEFT: 'user_left',
  ROOM_UPDATED: 'room_updated',
  TYPING_START: 'typing_start',
  TYPING_STOP: 'typing_stop'
} as const;