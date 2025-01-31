import axios from 'axios';
import { env } from '@/config/env';

// APIs do Trello e Asana
export const trelloApi = axios.create({
  baseURL: env.trello.apiUrl,
  params: {
    key: env.trello.key,
    token: env.trello.token,
  },
});

export const asanaApi = axios.create({
  baseURL: env.asana.apiUrl,
  headers: {
    Authorization: `Bearer ${env.asana.token}`,
  },
});

interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  due?: string;
  idList: string;
}

interface TrelloList {
  id: string;
  name: string;
}

interface AsanaSection {
  gid: string;
  name: string;
}

// Função principal de migração
export const migrateBoard = async (
  trelloBoardId: string,
  asanaProjectId: string,
  onProgress: (progress: { current: number; total: number; message: string }) => void
) => {
  try {
    // 1. Buscar listas do quadro do Trello
    const trelloLists = await trelloApi.get<TrelloList[]>(`/boards/${trelloBoardId}/lists`, {
      params: {
        fields: 'name,id'
      }
    });

    if (!trelloLists.data) {
      throw new Error('Listas não encontradas no Trello');
    }

    const totalSteps = trelloLists.data.length;
    let currentStep = 0;

    // 2. Para cada lista do Trello
    for (const list of trelloLists.data) {
      // 2.1 Criar seção correspondente no Asana
      onProgress({ 
        current: ++currentStep, 
        total: totalSteps,
        message: `Migrando lista "${list.name}"...`
      });

      const section = await asanaApi.post<{ data: AsanaSection }>(`/projects/${asanaProjectId}/sections`, {
        data: { name: list.name }
      });

      if (!section.data?.data?.gid) {
        throw new Error(`Erro ao criar seção ${list.name}`);
      }

      // 2.2 Buscar cards desta lista
      const cards = await trelloApi.get<TrelloCard[]>(`/lists/${list.id}/cards`, {
        params: {
          fields: 'name,desc,due'
        }
      });

      // 2.3 Migrar cada card para a seção criada
      for (const card of cards.data) {
        await asanaApi.post('/tasks', {
          data: {
            name: card.name,
            notes: card.desc || '',
            due_on: card.due,
            memberships: [{
              section: section.data.data.gid
            }]
          }
        });

        // 2.4 Remover card do Trello após migração
        await trelloApi.delete(`/cards/${card.id}`);
      }
    }

    return true;
  } catch (error: any) {
    console.error('Erro na migração:', {
      error: error.message,
      boardId: trelloBoardId,
      projectId: asanaProjectId
    });
    throw new Error(error.response?.data?.message || 'Erro ao migrar o quadro');
  }
};

// Função para verificar conexões
export const checkConnections = async () => {
  try {
    const [trelloStatus, asanaStatus] = await Promise.all([
      trelloApi.get('/members/me'),
      asanaApi.get('/users/me'),
    ]);

    return {
      trello: trelloStatus.status === 200,
      asana: asanaStatus.status === 200,
    };
  } catch (error) {
    return {
      trello: false,
      asana: false,
    };
  }
}; 