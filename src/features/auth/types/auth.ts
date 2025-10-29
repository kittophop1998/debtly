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