// Custom hook for activity management

import { useState, useEffect, useCallback } from 'react';
// import { activityService } from '../services';
import { mockApiResponse, mockActivities } from '../lib/mockData';
import { 
  Activity, 
  CreateActivityData, 
  UpdateActivityData,
  ActivityFilter,
  PaginatedResponse
} from '../types';

interface UseActivitiesOptions {
  filter?: ActivityFilter;
  autoFetch?: boolean;
  initialPage?: number;
  limit?: number;
}

export const useActivities = (options: UseActivitiesOptions = {}) => {
  const { 
    filter = {}, 
    autoFetch = true, 
    initialPage = 1, 
    limit = 10 
  } = options;

  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit,
    total: 0,
    totalPages: 0
  });

  const fetchActivities = useCallback(async (page: number = 1, reset: boolean = true) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter mock data based on filter
      let filteredActivities = [...mockActivities];
      
      if (filter.type) {
        filteredActivities = filteredActivities.filter(activity => activity.type === filter.type);
      }
      
      // Simulate pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = filteredActivities.slice(startIndex, endIndex);
      
      const response = {
        data: paginatedData,
        pagination: {
          page,
          limit,
          total: filteredActivities.length,
          totalPages: Math.ceil(filteredActivities.length / limit)
        }
      };
      
      if (reset) {
        setActivities(response.data);
      } else {
        setActivities(prev => [...prev, ...response.data]);
      }
      
      setPagination(response.pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch activities');
    } finally {
      setLoading(false);
    }
  }, [filter, limit]);

  const searchActivities = useCallback(async (
    query: string, 
    searchFilter: ActivityFilter = {},
    page: number = 1,
    reset: boolean = true
  ) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Filter and search mock data
      let filteredActivities = [...mockActivities];
      
      // Apply search query
      if (query.trim()) {
        filteredActivities = filteredActivities.filter(activity =>
          activity.title.toLowerCase().includes(query.toLowerCase()) ||
          activity.description.toLowerCase().includes(query.toLowerCase()) ||
          activity.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
      }
      
      // Apply filters
      const combinedFilter = { ...filter, ...searchFilter };
      if (combinedFilter.type) {
        filteredActivities = filteredActivities.filter(activity => activity.type === combinedFilter.type);
      }
      
      // Simulate pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = filteredActivities.slice(startIndex, endIndex);
      
      const response = {
        data: paginatedData,
        pagination: {
          page,
          limit,
          total: filteredActivities.length,
          totalPages: Math.ceil(filteredActivities.length / limit)
        }
      };
      
      if (reset) {
        setActivities(response.data);
      } else {
        setActivities(prev => [...prev, ...response.data]);
      }
      
      setPagination(response.pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to search activities');
    } finally {
      setLoading(false);
    }
  }, [filter, limit]);

  const loadMore = useCallback(() => {
    if (pagination.page < pagination.totalPages && !loading) {
      fetchActivities(pagination.page + 1, false);
    }
  }, [pagination.page, pagination.totalPages, loading, fetchActivities]);

  const refresh = useCallback(() => {
    fetchActivities(1, true);
  }, [fetchActivities]);

  const hasMore = pagination.page < pagination.totalPages;

  useEffect(() => {
    if (autoFetch) {
      fetchActivities();
    }
  }, [autoFetch, fetchActivities]);

  return {
    activities,
    loading,
    error,
    pagination,
    hasMore,
    fetchActivities,
    searchActivities,
    loadMore,
    refresh
  };
};

export const useActivity = (activityId: string | null) => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivity = useCallback(async () => {
    if (!activityId) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const fetchedActivity = mockActivities.find(a => a.id === activityId);
      if (fetchedActivity) {
        setActivity(fetchedActivity);
      } else {
        throw new Error('Activity not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch activity');
    } finally {
      setLoading(false);
    }
  }, [activityId]);

  const createActivity = async (activityData: CreateActivityData): Promise<Activity> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, just return a mock activity
      const newActivity: Activity = {
        ...activityData,
        id: Date.now().toString(),
        currentParticipants: 1,
        createdBy: 'current-user',
        creatorDetails: {
          id: 'current-user',
          email: 'user@example.com',
          username: 'current_user',
          displayName: 'Current User',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        participants: [],
        status: 'active' as any,
        chatRoomId: `chat_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setActivity(newActivity);
      return newActivity;
    } catch (err: any) {
      setError(err.message || 'Failed to create activity');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateActivity = async (activityData: UpdateActivityData): Promise<Activity> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (!activity) throw new Error('No activity to update');
      
      const updatedActivity = { ...activity, ...activityData, updatedAt: new Date().toISOString() };
      setActivity(updatedActivity);
      return updatedActivity;
    } catch (err: any) {
      setError(err.message || 'Failed to update activity');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteActivity = async (): Promise<void> => {
    if (!activity?.id) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setActivity(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete activity');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const joinActivity = async (): Promise<Activity | null> => {
    if (!activity?.id) return null;

    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedActivity = {
        ...activity,
        currentParticipants: activity.currentParticipants + 1,
        updatedAt: new Date().toISOString(),
      };
      
      setActivity(updatedActivity);
      return updatedActivity;
    } catch (err: any) {
      setError(err.message || 'Failed to join activity');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const leaveActivity = async (): Promise<Activity | null> => {
    if (!activity?.id) return null;

    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedActivity = {
        ...activity,
        currentParticipants: Math.max(1, activity.currentParticipants - 1),
        updatedAt: new Date().toISOString(),
      };
      
      setActivity(updatedActivity);
      return updatedActivity;
    } catch (err: any) {
      setError(err.message || 'Failed to leave activity');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  return {
    activity,
    loading,
    error,
    fetchActivity,
    createActivity,
    updateActivity,
    deleteActivity,
    joinActivity,
    leaveActivity
  };
};