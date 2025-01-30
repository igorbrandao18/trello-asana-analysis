export interface DashboardStats {
  totalCards: number;
  migratedCards: number;
  successRate: number;
  errors: number;
  changes: {
    totalCards: number;
    migratedCards: number;
    successRate: number;
    errors: number;
  };
}

export interface ActivityData {
  name: string;
  trello: number;
  asana: number;
}

export interface MigrationTask {
  id: number;
  title: string;
  description: string;
  status: 'Concluído' | 'Em Progresso' | 'Erro';
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  stats: DashboardStats;
  activity: ActivityData[];
  tasks: MigrationTask[];
} 