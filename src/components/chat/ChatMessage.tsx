// Chat Message Component

import React from 'react';
import { Message, MessageType } from '../../types';
import { useAuth } from '../../hooks';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user } = useAuth();
  const isOwnMessage = user?.id === message.userId;
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderSystemMessage = () => (
    <div className="flex justify-center my-2">
      <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
        {message.content}
      </span>
    </div>
  );

  const renderUserMessage = () => (
    <div className={`flex mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-xs lg:max-w-md ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isOwnMessage ? 'ml-2' : 'mr-2'}`}>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            {message.userDetails.avatar ? (
              <img
                src={message.userDetails.avatar}
                alt={message.userDetails.displayName}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-gray-600">
                {message.userDetails.displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Message content */}
        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
          <div className={`flex items-center mb-1 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-sm font-medium text-gray-700">
              {message.userDetails.displayName}
            </span>
            <span className={`text-xs text-gray-500 ${isOwnMessage ? 'mr-2' : 'ml-2'}`}>
              {formatTime(message.timestamp)}
            </span>
          </div>
          
          <div
            className={`px-4 py-2 rounded-lg ${
              isOwnMessage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {message.type === MessageType.IMAGE ? (
              <img
                src={message.content}
                alt="Shared image"
                className="max-w-full rounded"
              />
            ) : (
              <p className="text-sm whitespace-pre-wrap break-words">
                {message.content}
              </p>
            )}
            
            {message.edited && (
              <span className="text-xs opacity-75 italic block mt-1">
                (edited)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (message.type === MessageType.SYSTEM || message.type === MessageType.JOIN || message.type === MessageType.LEAVE) {
    return renderSystemMessage();
  }

  return renderUserMessage();
};

export default ChatMessage;