import { User } from "@/features/auth";

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    username: 'john_doe',
    displayName: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    bio: 'Adventure enthusiast',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'jane@example.com',
    username: 'jane_smith',
    displayName: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    bio: 'Food lover and travel blogger',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    email: 'mike@example.com',
    username: 'mike_wilson',
    displayName: 'Mike Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    bio: 'Fitness trainer and sports enthusiast',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Mock API responses
export const mockApiResponse = {
  success: true,
  data: mockUsers,
  pagination: {
    page: 1,
    limit: 12,
    total: mockUsers.length,
    totalPages: 1,
  }
};