# Go Mate Frontend

A scalable Next.js application for activity discovery and real-time communication.

## Project Overview

Go Mate is a web application that allows users to:
- Create, discover, and join activities
- Real-time chat in activity rooms
- Manage user profiles and social connections  
- Browse and search activities with advanced filtering

## Architecture

This frontend is built with scalability and reusability in mind, following modern React patterns and best practices.

### Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context (ready for Zustand migration)
- **HTTP Client**: Custom service layer with fetch API
- **WebSocket**: Socket.io-client for real-time features
- **Form Handling**: React Hook Form with Yup validation (when dependencies are installed)

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Card, etc.)
│   ├── auth/           # Authentication components
│   ├── activities/     # Activity-related components
│   ├── chat/           # Chat components
│   └── layout/         # Layout components (Navbar, Sidebar, etc.)
├── services/           # API service layer
│   ├── base.ts         # Base API service class
│   ├── config.ts       # API configuration
│   ├── auth.ts         # Authentication service
│   ├── activity.ts     # Activity service
│   ├── chat.ts         # Chat service (WebSocket + HTTP)
│   └── user.ts         # User service
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication hook
│   ├── useActivities.ts # Activity management hooks
│   ├── useChat.ts      # Chat functionality hooks
│   └── utility hooks...
├── types/              # TypeScript type definitions
├── lib/                # Utility functions and constants
├── store/              # Global state management
└── app/                # Next.js app directory
```

## Services Architecture

### Base Service Layer

All API communications go through a base service class that provides:
- Consistent error handling
- Authentication header management
- Request/response interceptors
- Timeout handling
- Type safety

### Service Instances (Singletons)

- **AuthService**: Handles authentication, token management, and user state
- **ActivityService**: Manages CRUD operations for activities
- **ChatService**: Combines WebSocket for real-time chat and HTTP for message history
- **UserService**: User profile and relationship management

### Real-time Features

The ChatService integrates both WebSocket and HTTP:
- WebSocket for real-time messaging
- HTTP fallback for message sending
- Automatic reconnection
- Room management
- Message history pagination

## Custom Hooks

The application uses custom hooks for clean separation of concerns:

- `useAuth()` - Authentication state and actions
- `useActivities()` - Activity list management with pagination
- `useActivity()` - Single activity management
- `useChat()` - Real-time chat functionality
- Utility hooks: `useDebounce`, `useLocalStorage`, `useInfiniteScroll`

## State Management

Currently using React Context with useReducer for global state. The architecture is designed to easily migrate to Zustand or Redux if needed.

Global state includes:
- Authentication state
- Theme preferences
- UI state (sidebar, notifications)
- Search history

## Component Design

### UI Components

Reusable, accessible components built with Tailwind CSS:
- Consistent API across all components
- Proper TypeScript interfaces
- Responsive design
- Accessibility considerations

### Feature Components

Domain-specific components that compose UI components:
- `ActivityCard` - Display activity information
- `ChatMessage` - Render chat messages
- `LoginForm` - Authentication form
- `Navbar` - Application navigation

## Getting Started

### Prerequisites

Make sure you have Node.js installed (version 18 or higher).

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Configure the following variables:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

Create a production build:
```bash
npm run build
npm start
```

## API Integration

The services are designed to work with a REST API that provides:

### Authentication Endpoints
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`
- `GET /auth/profile`

### Activity Endpoints
- `GET /activities` - List activities with filtering
- `POST /activities` - Create activity
- `GET /activities/:id` - Get activity details
- `PUT /activities/:id` - Update activity
- `DELETE /activities/:id` - Delete activity
- `POST /activities/:id/join` - Join activity
- `DELETE /activities/:id/leave` - Leave activity

### Chat Endpoints
- `GET /chat/rooms/:id` - Get chat room
- `GET /chat/rooms/:id/messages` - Get message history
- WebSocket connection for real-time messaging

## Future Enhancements

The architecture supports easy addition of:
- Push notifications
- File upload functionality
- Advanced search and filtering
- Social features (following, likes)
- Mobile app integration
- Offline support

## Contributing

1. Follow the established patterns for new features
2. Use TypeScript strictly
3. Write custom hooks for complex logic
4. Keep components small and focused
5. Use the service layer for all API calls
6. Test your components and hooks

## Directory Conventions

- Use kebab-case for file names
- Use PascalCase for component names
- Keep components under 200 lines
- Separate concerns: UI, logic, and data
- Export components as default exports
- Use barrel exports for index files