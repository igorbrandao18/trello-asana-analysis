export interface MigrationItem {
  id: string;
  title: string;
  type: 'project' | 'board' | 'list';
  items: string;
  date: string;
}

export interface MigrationProgress {
  total: number;
  current: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  message?: string;
}

export type Platform = 'trello' | 'asana'; 