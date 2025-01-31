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
          lists: 'open',
          cards: 'visible'
        },
      }),
      trelloApi.get('/members/me/cards', {
        params: {
          fields: 'id,name,desc,idList,idBoard',
        },
      }),
    ]);

    // Busca dados do Asana
    const asanaUser = await asanaApi.get('/users/me');
    const workspaces = asanaUser.data.data.workspaces;
    
    let asanaProjects = { data: { data: [] } };
    let allAsanaTasks: any[] = [];

    if (workspaces && workspaces.length > 0) {
      // Busca o projeto "Gestão de Delivery"
      asanaProjects = await asanaApi.get(`/workspaces/${workspaces[0].gid}/projects`, {
        params: {
          opt_fields: 'name,notes,archived,public,created_at,modified_at,owner'
        }
      });
      
      // Se encontrou o projeto, busca suas tasks
      if (asanaProjects.data.data.length > 0) {
        const deliveryProject = asanaProjects.data.data.find((p: any) => p.name === 'Gestão de Delivery');
        
        if (deliveryProject) {
          const tasks = await asanaApi.get(`/projects/${deliveryProject.gid}/tasks`, {
            params: {
              opt_fields: 'name,notes,completed,due_on,assignee,tags'
            }
          });
          
          // Filtra apenas as tasks que são restaurantes ou métricas
          allAsanaTasks = tasks.data.data.filter((task: any) => {
            const notes = task.notes || '';
            return notes.includes('🏷️ Categoria:') || // É um restaurante
                   notes.includes('🎯 Meta:');        // É uma métrica
          });
        }
      }
    }

    // Calcula estatísticas
    const totalCards = trelloCards.data.length;
    const migratedCards = allAsanaTasks.length;
    const successRate = totalCards > 0 ? Math.round((migratedCards / totalCards) * 100) : 0;
    const errors = totalCards > migratedCards ? totalCards - migratedCards : 0;

    // Gera dados de atividade dos últimos 7 dias
    const activity = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      
      return {
        name: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        trello: trelloCards.data.length,
        asana: allAsanaTasks.length
      };
    });

    // Status das tarefas de migração
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
        description: workspaces.length > 0 
          ? `${asanaProjects.data.data.length} projetos encontrados em ${workspaces[0].name}`
          : 'Nenhum workspace encontrado',
        status: workspaces.length > 0 ? 'Concluído' as const : 'Erro' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: 'Status da Migração',
        description: `${migratedCards} de ${totalCards} cards migrados`,
        status: 'Em Progresso' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];

    // Calcula mudanças em relação ao dia anterior
    const previousStats = {
      totalCards,
      migratedCards: migratedCards - Math.floor(Math.random() * 5), // Simulação
      successRate: successRate - Math.floor(Math.random() * 2),     // Simulação
      errors: errors - Math.floor(Math.random() * 2)                // Simulação
    };

    return {
      stats: {
        totalCards,
        migratedCards,
        successRate,
        errors,
        changes: {
          totalCards: totalCards - previousStats.totalCards,
          migratedCards: migratedCards - previousStats.migratedCards,
          successRate: successRate - previousStats.successRate,
          errors: errors - previousStats.errors
        }
      },
      activity,
      tasks
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