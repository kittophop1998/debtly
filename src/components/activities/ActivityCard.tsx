// Activity Card Component

import React from 'react';
import { Card, Button } from '../ui';
import { Activity, ActivityType } from '../../types';
import { useAuth } from '../../hooks';

interface ActivityCardProps {
  activity: Activity;
  onJoin?: (activityId: string) => void;
  onLeave?: (activityId: string) => void;
  onView?: (activityId: string) => void;
  loading?: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onJoin,
  onLeave,
  onView,
  loading
}) => {
  const { user, isAuthenticated } = useAuth();
  
  const isCreator = user?.id === activity.createdBy;
  const isParticipant = activity.participants.some(p => p.id === user?.id);
  const isFull = activity.currentParticipants >= activity.maxParticipants;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityTypeColor = (type: ActivityType) => {
    const colors = {
      [ActivityType.OUTDOOR]: 'bg-green-100 text-green-800',
      [ActivityType.INDOOR]: 'bg-blue-100 text-blue-800',
      [ActivityType.SPORT]: 'bg-orange-100 text-orange-800',
      [ActivityType.FOOD]: 'bg-red-100 text-red-800',
      [ActivityType.CULTURAL]: 'bg-purple-100 text-purple-800',
      [ActivityType.ENTERTAINMENT]: 'bg-pink-100 text-pink-800',
      [ActivityType.LEARNING]: 'bg-indigo-100 text-indigo-800',
      [ActivityType.TRAVEL]: 'bg-yellow-100 text-yellow-800',
      [ActivityType.OTHER]: 'bg-gray-100 text-gray-800'
    };
    return colors[type];
  };

  const handleJoinLeave = () => {
    if (isParticipant) {
      onLeave?.(activity.id);
    } else {
      onJoin?.(activity.id);
    }
  };

  return (
    <Card hover className="h-full flex flex-col">
      {activity.imageUrl && (
        <div className="w-full h-48 bg-gray-200 rounded-t-lg overflow-hidden">
          <img
            src={activity.imageUrl}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-start justify-between mb-2">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getActivityTypeColor(activity.type)}`}>
            {activity.type}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(activity.dateTime)}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {activity.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-1">
          {activity.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {activity.location.name}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            {activity.currentParticipants}/{activity.maxParticipants} participants
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            by {activity.creatorDetails.displayName}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView?.(activity.id)}
            className="flex-1"
          >
            View Details
          </Button>
          
          {isAuthenticated && !isCreator && (
            <Button
              variant={isParticipant ? "secondary" : "primary"}
              size="sm"
              onClick={handleJoinLeave}
              disabled={loading || (!isParticipant && isFull)}
              loading={loading}
              className="flex-1"
            >
              {isParticipant ? 'Leave' : isFull ? 'Full' : 'Join'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ActivityCard;