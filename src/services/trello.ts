import { env } from '@/config/env';

interface TrelloUser {
  id: string;
  fullName: string;
  email?: string;
}

interface TrelloBoard {
  id: string;
  name: string;
  desc?: string;
}

class TrelloService {
  private readonly baseUrl: string;
  private readonly key: string;
  private readonly token: string;

  constructor() {
    this.baseUrl = 'https://api.trello.com/1';
    this.key = env.trello.key;
    this.token = env.trello.token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.append('key', this.key);
    url.searchParams.append('token', this.token);

    console.log('Trello request URL:', url.toString());

    const response = await fetch(url.toString(), {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || 'Trello API error');
    }

    return response.json();
  }

  async testConnection(): Promise<{ id: string; name: string; email?: string }> {
    try {
      console.log('Testing Trello connection...');
      const user = await this.request<TrelloUser>('/members/me');
      console.log('Trello user data:', user);
      return {
        id: user.id,
        name: user.fullName,
        email: user.email,
      };
    } catch (error) {
      console.error('Failed to test Trello connection:', error);
      throw error;
    }
  }

  async getBoards(): Promise<TrelloBoard[]> {
    return this.request<TrelloBoard[]>('/members/me/boards');
  }

  async syncToAsana(params: { boardId: string; workspaceId: string }): Promise<void> {
    // TODO: Implement sync logic
    throw new Error('Not implemented');
  }
}

export const trelloService = new TrelloService(); 