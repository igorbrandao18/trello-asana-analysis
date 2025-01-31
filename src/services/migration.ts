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
        opt_fields: 'gid,name,notes,members,status,num_tasks',
      },
    });

    // Busca detalhes de cada projeto, incluindo seções e tarefas
    const detailedProjects = await Promise.all(
      projects.data.data.map(async (project: any) => {
        // Buscar seções do projeto
        const sectionsResponse = await asanaApi.get(`/projects/${project.gid}/sections`, {
          params: {
            opt_fields: 'gid,name',
          },
        });

        // Para cada seção, buscar suas tarefas
        const sections = await Promise.all(
          sectionsResponse.data.data.map(async (section: any) => {
            const tasksResponse = await asanaApi.get(`/sections/${section.gid}/tasks`, {
              params: {
                opt_fields: 'gid,name,notes,due_on,tags,assignee',
              },
            });

            return {
              id: section.gid,
              name: section.name,
              cards: tasksResponse.data.data.map((task: any) => ({
                id: task.gid,
                name: task.name,
                description: task.notes || '',
                due: task.due_on,
                labels: task.tags?.map((tag: any) => tag.name) || [],
                members: task.assignee ? [task.assignee.gid] : [],
              })),
            };
          })
        );

        return {
          id: project.gid,
          title: project.name,
          description: project.notes,
          cards: project.num_tasks || 0,
          members: project.members?.length || 0,
          status: project.status || 'Em andamento',
          lists: sections,
        };
      })
    );

    return detailedProjects;
  } catch (error) {
    console.error('Erro ao buscar projetos do Asana:', error);
    throw error;
  }
}

export async function migrateProjects(
  sourceType: 'trello' | 'asana',
  projectIds: string[],
  onProgress?: (progress: { current: number; total: number }) => void
) {
  try {
    if (sourceType === 'trello') {
      // Para cada board do Trello selecionado
      for (const boardId of projectIds) {
        // 1. Buscar detalhes completos do board do Trello
        const board = await trelloApi.get(`/boards/${boardId}`, {
          params: {
            lists: 'open',
            cards: 'visible',
            card_fields: 'id,name,desc,due,labels,idMembers,idList',
            members: 'all',
          },
        });

        // 2. Criar projeto correspondente no Asana
        const user = await asanaApi.get('/users/me');
        const workspaceId = user.data.data.workspaces[0].gid;

        const asanaProject = await asanaApi.post('/projects', {
          data: {
            name: board.data.name,
            notes: board.data.desc,
            workspace: workspaceId,
          },
        });

        const projectId = asanaProject.data.data.gid;

        // Remover a tarefa "Sem título" que é criada automaticamente
        try {
          const tasks = await asanaApi.get(`/projects/${projectId}/tasks`, {
            params: {
              opt_fields: 'gid,name'
            }
          });
          
          const untitledTask = tasks.data.data.find((task: any) => task.name === 'Untitled' || task.name === 'Sem título');
          if (untitledTask) {
            await asanaApi.delete(`/tasks/${untitledTask.gid}`);
          }
        } catch (error) {
          console.error('Erro ao tentar remover tarefa sem título:', error);
          // Continua mesmo se não conseguir remover a tarefa sem título
        }

        // 3. Criar seções no Asana (equivalentes às listas do Trello)
        const sectionMap = new Map();
        for (const list of board.data.lists) {
          const section = await asanaApi.post(`/projects/${projectId}/sections`, {
            data: {
              name: list.name,
            },
          });
          sectionMap.set(list.id, section.data.data.gid);
        }

        // 4. Migrar cards como tarefas
        let cardsTransferred = 0;
        const totalCards = board.data.cards.length;

        for (const card of board.data.cards) {
          const sectionId = sectionMap.get(card.idList);
          
          try {
            // Criar tarefa no Asana
            await asanaApi.post('/tasks', {
              data: {
                name: card.name,
                notes: card.desc,
                due_on: card.due,
                projects: [projectId],
                memberships: [{
                  project: projectId,
                  section: sectionId
                }]
              },
            });

            // Após migrar o card, deletá-lo do Trello
            await trelloApi.delete(`/cards/${card.id}`);
            
            cardsTransferred++;
            onProgress?.({ current: cardsTransferred, total: totalCards });
          } catch (error) {
            console.error(`Erro ao migrar card ${card.id}:`, error);
            // Continua com o próximo card mesmo se houver erro
          }
        }

        // 5. Limpar e deletar o board do Trello
        try {
          // Primeiro, deletar todas as listas
          for (const list of board.data.lists) {
            try {
              // Primeiro fecha a lista
              await trelloApi.put(`/lists/${list.id}/closed`, {
                value: true
              });
              // Depois tenta deletar a lista
              await trelloApi.delete(`/lists/${list.id}`);
            } catch (error) {
              console.error(`Erro ao deletar lista ${list.id}:`, error);
            }
          }

          // Depois, deletar o board
          await trelloApi.delete(`/boards/${boardId}`);
        } catch (error) {
          console.error('Erro ao deletar board:', error);
          // Se não conseguir deletar, tenta pelo menos arquivar
          await trelloApi.put(`/boards/${boardId}/closed`, {
            value: true
          });
        }
      }
    } else if (sourceType === 'asana') {
      // Para cada projeto do Asana selecionado
      for (const projectId of projectIds) {
        // 1. Buscar detalhes do projeto do Asana
        const project = await asanaApi.get(`/projects/${projectId}`, {
          params: {
            opt_fields: 'name,notes'
          }
        });

        // 2. Criar board correspondente no Trello
        const trelloBoard = await trelloApi.post('/boards', {
          name: project.data.data.name,
          desc: project.data.data.notes || '',
          defaultLists: false
        });

        // 3. Buscar seções do projeto Asana
        const sections = await asanaApi.get(`/projects/${projectId}/sections`, {
          params: {
            opt_fields: 'name'
          }
        });

        // 4. Criar listas no Trello para cada seção
        const listMap = new Map();
        for (const section of sections.data.data) {
          const list = await trelloApi.post('/lists', {
            name: section.name,
            idBoard: trelloBoard.data.id
          });
          listMap.set(section.gid, list.data.id);
        }

        // 5. Buscar todas as tasks do projeto
        const tasks = await asanaApi.get(`/projects/${projectId}/tasks`, {
          params: {
            opt_fields: 'name,notes,due_on,memberships.section'
          }
        });

        let tasksTransferred = 0;
        const totalTasks = tasks.data.data.length;

        // 6. Migrar cada task como card
        for (const task of tasks.data.data) {
          try {
            // Obter detalhes completos da task
            const taskDetails = await asanaApi.get(`/tasks/${task.gid}`, {
              params: {
                opt_fields: 'name,notes,due_on,memberships.section,tags,assignee'
              }
            });

            const taskData = taskDetails.data.data;
            const sectionId = taskData.memberships?.[0]?.section?.gid;
            const listId = listMap.get(sectionId);

            // Criar card no Trello
            await trelloApi.post('/cards', {
              name: taskData.name,
              desc: taskData.notes || '',
              due: taskData.due_on,
              idList: listId,
              idBoard: trelloBoard.data.id
            });

            // Deletar a task do Asana após migração
            await asanaApi.delete(`/tasks/${task.gid}`);

            tasksTransferred++;
            onProgress?.({ current: tasksTransferred, total: totalTasks });
          } catch (error) {
            console.error(`Erro ao migrar task ${task.gid}:`, error);
            // Continua com a próxima task mesmo se houver erro
          }
        }

        // 7. Deletar o projeto do Asana após migração completa
        try {
          await asanaApi.delete(`/projects/${projectId}`);
        } catch (error) {
          console.error('Erro ao deletar projeto do Asana:', error);
        }
      }
    }

    return {
      success: true,
      message: 'Transferência concluída com sucesso!',
    };
  } catch (error) {
    console.error('Erro durante a migração:', error);
    throw error;
  }
}

export async function migrateSingleCard(
  cardId: string,
  boardId: string,
  asanaProjectId: string,
  asanaSectionId: string,
  onProgress?: (progress: { current: number; total: number }) => void
) {
  try {
    // 1. Buscar detalhes do card no Trello
    const card = await trelloApi.get(`/cards/${cardId}`, {
      params: {
        fields: 'id,name,desc,due,labels,idMembers,idList'
      }
    });

    onProgress?.({ current: 1, total: 3 });

    // 2. Criar a tarefa no Asana diretamente na seção selecionada
    await asanaApi.post('/tasks', {
      data: {
        name: card.data.name,
        notes: card.data.desc || '',
        due_on: card.data.due,
        projects: [asanaProjectId],
        memberships: [{
          project: asanaProjectId,
          section: asanaSectionId
        }]
      },
    });

    onProgress?.({ current: 2, total: 3 });

    // 3. Deletar o card original do Trello
    await trelloApi.delete(`/cards/${cardId}`);

    onProgress?.({ current: 3, total: 3 });

    return {
      success: true,
      message: 'Card migrado com sucesso!',
    };
  } catch (error) {
    console.error('Erro ao migrar card:', error);
    throw error;
  }
}

export async function migrateSingleTaskFromAsana(
  taskId: string,
  projectId: string,
  trelloBoardId: string,
  trelloListId: string,
  onProgress?: (progress: { current: number; total: number }) => void
) {
  try {
    // 1. Buscar detalhes da task no Asana
    const taskDetails = await asanaApi.get(`/tasks/${taskId}`, {
      params: {
        opt_fields: 'name,notes,due_on,tags,assignee'
      }
    });

    onProgress?.({ current: 1, total: 3 });

    // 2. Criar card no Trello
    await trelloApi.post('/cards', {
      name: taskDetails.data.data.name,
      desc: taskDetails.data.data.notes || '',
      due: taskDetails.data.data.due_on,
      idList: trelloListId,
      idBoard: trelloBoardId
    });

    onProgress?.({ current: 2, total: 3 });

    // 3. Deletar a task original do Asana
    await asanaApi.delete(`/tasks/${taskId}`);

    onProgress?.({ current: 3, total: 3 });

    return {
      success: true,
      message: 'Task migrada com sucesso!',
    };
  } catch (error) {
    console.error('Erro ao migrar task:', error);
    throw error;
  }
} 