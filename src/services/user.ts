// User Service for managing user profiles and relationships

import { BaseApiService } from './base';
import { API_CONFIG } from './config';
import { 
  User, 
  ApiResponse,
  PaginatedResponse
} from '../types';

export class UserService extends BaseApiService {
  private static instance: UserService;

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  // Get user profile by ID
  public async getUserProfile(userId: string): Promise<User> {
    const response = await this.get<ApiResponse<User>>(
      API_CONFIG.ENDPOINTS.USERS.PROFILE(userId)
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch user profile');
  }

  // Search users
  public async searchUsers(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<User>> {
    const queryParams = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString()
    });

    const response = await this.get<ApiResponse<PaginatedResponse<User>>>(
      `${API_CONFIG.ENDPOINTS.USERS.BASE}/search?${queryParams}`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to search users');
  }

  // Upload profile avatar
  public async uploadAvatar(imageFile: File): Promise<string> {
    const formData = new FormData();
    formData.append('avatar', imageFile);

    const response = await this.uploadFormData<ApiResponse<{ avatarUrl: string }>>(
      `${API_CONFIG.ENDPOINTS.USERS.BASE}/avatar`,
      formData
    );

    if (response.success && response.data) {
      return response.data.avatarUrl;
    }

    throw new Error(response.message || 'Failed to upload avatar');
  }

  // Get user activity statistics
  public async getUserStats(userId: string): Promise<{
    activitiesCreated: number;
    activitiesJoined: number;
    totalActivities: number;
    completedActivities: number;
  }> {
    const response = await this.get<ApiResponse<{
      activitiesCreated: number;
      activitiesJoined: number;
      totalActivities: number;
      completedActivities: number;
    }>>(
      `${API_CONFIG.ENDPOINTS.USERS.PROFILE(userId)}/stats`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch user statistics');
  }

  // Follow/Unfollow functionality (if needed for future features)
  public async followUser(userId: string): Promise<void> {
    const response = await this.post<ApiResponse<void>>(
      `${API_CONFIG.ENDPOINTS.USERS.BASE}/${userId}/follow`
    );

    if (!response.success) {
      throw new Error(response.message || 'Failed to follow user');
    }
  }

  public async unfollowUser(userId: string): Promise<void> {
    const response = await this.delete<ApiResponse<void>>(
      `${API_CONFIG.ENDPOINTS.USERS.BASE}/${userId}/follow`
    );

    if (!response.success) {
      throw new Error(response.message || 'Failed to unfollow user');
    }
  }

  public async getFollowers(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<User>> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });

    const response = await this.get<ApiResponse<PaginatedResponse<User>>>(
      `${API_CONFIG.ENDPOINTS.USERS.PROFILE(userId)}/followers?${queryParams}`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch followers');
  }

  public async getFollowing(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<User>> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });

    const response = await this.get<ApiResponse<PaginatedResponse<User>>>(
      `${API_CONFIG.ENDPOINTS.USERS.PROFILE(userId)}/following?${queryParams}`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch following');
  }

  // Block/Unblock users
  public async blockUser(userId: string): Promise<void> {
    const response = await this.post<ApiResponse<void>>(
      `${API_CONFIG.ENDPOINTS.USERS.BASE}/${userId}/block`
    );

    if (!response.success) {
      throw new Error(response.message || 'Failed to block user');
    }
  }

  public async unblockUser(userId: string): Promise<void> {
    const response = await this.delete<ApiResponse<void>>(
      `${API_CONFIG.ENDPOINTS.USERS.BASE}/${userId}/block`
    );

    if (!response.success) {
      throw new Error(response.message || 'Failed to unblock user');
    }
  }

  public async getBlockedUsers(
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<User>> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });

    const response = await this.get<ApiResponse<PaginatedResponse<User>>>(
      `${API_CONFIG.ENDPOINTS.USERS.BASE}/blocked?${queryParams}`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch blocked users');
  }
}

// Export singleton instance
export const userService = UserService.getInstance();