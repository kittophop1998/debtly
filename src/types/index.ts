// Core types for Debtly application

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: ActivityType;
  location: Location;
  dateTime: string;
  duration: number; // in minutes
  maxParticipants: number;
  currentParticipants: number;
  createdBy: string;
  creatorDetails: User;
  participants: User[];
  tags: string[];
  status: ActivityStatus;
  chatRoomId: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface ChatRoom {
  id: string;
  activityId: string;
  messages: Message[];
  participants: User[];
  createdAt: string;
}

export interface Message {
  id: string;
  roomId: string;
  userId: string;
  userDetails: User;
  content: string;
  type: MessageType;
  timestamp: string;
  edited?: boolean;
  editedAt?: string;
}

export interface ActivityFilter {
  type?: ActivityType;
  location?: string;
  dateFrom?: string;
  dateTo?: string;
  tags?: string[];
  maxParticipants?: number;
  status?: ActivityStatus;
}

// Enums
export enum ActivityType {
  OUTDOOR = 'outdoor',
  INDOOR = 'indoor',
  SPORT = 'sport',
  FOOD = 'food',
  CULTURAL = 'cultural',
  ENTERTAINMENT = 'entertainment',
  LEARNING = 'learning',
  TRAVEL = 'travel',
  OTHER = 'other'
}

export enum ActivityStatus {
  ACTIVE = 'active',
  FULL = 'full',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  SYSTEM = 'system',
  JOIN = 'join',
  LEAVE = 'leave'
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  displayName: string;
}

// Activity form types
export interface CreateActivityData {
  title: string;
  description: string;
  type: ActivityType;
  location: Location;
  dateTime: string;
  duration: number;
  maxParticipants: number;
  tags: string[];
  imageUrl?: string;
}

export interface UpdateActivityData extends Partial<CreateActivityData> {
  id: string;
}