import { trelloApi, asanaApi } from './api';

interface Project {
  id: string;
  title: string;
  cards: number;
  members: number;
  status: string;
  description?: string;
  lists?: {
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
  }[];
}

export async function getTrelloProjects(): Promise<Project[]> {
  try {
    // Buscar todos os boards do usuário
    const boardsResponse = await trelloApi.get('/members/me/boards', {
      params: {
        fields: 'id,name,desc,memberships',
        lists: 'open',
        list_fields: 'id,name,pos',
        cards: 'visible',
        card_fields: 'id,name,desc,due,labels,idMembers',
        members: 'all',
        member_fields: 'id,fullName,username',
      },
    });

    const boards = boardsResponse.data;

    // Processar cada board para obter informações detalhadas
    const detailedBoards = await Promise.all(
      boards.map(async (board: any) => {
        // Buscar listas do board
        const listsResponse = await trelloApi.get(`/boards/${board.id}/lists`, {
          params: {
            cards: 'open',
            card_fields: 'id,name,desc,due,labels,idMembers',
          },
        });

        const lists = listsResponse.data.map((list: any) => ({
          id: list.id,
          name: list.name,
          cards: list.cards.map((card: any) => ({
            id: card.id,
            name: card.name,
            description: card.desc,
            due: card.due,
            labels: card.labels?.map((label: any) => label.name) || [],
            members: card.idMembers || [],
          })),
        }));

        return {
          id: board.id,
          title: board.name,
          description: board.desc,
          cards: lists.reduce((acc: number, list: any) => acc + list.cards.length, 0),
          members: board.memberships?.length || 0,
          status: 'Ativo',
          lists,
        };
      })
    );

    return detailedBoards;
  } catch (error) {
    console.error('Erro ao buscar projetos do Trello:', error);
    throw error;
  }
}

export async function getAsanaProjects(): Promise<Project[]> {
  try {
    // Primeiro, obtém o workspace
    const user = await asanaApi.get('/users/me');
    const workspaceId = user.data.data.workspaces[0].gid;

    // Busca projetos do workspace
    const projects = await asanaApi.get(`/workspaces/${workspaceId}/projects`, {
      params: {
        opt_fields: 'gid,name,members,status,num_tasks',
      },
    });

    return projects.data.data.map((project: any) => ({
      id: project.gid,
      title: project.name,
      cards: project.num_tasks || 0,
      members: project.members?.length || 0,
      status: project.status || 'Em andamento',
    }));
  } catch (error) {
    console.error('Erro ao buscar projetos do Asana:', error);
    throw error;
  }
}

export async function migrateProjects(sourceType: 'trello' | 'asana', projectIds: string[]) {
  // Implementar a lógica de migração aqui
  // Esta é uma função placeholder que será implementada com a lógica real de migração
  try {
    if (sourceType === 'trello') {
      // Lógica para migrar do Trello para o Asana
      for (const projectId of projectIds) {
        // 1. Buscar detalhes do board do Trello
        const board = await trelloApi.get(`/boards/${projectId}`, {
          params: {
            lists: 'open',
            cards: 'open',
            members: 'all',
          },
        });

        // 2. Criar projeto correspondente no Asana
        // 3. Migrar listas como seções
        // 4. Migrar cards como tarefas
        // 5. Migrar membros
        // 6. Migrar anexos e comentários
      }
    } else {
      // Lógica para migrar do Asana para o Trello
      for (const projectId of projectIds) {
        // 1. Buscar detalhes do projeto do Asana
        const project = await asanaApi.get(`/projects/${projectId}`, {
          params: {
            opt_fields: 'name,notes,members,custom_fields',
          },
        });

        // 2. Criar board correspondente no Trello
        // 3. Migrar seções como listas
        // 4. Migrar tarefas como cards
        // 5. Migrar membros
        // 6. Migrar anexos e comentários
      }
    }
  } catch (error) {
    console.error('Erro durante a migração:', error);
    throw error;
  }
} 