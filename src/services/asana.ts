import { env } from '@/config/env';

interface AsanaUser {
  gid: string;
  name: string;
  email?: string;
}

interface AsanaWorkspace {
  gid: string;
  name: string;
  resource_type: string;
}

class AsanaService {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor() {
    this.baseUrl = 'https://app.asana.com/api/1.0';
    this.token = env.asana.token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log('Asana request URL:', url);

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error?.errors?.[0]?.message || error.message || 'Asana API error');
    }

    const data = await response.json();
    return data.data;
  }

  async testConnection(): Promise<{ id: string; name: string; email?: string }> {
    try {
      console.log('Testing Asana connection...');
      const user = await this.request<AsanaUser>('/users/me');
      console.log('Asana user data:', user);
      return {
        id: user.gid,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      console.error('Failed to test Asana connection:', error);
      throw error;
    }
  }

  async getWorkspaces(): Promise<AsanaWorkspace[]> {
    return this.request<AsanaWorkspace[]>('/workspaces');
  }

  async createProject(workspaceId: string, name: string, description?: string) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          workspace: workspaceId,
          name,
          notes: description,
        },
      }),
    });
  }

  async createSection(projectId: string, name: string) {
    return this.request('/sections', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          project: projectId,
          name,
        },
      }),
    });
  }

  async createTask(sectionId: string, name: string, description?: string, dueDate?: string) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          memberships: [
            {
              section: sectionId,
            },
          ],
          name,
          notes: description,
          due_on: dueDate,
        },
      }),
    });
  }
}

export const asanaService = new AsanaService(); 