// Main components barrel export

// UI Components
export * from './ui';

// Layout Components
export { default as Navbar } from './layout/Navbar';
export { default as Header } from './layout/Header';

// Auth Components
export { AuthProvider, useAuthContext } from './auth/AuthProvider';
export { default as ProtectedRoute } from './auth/ProtectedRoute';
export { default as PublicRoute } from './auth/PublicRoute';

// Activity Components
export { default as ActivityCard } from './activities/ActivityCard';

// Chat Components
export { default as ChatMessage } from './chat/ChatMessage';