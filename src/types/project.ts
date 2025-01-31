export interface Project {
  id: string;
  title: string;
  description?: string;
  cards: number;
  members: number;
  status: string;
  lists?: Array<{
    id: string;
    name: string;
    cards: Array<{
      id: string;
      name: string;
      description: string;
      due?: string;
      labels?: string[];
      members?: string[];
    }>;
  }>;
} 