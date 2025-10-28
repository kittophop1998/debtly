import { User } from "@/types";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}