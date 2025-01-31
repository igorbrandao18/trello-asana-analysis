import { trelloApi, asanaApi } from '@/services/api';

const RESTAURANTS = [
  {
    name: "Sabor Oriental Sushi",
    category: "Japonês",
    rating: 4.8,
    menu: [
      { name: "Combo 30 Peças", price: 89.90, description: "10 hossomakis, 10 uramakis e 10 niguiris variados" },
      { name: "Hot Roll Especial", price: 32.90, description: "8 peças de hot roll com salmão grelhado e cream cheese" },
      { name: "Temaki Salmão", price: 28.90, description: "Temaki de salmão fresco com cream cheese e cebolinha" }
    ]
  },
  {
    name: "La Pasta Autêntica",
    category: "Italiano",
    rating: 4.7,
    menu: [
      { name: "Fettuccine ao Funghi", price: 58.90, description: "Massa fresca com mix de cogumelos e creme de leite fresco" },
      { name: "Lasanha Bolonhesa", price: 49.90, description: "Lasanha artesanal com molho bolonhesa e bechamel" },
      { name: "Ravioli de Mozzarella", price: 54.90, description: "Massa recheada com mozzarella ao sugo" }
    ]
  },
  {
    name: "Burger House Premium",
    category: "Hambúrguer",
    rating: 4.6,
    menu: [
      { name: "Classic Cheese", price: 32.90, description: "Blend 180g, cheddar, alface, tomate e molho especial" },
      { name: "BBQ Bacon", price: 38.90, description: "Blend 180g, bacon crocante, cebola caramelizada e molho BBQ" },
      { name: "Veggie Supreme", price: 34.90, description: "Hambúrguer de grão de bico, abacate e maionese vegana" }
    ]
  }
];

const DELIVERY_STATUSES = [
  "🟡 Pedido Recebido",
  "🟠 Em Preparação",
  "🔵 Saiu para Entrega",
  "🟢 Entregue",
  "⚪ Cancelado"
];

const CUSTOMER_REVIEWS = [
  "Comida excelente! Entrega rápida e embalagem muito bem feita.",
  "Pedido chegou no tempo previsto e a temperatura estava perfeita.",
  "Ótimo custo-benefício. Com certeza pedirei novamente!",
  "A apresentação do prato superou minhas expectativas.",
  "Porções generosas e sabor incrível."
];

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

export const migrationScripts = {
  cleanup: cleanupData,
  populate: populateWorkData,
  async populate() {
    try {
      // Criando board principal no Trello
      const mainBoard = await trelloApi.post('/boards', {
        name: 'Sistema de Delivery',
        desc: 'Gestão completa do sistema de delivery com pedidos, restaurantes e avaliações',
        defaultLists: false,
      });

      // Criando listas para diferentes aspectos do negócio
      const lists = await Promise.all([
        trelloApi.post(`/boards/${mainBoard.data.id}/lists`, { name: '📋 Novos Pedidos' }),
        trelloApi.post(`/boards/${mainBoard.data.id}/lists`, { name: '👨‍🍳 Em Preparação' }),
        trelloApi.post(`/boards/${mainBoard.data.id}/lists`, { name: '🛵 Em Entrega' }),
        trelloApi.post(`/boards/${mainBoard.data.id}/lists`, { name: '✅ Entregues' }),
        trelloApi.post(`/boards/${mainBoard.data.id}/lists`, { name: '⭐ Avaliações' })
      ]);

      // Criando labels para categorização
      const labels = await Promise.all([
        trelloApi.post(`/boards/${mainBoard.data.id}/labels`, { name: 'Urgente', color: 'red' }),
        trelloApi.post(`/boards/${mainBoard.data.id}/labels`, { name: 'VIP', color: 'purple' }),
        trelloApi.post(`/boards/${mainBoard.data.id}/labels`, { name: 'Novo Cliente', color: 'green' }),
        trelloApi.post(`/boards/${mainBoard.data.id}/labels`, { name: 'Pedido Grande', color: 'yellow' })
      ]);

      // Criando cards de pedidos com dados realistas
      for (const restaurant of RESTAURANTS) {
        for (let i = 0; i < 3; i++) {
          const randomMenu = restaurant.menu[Math.floor(Math.random() * restaurant.menu.length)];
          const randomStatus = Math.floor(Math.random() * 3);
          const isVIP = Math.random() > 0.7;
          const isUrgent = Math.random() > 0.8;

          await trelloApi.post('/cards', {
            idList: lists[randomStatus].data.id,
            name: `Pedido #${Math.floor(Math.random() * 9000) + 1000} - ${restaurant.name}`,
            desc: `🍽️ Item: ${randomMenu.name}\n` +
                  `💰 Valor: R$ ${randomMenu.price.toFixed(2)}\n` +
                  `📝 Observações: ${randomMenu.description}\n` +
                  `⭐ Avaliação do Restaurante: ${restaurant.rating}\n` +
                  `🏷️ Categoria: ${restaurant.category}`,
            idLabels: [
              ...(isVIP ? [labels[1].data.id] : []),
              ...(isUrgent ? [labels[0].data.id] : [])
            ]
          });
        }

        // Criando avaliações para cada restaurante
        const randomReview = CUSTOMER_REVIEWS[Math.floor(Math.random() * CUSTOMER_REVIEWS.length)];
        await trelloApi.post('/cards', {
          idList: lists[4].data.id,
          name: `Avaliação - ${restaurant.name}`,
          desc: `⭐ ${restaurant.rating}/5.0\n\n"${randomReview}"\n\n📅 ${new Date().toLocaleDateString()}`,
          idLabels: restaurant.rating >= 4.7 ? [labels[1].data.id] : []
        });
      }

      // Criando projeto no Asana
      const user = await asanaApi.get('/users/me');
      const workspaceId = user.data.data.workspaces[0].gid;
      
      const deliveryProject = await asanaApi.post('/projects', {
        data: {
          name: 'Gestão de Delivery',
          workspace: workspaceId,
          notes: 'Sistema completo de gestão de delivery com pedidos, restaurantes e avaliações'
        }
      });

      // Criando seções no Asana
      const sections = await Promise.all([
        asanaApi.post('/sections', {
          data: {
            project: deliveryProject.data.data.gid,
            name: '🏪 Restaurantes Parceiros'
          }
        }),
        asanaApi.post('/sections', {
          data: {
            project: deliveryProject.data.data.gid,
            name: '📊 Métricas e Desempenho'
          }
        }),
        asanaApi.post('/sections', {
          data: {
            project: deliveryProject.data.data.gid,
            name: '📈 Metas Mensais'
          }
        })
      ]);

      // Criando tarefas para cada restaurante
      for (const restaurant of RESTAURANTS) {
        await asanaApi.post('/tasks', {
          data: {
            workspace: workspaceId,
            projects: [deliveryProject.data.data.gid],
            name: restaurant.name,
            notes: `🏷️ Categoria: ${restaurant.category}\n` +
                  `⭐ Avaliação: ${restaurant.rating}/5.0\n\n` +
                  `📋 Cardápio:\n` +
                  restaurant.menu.map(item => 
                    `• ${item.name} - R$ ${item.price.toFixed(2)}\n  ${item.description}`
                  ).join('\n\n'),
            memberships: [
              {
                project: deliveryProject.data.data.gid,
                section: sections[0].data.data.gid
              }
            ]
          }
        });
      }

      // Criando métricas de desempenho
      const metrics = [
        { name: 'Taxa de Entrega no Prazo', target: '95%', current: '93.5%' },
        { name: 'Satisfação do Cliente', target: '4.8/5.0', current: '4.6/5.0' },
        { name: 'Tempo Médio de Entrega', target: '35 min', current: '38 min' }
      ];

      for (const metric of metrics) {
        await asanaApi.post('/tasks', {
          data: {
            workspace: workspaceId,
            projects: [deliveryProject.data.data.gid],
            name: metric.name,
            notes: `🎯 Meta: ${metric.target}\n` +
                  `📊 Atual: ${metric.current}\n\n` +
                  `Atualizado em: ${new Date().toLocaleDateString()}`,
            memberships: [
              {
                project: deliveryProject.data.data.gid,
                section: sections[1].data.data.gid
              }
            ]
          }
        });
      }

      // Criando metas mensais
      const goals = [
        { name: 'Aumentar Base de Restaurantes', target: '+15 novos parceiros' },
        { name: 'Reduzir Tempo de Entrega', target: '-5 minutos em média' },
        { name: 'Melhorar Rating Médio', target: 'Atingir 4.8/5.0' }
      ];

      for (const goal of goals) {
        await asanaApi.post('/tasks', {
          data: {
            workspace: workspaceId,
            projects: [deliveryProject.data.data.gid],
            name: goal.name,
            notes: `🎯 Meta: ${goal.target}\n` +
                  `📅 Prazo: ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}`,
            memberships: [
              {
                project: deliveryProject.data.data.gid,
                section: sections[2].data.data.gid
              }
            ]
          }
        });
      }

      return true;
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      throw error;
    }
  }
}; 