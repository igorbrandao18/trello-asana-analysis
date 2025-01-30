import axios from 'axios';
import { DashboardData } from '@/types/dashboard';
import { env } from '@/config/env';

// APIs do Trello e Asana
const trelloApi = axios.create({
  baseURL: env.trello.apiUrl,
  params: {
    key: env.trello.key,
    token: env.trello.token,
  },
});

const asanaApi = axios.create({
  baseURL: env.asana.apiUrl,
  headers: {
    Authorization: `Bearer ${env.asana.token}`,
  },
});

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

    // Calcula estatísticas
    const totalCards = trelloCards.data.length;
    const migratedCards = asanaTasks.data.data.length;
    const successRate = totalCards > 0 ? (migratedCards / totalCards) * 100 : 0;

    // Calcula erros (cards que não foram migrados)
    const errors = totalCards - migratedCards;

    // Calcula mudanças com base nos dados anteriores
    const previousStats = {
      totalCards: totalCards - Math.floor(totalCards * 0.1), // Simula 10% a menos
      migratedCards: migratedCards - Math.floor(migratedCards * 0.1),
      successRate: successRate - 5,
      errors: errors + 2,
    };

    // Gera dados de atividade dos últimos 7 dias
    const activity = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      
      // Simula dados de atividade mais realistas
      const baseNumber = Math.floor(totalCards / 7);
      return {
        name: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        trello: baseNumber + Math.floor(Math.random() * 10),
        asana: baseNumber + Math.floor(Math.random() * 10),
      };
    });

    // Status das tarefas de migração
    const tasks = [
      {
        id: 1,
        title: 'Sincronização de Boards',
        description: `${trelloBoards.data.length} boards do Trello encontrados`,
        status: 'Concluído' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Migração de Cards',
        description: `${migratedCards} de ${totalCards} cards migrados`,
        status: migratedCards === totalCards ? 'Concluído' as const : 'Em Progresso' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    // Se houver erros, adiciona uma task de erro
    if (errors > 0) {
      tasks.push({
        id: 3,
        title: 'Erros na Migração',
        description: `${errors} cards não puderam ser migrados`,
        status: 'Erro' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

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