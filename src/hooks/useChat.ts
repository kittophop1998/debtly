// Custom hook for chat functionality

import { useState, useEffect, useCallback, useRef } from 'react';
import { chatService } from '../services';
import { ChatRoom, Message, MessageType, User } from '../types';

export const useChat = (roomId: string | null) => {
  const [room, setRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const unsubscribeRefs = useRef<(() => void)[]>([]);

  // Initialize chat connection
  useEffect(() => {
    chatService.connect();
    
    const unsubscribeConnection = chatService.onConnectionChange(setConnected);
    unsubscribeRefs.current.push(unsubscribeConnection);

    return () => {
      unsubscribeRefs.current.forEach(unsub => unsub());
      unsubscribeRefs.current = [];
    };
  }, []);

  // Room-specific effects
  useEffect(() => {
    if (!roomId) return;

    // Clear previous room data
    setMessages([]);
    setParticipants([]);
    setError(null);

    const initializeRoom = async () => {
      setLoading(true);
      
      try {
        // Fetch room data and join
        const roomData = await chatService.getChatRoom(roomId);
        setRoom(roomData);
        setMessages(roomData.messages || []);
        setParticipants(roomData.participants || []);

        // Join the room
        await chatService.joinRoom(roomId);

        // Set up real-time listeners
        const unsubscribeMessages = chatService.onMessage(roomId, (message) => {
          setMessages(prev => [...prev, message]);
        });

        const unsubscribeRoomState = chatService.onRoomStateChange(roomId, (newParticipants) => {
          setParticipants(newParticipants);
        });

        unsubscribeRefs.current.push(unsubscribeMessages, unsubscribeRoomState);

      } catch (err: any) {
        setError(err.message || 'Failed to initialize chat room');
      } finally {
        setLoading(false);
      }
    };

    initializeRoom();

    // Cleanup function
    return () => {
      if (roomId) {
        chatService.leaveRoom(roomId).catch(console.error);
      }
      
      // Clean up listeners
      unsubscribeRefs.current.forEach(unsub => unsub());
      unsubscribeRefs.current = [];
    };
  }, [roomId]);

  const sendMessage = useCallback(async (content: string, type: MessageType = MessageType.TEXT) => {
    if (!roomId || !content.trim()) return;

    setSending(true);
    setError(null);

    try {
      await chatService.sendMessage(roomId, content.trim(), type);
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
      throw err;
    } finally {
      setSending(false);
    }
  }, [roomId]);

  const loadMoreMessages = useCallback(async (page: number = 1) => {
    if (!roomId) return;

    setLoading(true);
    
    try {
      const response = await chatService.getRoomMessages(roomId, page, 50);
      
      if (page === 1) {
        setMessages(response.data);
      } else {
        setMessages(prev => [...response.data, ...prev]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    room,
    messages,
    participants,
    loading,
    sending,
    connected,
    error,
    sendMessage,
    loadMoreMessages,
    clearError,
    connectionState: chatService.getConnectionState()
  };
};

export const useChatConnection = () => {
  const [connected, setConnected] = useState(false);
  const [connectionState, setConnectionState] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected');

  useEffect(() => {
    const unsubscribe = chatService.onConnectionChange(setConnected);
    
    // Update connection state periodically
    const interval = setInterval(() => {
      setConnectionState(chatService.getConnectionState());
    }, 1000);

    // Initial state
    setConnected(chatService.isConnectionActive());
    setConnectionState(chatService.getConnectionState());

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const connect = useCallback(() => {
    chatService.connect();
  }, []);

  const disconnect = useCallback(() => {
    chatService.disconnect();
  }, []);

  return {
    connected,
    connectionState,
    connect,
    disconnect
  };
};