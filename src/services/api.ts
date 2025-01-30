import axios from 'axios';
import { DashboardData } from '@/types/dashboard';
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

// Função para migrar cards do Trello para o Asana
export async function migrateFromTrelloToAsana() {
  try {
    // 1. Busca dados do Trello
    const [trelloBoards, trelloCards] = await Promise.all([
      trelloApi.get('/members/me/boards', {
        params: {
          fields: 'id,name,lists',
        },
      }),
      trelloApi.get('/members/me/cards', {
        params: {
          fields: 'id,name,desc,idList',
        },
      }),
    ]);

    // 2. Busca workspace do Asana
    const asanaUser = await asanaApi.get('/users/me');
    const workspaceId = asanaUser.data.data.workspaces[0].gid;

    // 3. Cria um novo projeto no Asana para cada board do Trello
    for (const board of trelloBoards.data) {
      // Cria o projeto
      const projectResponse = await asanaApi.post('/projects', {
        data: {
          name: `${board.name} (Migrado do Trello)`,
          workspace: workspaceId,
        },
      });

      const projectId = projectResponse.data.data.gid;

      // Filtra os cards deste board
      const boardCards = trelloCards.data.filter(card => card.idBoard === board.id);

      // Cria as tasks no Asana
      for (const card of boardCards) {
        await asanaApi.post('/tasks', {
          data: {
            name: card.name,
            notes: card.desc,
            projects: [projectId],
            workspace: workspaceId,
          },
        });
      }
    }

    return {
      success: true,
      message: 'Migração concluída com sucesso!',
    };
  } catch (error) {
    console.error('Erro durante a migração:', error);
    throw error;
  }
}

// Função auxiliar para calcular as mudanças percentuais
function calculateChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

export async function getDashboardData(): Promise<DashboardData> {
  try {
    // Busca dados do Trello
    const [trelloBoards, trelloCards] = await Promise.all([
      trelloApi.get('/members/me/boards', {
        params: {
          fields: 'id,name,lists',
        },
      }),
      trelloApi.get('/members/me/cards', {
        params: {
          fields: 'id,name,desc,idList',
        },
      }),
    ]);

    // Busca dados do Asana
    const asanaUser = await asanaApi.get('/users/me');
    const workspaceId = asanaUser.data.data.workspaces[0].gid;
    
    // Busca projetos do Asana
    const asanaProjects = await asanaApi.get(`/workspaces/${workspaceId}/projects`);
    const projectId = asanaProjects.data.data[0]?.gid;

    // Busca tasks do projeto
    const asanaTasks = projectId 
      ? await asanaApi.get(`/projects/${projectId}/tasks`)
      : { data: { data: [] } };

    // Flag para indicar se a migração foi iniciada
    const migrationStarted = false; // TODO: Implementar lógica de controle de migração

    // Calcula estatísticas baseadas nos dados reais
    const totalCards = trelloCards.data?.length || 0;
    const migratedCards = migrationStarted ? (asanaTasks.data.data?.length || 0) : 0;
    
    // Taxa de sucesso é calculada apenas se a migração foi iniciada e há cards para migrar
    const successRate = (migrationStarted && totalCards > 0)
      ? Math.round((migratedCards / totalCards) * 100)
      : 0;
    
    // Erros são contados apenas se a migração foi iniciada
    const errors = migrationStarted ? (totalCards > migratedCards ? totalCards - migratedCards : 0) : 0;

    // Histórico para cálculo de mudanças (últimas 24h)
    const previousStats = {
      totalCards: totalCards,
      migratedCards: 0, // Zeramos pois a migração não começou
      successRate: 0,   // Zeramos pois a migração não começou
      errors: 0         // Zeramos pois a migração não começou
    };

    // Gera dados de atividade dos últimos 7 dias
    const activity = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      
      return {
        name: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        trello: totalCards,
        asana: migrationStarted ? (index === 6 ? migratedCards : 0) : 0 // Só mostra dados se migração iniciada
      };
    });

    // Status das tarefas de migração baseado nos dados reais
    const tasks = [
      {
        id: 1,
        title: 'Conexão com Trello',
        description: `${trelloBoards.data.length} boards encontrados`,
        status: trelloBoards.data.length > 0 ? 'Concluído' as const : 'Em Progresso' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Conexão com Asana',
        description: `Workspace: ${asanaUser.data.data.workspaces[0].name}`,
        status: workspaceId ? 'Concluído' as const : 'Em Progresso' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: 'Status da Migração',
        description: migrationStarted 
          ? `${migratedCards} de ${totalCards} cards migrados`
          : 'Migração não iniciada',
        status: 'Em Progresso' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];

    return {
      stats: {
        totalCards,
        migratedCards,
        successRate,
        errors,
        changes: {
          totalCards: calculateChange(totalCards, previousStats.totalCards),
          migratedCards: calculateChange(migratedCards, previousStats.migratedCards),
          successRate: calculateChange(successRate, previousStats.successRate),
          errors: calculateChange(errors, previousStats.errors),
        },
      },
      activity,
      tasks,
    };
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    throw error;
  }
}

export async function checkConnections() {
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
    console.error('Erro ao verificar conexões:', error);
    return {
      trello: false,
      asana: false,
    };
  }
}

export default {
  getDashboardData,
  checkConnections,
}; 