// Activity Service for managing activities

import { BaseApiService } from './base';
import { API_CONFIG } from './config';
import { 
  Activity, 
  CreateActivityData, 
  UpdateActivityData,
  ActivityFilter,
  ApiResponse,
  PaginatedResponse,
  User
} from '../types';

export class ActivityService extends BaseApiService {
  private static instance: ActivityService;

  public static getInstance(): ActivityService {
    if (!ActivityService.instance) {
      ActivityService.instance = new ActivityService();
    }
    return ActivityService.instance;
  }

  // Get all activities with optional filtering and pagination
  public async getActivities(
    filter: ActivityFilter = {},
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Activity>> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.fromEntries(
        Object.entries(filter).filter(([_, value]) => 
          value !== undefined && value !== null && value !== ''
        ).map(([key, value]) => [key, String(value)])
      )
    });

    const response = await this.get<ApiResponse<PaginatedResponse<Activity>>>(
      `${API_CONFIG.ENDPOINTS.ACTIVITIES.BASE}?${queryParams}`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch activities');
  }

  // Search activities
  public async searchActivities(
    query: string,
    filter: ActivityFilter = {},
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Activity>> {
    const queryParams = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString(),
      ...Object.fromEntries(
        Object.entries(filter).filter(([_, value]) => 
          value !== undefined && value !== null && value !== ''
        ).map(([key, value]) => [key, String(value)])
      )
    });

    const response = await this.get<ApiResponse<PaginatedResponse<Activity>>>(
      `${API_CONFIG.ENDPOINTS.ACTIVITIES.SEARCH}?${queryParams}`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to search activities');
  }

  // Get single activity by ID
  public async getActivity(id: string): Promise<Activity> {
    const response = await this.get<ApiResponse<Activity>>(
      `${API_CONFIG.ENDPOINTS.ACTIVITIES.BASE}/${id}`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch activity');
  }

  // Create new activity
  public async createActivity(activityData: CreateActivityData): Promise<Activity> {
    const response = await this.post<ApiResponse<Activity>>(
      API_CONFIG.ENDPOINTS.ACTIVITIES.BASE,
      activityData
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to create activity');
  }

  // Update activity
  public async updateActivity(activityData: UpdateActivityData): Promise<Activity> {
    const { id, ...updateData } = activityData;
    
    const response = await this.put<ApiResponse<Activity>>(
      `${API_CONFIG.ENDPOINTS.ACTIVITIES.BASE}/${id}`,
      updateData
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to update activity');
  }

  // Delete activity
  public async deleteActivity(id: string): Promise<void> {
    const response = await this.delete<ApiResponse<void>>(
      `${API_CONFIG.ENDPOINTS.ACTIVITIES.BASE}/${id}`
    );

    if (!response.success) {
      throw new Error(response.message || 'Failed to delete activity');
    }
  }

  // Join activity
  public async joinActivity(activityId: string): Promise<Activity> {
    const response = await this.post<ApiResponse<Activity>>(
      API_CONFIG.ENDPOINTS.ACTIVITIES.JOIN(activityId)
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to join activity');
  }

  // Leave activity
  public async leaveActivity(activityId: string): Promise<Activity> {
    const response = await this.delete<ApiResponse<Activity>>(
      API_CONFIG.ENDPOINTS.ACTIVITIES.LEAVE(activityId)
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to leave activity');
  }

  // Get activities by user
  public async getUserActivities(
    userId: string,
    type: 'created' | 'joined' | 'all' = 'all',
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Activity>> {
    const queryParams = new URLSearchParams({
      type,
      page: page.toString(),
      limit: limit.toString()
    });

    const response = await this.get<ApiResponse<PaginatedResponse<Activity>>>(
      `${API_CONFIG.ENDPOINTS.ACTIVITIES.BY_USER(userId)}?${queryParams}`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch user activities');
  }

  // Get activity participants
  public async getActivityParticipants(activityId: string): Promise<User[]> {
    const response = await this.get<ApiResponse<User[]>>(
      `${API_CONFIG.ENDPOINTS.ACTIVITIES.BASE}/${activityId}/participants`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch participants');
  }

  // Upload activity image
  public async uploadActivityImage(activityId: string, imageFile: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await this.uploadFormData<ApiResponse<{ imageUrl: string }>>(
      `${API_CONFIG.ENDPOINTS.ACTIVITIES.BASE}/${activityId}/image`,
      formData
    );

    if (response.success && response.data) {
      return response.data.imageUrl;
    }

    throw new Error(response.message || 'Failed to upload image');
  }

  // Get activity feed (recommended activities)
  public async getActivityFeed(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Activity>> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });

    const response = await this.get<ApiResponse<PaginatedResponse<Activity>>>(
      `${API_CONFIG.ENDPOINTS.ACTIVITIES.BASE}/feed?${queryParams}`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch activity feed');
  }
}

// Export singleton instance
export const activityService = ActivityService.getInstance();