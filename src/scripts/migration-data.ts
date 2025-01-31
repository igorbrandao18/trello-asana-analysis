import { trelloApi, asanaApi } from '../services/api';

// Script para limpar dados
async function cleanupData() {
  try {
    // Limpar boards do Trello
    const trelloBoards = await trelloApi.get('/members/me/boards');
    for (const board of trelloBoards.data) {
      await trelloApi.delete(`/boards/${board.id}`);
    }

    // Limpar projetos do Asana
    const user = await asanaApi.get('/users/me');
    const workspaceId = user.data.data.workspaces[0].gid;
    const asanaProjects = await asanaApi.get(`/workspaces/${workspaceId}/projects`);
    
    for (const project of asanaProjects.data.data) {
      await asanaApi.delete(`/projects/${project.gid}`);
    }

    console.log('✅ Todos os dados foram limpos com sucesso!');
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
  }
}

// Script para popular com dados reais de trabalho
async function populateWorkData() {
  try {
    // Criar labels padrão para usar nos boards
    const labels = [
      { name: 'Bug', color: 'red' },
      { name: 'Feature', color: 'green' },
      { name: 'Enhancement', color: 'blue' },
      { name: 'Documentation', color: 'purple' },
      { name: 'High Priority', color: 'orange' },
      { name: 'Backend', color: 'yellow' },
      { name: 'Frontend', color: 'sky' },
      { name: 'DevOps', color: 'black' },
    ];

    // Criar boards no Trello com estrutura real de trabalho
    const developmentBoard = await trelloApi.post('/boards', {
      name: 'Desenvolvimento de Produto',
      desc: 'Pipeline principal de desenvolvimento do produto',
      defaultLists: false,
    });

    // Criar labels para o board
    for (const label of labels) {
      await trelloApi.post(`/boards/${developmentBoard.data.id}/labels`, label);
    }

    // Criar listas padrão de desenvolvimento
    const lists = [
      { name: 'Backlog', pos: 'bottom' },
      { name: 'To Do', pos: 'bottom' },
      { name: 'In Progress', pos: 'bottom' },
      { name: 'Code Review', pos: 'bottom' },
      { name: 'QA', pos: 'bottom' },
      { name: 'Done', pos: 'bottom' },
    ];

    for (const list of lists) {
      await trelloApi.post('/lists', {
        name: list.name,
        idBoard: developmentBoard.data.id,
        pos: list.pos,
      });
    }

    // Criar cards com exemplos reais
    const cards = [
      {
        name: 'Implementar Autenticação OAuth2',
        desc: 'Implementar sistema de autenticação usando OAuth2 com suporte a múltiplos providers',
        labels: ['Backend', 'High Priority'],
        list: 'In Progress',
      },
      {
        name: 'Refatorar Componentes React',
        desc: 'Refatorar componentes para usar Hooks e melhorar performance',
        labels: ['Frontend', 'Enhancement'],
        list: 'Code Review',
      },
      {
        name: 'Setup Pipeline CI/CD',
        desc: 'Configurar pipeline de integração e deploy contínuo usando GitHub Actions',
        labels: ['DevOps', 'High Priority'],
        list: 'To Do',
      },
      {
        name: 'Bug: Memory Leak em Produção',
        desc: 'Investigar e corrigir memory leak reportado em produção',
        labels: ['Bug', 'High Priority', 'Backend'],
        list: 'In Progress',
      },
      {
        name: 'Documentar API REST',
        desc: 'Criar documentação completa da API usando Swagger',
        labels: ['Documentation', 'Backend'],
        list: 'QA',
      },
    ];

    // Obter IDs das listas criadas
    const boardLists = await trelloApi.get(`/boards/${developmentBoard.data.id}/lists`);
    const listsMap = boardLists.data.reduce((acc: any, list: any) => {
      acc[list.name] = list.id;
      return acc;
    }, {});

    // Obter IDs das labels criadas
    const boardLabels = await trelloApi.get(`/boards/${developmentBoard.data.id}/labels`);
    const labelsMap = boardLabels.data.reduce((acc: any, label: any) => {
      acc[label.name] = label.id;
      return acc;
    }, {});

    // Criar os cards
    for (const card of cards) {
      const cardLabels = card.labels.map(labelName => labelsMap[labelName]);
      await trelloApi.post('/cards', {
        name: card.name,
        desc: card.desc,
        idList: listsMap[card.list],
        idLabels: cardLabels,
      });
    }

    // Criar projeto no Asana
    const user = await asanaApi.get('/users/me');
    const workspaceId = user.data.data.workspaces[0].gid;

    const asanaProject = await asanaApi.post('/projects', {
      data: {
        name: 'Desenvolvimento de Produto',
        workspace: workspaceId,
        notes: 'Pipeline principal de desenvolvimento do produto',
      },
    });

    // Criar seções no Asana
    const sections = ['Backlog', 'To Do', 'In Progress', 'Review', 'Testing', 'Complete'];
    for (const section of sections) {
      await asanaApi.post('/sections', {
        data: {
          name: section,
          project: asanaProject.data.data.gid,
        },
      });
    }

    console.log('✅ Dados de exemplo foram criados com sucesso!');
  } catch (error) {
    console.error('Erro ao popular dados:', error);
  }
}

// Exportar funções para uso via CLI ou importação
export const migrationScripts = {
  cleanup: cleanupData,
  populate: populateWorkData,
}; 