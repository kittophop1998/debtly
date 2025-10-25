// Chat Service for realtime messaging

import { BaseApiService } from './base';
import { API_CONFIG } from './config';
import { 
  ChatRoom, 
  Message,
  MessageType,
  User,
  ApiResponse,
  PaginatedResponse
} from '../types';

export class ChatService extends BaseApiService {
  private static instance: ChatService;
  private websocket: WebSocket | null = null;
  private messageListeners: Map<string, ((message: Message) => void)[]> = new Map();
  private roomStateListeners: Map<string, ((participants: User[]) => void)[]> = new Map();
  private connectionListeners: ((connected: boolean) => void)[] = [];
  private reconnectTimer: NodeJS.Timeout | null = null;
  private isConnected: boolean = false;

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  // WebSocket connection management
  public connect(): void {
    if (this.websocket?.readyState === WebSocket.OPEN) {
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token required for chat connection');
    }

    try {
      this.websocket = new WebSocket(`${API_CONFIG.WEBSOCKET_URL}?token=${token}`);
      
      this.websocket.onopen = () => {
        console.log('Chat WebSocket connected');
        this.isConnected = true;
        this.notifyConnectionListeners(true);
        
        // Clear reconnect timer
        if (this.reconnectTimer) {
          clearTimeout(this.reconnectTimer);
          this.reconnectTimer = null;
        }
      };

      this.websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleWebSocketMessage(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.websocket.onclose = () => {
        console.log('Chat WebSocket disconnected');
        this.isConnected = false;
        this.notifyConnectionListeners(false);
        this.scheduleReconnect();
      };

      this.websocket.onerror = (error) => {
        console.error('Chat WebSocket error:', error);
      };

    } catch (error) {
      console.error('Failed to connect to chat:', error);
      this.scheduleReconnect();
    }
  }

  public disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }

    this.isConnected = false;
    this.notifyConnectionListeners(false);
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;

    this.reconnectTimer = setTimeout(() => {
      console.log('Attempting to reconnect to chat...');
      this.connect();
    }, 3000);
  }

  private handleWebSocketMessage(data: any): void {
    switch (data.type) {
      case 'new_message':
        this.notifyMessageListeners(data.roomId, data.message);
        break;
      case 'user_joined':
      case 'user_left':
        this.notifyRoomStateListeners(data.roomId, data.participants);
        break;
      case 'room_updated':
        this.notifyRoomStateListeners(data.roomId, data.participants);
        break;
      default:
        console.log('Unknown WebSocket message type:', data.type);
    }
  }

  // Event listeners management
  public onMessage(roomId: string, callback: (message: Message) => void): () => void {
    const listeners = this.messageListeners.get(roomId) || [];
    listeners.push(callback);
    this.messageListeners.set(roomId, listeners);

    // Return unsubscribe function
    return () => {
      const currentListeners = this.messageListeners.get(roomId) || [];
      const index = currentListeners.indexOf(callback);
      if (index > -1) {
        currentListeners.splice(index, 1);
        this.messageListeners.set(roomId, currentListeners);
      }
    };
  }

  public onRoomStateChange(roomId: string, callback: (participants: User[]) => void): () => void {
    const listeners = this.roomStateListeners.get(roomId) || [];
    listeners.push(callback);
    this.roomStateListeners.set(roomId, listeners);

    return () => {
      const currentListeners = this.roomStateListeners.get(roomId) || [];
      const index = currentListeners.indexOf(callback);
      if (index > -1) {
        currentListeners.splice(index, 1);
        this.roomStateListeners.set(roomId, currentListeners);
      }
    };
  }

  public onConnectionChange(callback: (connected: boolean) => void): () => void {
    this.connectionListeners.push(callback);

    return () => {
      const index = this.connectionListeners.indexOf(callback);
      if (index > -1) {
        this.connectionListeners.splice(index, 1);
      }
    };
  }

  private notifyMessageListeners(roomId: string, message: Message): void {
    const listeners = this.messageListeners.get(roomId) || [];
    listeners.forEach(callback => callback(message));
  }

  private notifyRoomStateListeners(roomId: string, participants: User[]): void {
    const listeners = this.roomStateListeners.get(roomId) || [];
    listeners.forEach(callback => callback(participants));
  }

  private notifyConnectionListeners(connected: boolean): void {
    this.connectionListeners.forEach(callback => callback(connected));
  }

  // HTTP API methods
  public async getChatRoom(roomId: string): Promise<ChatRoom> {
    const response = await this.get<ApiResponse<ChatRoom>>(
      `${API_CONFIG.ENDPOINTS.CHAT.ROOMS}/${roomId}`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch chat room');
  }

  public async getRoomMessages(
    roomId: string,
    page: number = 1,
    limit: number = 50
  ): Promise<PaginatedResponse<Message>> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });

    const response = await this.get<ApiResponse<PaginatedResponse<Message>>>(
      `${API_CONFIG.ENDPOINTS.CHAT.MESSAGES(roomId)}?${queryParams}`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch messages');
  }

  // Send message via WebSocket if connected, fallback to HTTP
  public async sendMessage(
    roomId: string, 
    content: string, 
    type: MessageType = MessageType.TEXT
  ): Promise<Message> {
    const messageData = {
      roomId,
      content,
      type,
      timestamp: new Date().toISOString()
    };

    // Try WebSocket first
    if (this.isConnected && this.websocket?.readyState === WebSocket.OPEN) {
      try {
        this.websocket.send(JSON.stringify({
          type: 'send_message',
          data: messageData
        }));
        
        // Return a temporary message object
        return {
          id: `temp_${Date.now()}`,
          ...messageData,
          userId: '', // Will be filled by server
          userDetails: {} as User, // Will be filled by server
        };
      } catch (error) {
        console.error('Failed to send via WebSocket, falling back to HTTP:', error);
      }
    }

    // Fallback to HTTP
    const response = await this.post<ApiResponse<Message>>(
      API_CONFIG.ENDPOINTS.CHAT.SEND(roomId),
      messageData
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to send message');
  }

  public async joinRoom(roomId: string): Promise<ChatRoom> {
    if (this.isConnected && this.websocket?.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify({
        type: 'join_room',
        roomId
      }));
    }

    // Also call HTTP endpoint to ensure room access
    const response = await this.post<ApiResponse<ChatRoom>>(
      `${API_CONFIG.ENDPOINTS.CHAT.ROOMS}/${roomId}/join`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to join chat room');
  }

  public async leaveRoom(roomId: string): Promise<void> {
    if (this.isConnected && this.websocket?.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify({
        type: 'leave_room',
        roomId
      }));
    }

    const response = await this.post<ApiResponse<void>>(
      `${API_CONFIG.ENDPOINTS.CHAT.ROOMS}/${roomId}/leave`
    );

    if (!response.success) {
      throw new Error(response.message || 'Failed to leave chat room');
    }
  }

  // Utility methods
  public isConnectionActive(): boolean {
    return this.isConnected;
  }

  public getConnectionState(): 'connected' | 'connecting' | 'disconnected' {
    if (!this.websocket) return 'disconnected';
    
    switch (this.websocket.readyState) {
      case WebSocket.CONNECTING:
        return 'connecting';
      case WebSocket.OPEN:
        return 'connected';
      default:
        return 'disconnected';
    }
  }
}

// Export singleton instance
export const chatService = ChatService.getInstance();