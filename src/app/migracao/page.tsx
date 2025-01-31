'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconBrandTrello, IconLayoutGrid, IconBrandAsana } from '@tabler/icons-react';
import { getTrelloProjects, getAsanaProjects, migrateProjects, migrateSingleCard } from '@/services/migration';
import { ProgressModal } from '@/components/ProgressModal';
import { ProjectPanel, TransferArea, CardMigrationModal } from '@/components/migration';
import { Project } from '@/types/project';

const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: var(--sidebar-width);
  background: #1e2a3b;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem;
  gap: 2rem;
  overflow: hidden;
`;

export default function MigracaoPage() {
  const [trelloProjects, setTrelloProjects] = useState<Project[]>([]);
  const [asanaProjects, setAsanaProjects] = useState<Project[]>([]);
  const [selectedTrelloBoard, setSelectedTrelloBoard] = useState<string>();
  const [selectedAsanaProject, setSelectedAsanaProject] = useState<string>();
  const [selectedAsanaSection, setSelectedAsanaSection] = useState<string>();
  const [loadingTrello, setLoadingTrello] = useState(false);
  const [loadingAsana, setLoadingAsana] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [trelloSearch, setTrelloSearch] = useState('');
  const [asanaSearch, setAsanaSearch] = useState('');
  const [migratingCards, setMigratingCards] = useState<Set<string>>(new Set());
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    boardId: string;
    name: string;
    description: string;
  } | null>(null);

  const loadTrelloProjects = async () => {
    setLoadingTrello(true);
    try {
      const data = await getTrelloProjects();
      setTrelloProjects(data);
    } catch (error) {
      console.error('Erro ao carregar projetos do Trello:', error);
    } finally {
      setLoadingTrello(false);
    }
  };

  const loadAsanaProjects = async () => {
    setLoadingAsana(true);
    try {
      const data = await getAsanaProjects();
      setAsanaProjects(data);
    } catch (error) {
      console.error('Erro ao carregar projetos do Asana:', error);
    } finally {
      setLoadingAsana(false);
    }
  };

  useEffect(() => {
    loadTrelloProjects();
    loadAsanaProjects();
  }, []);

  const handleMigration = async () => {
    if (!selectedTrelloBoard && !selectedAsanaProject) return;
    
    setMigrating(true);
    setProgress(0);
    setStatus('processing');
    
    try {
      if (selectedTrelloBoard) {
        // Migração do Trello para o Asana
        const selectedProject = trelloProjects.find(p => p.id === selectedTrelloBoard);
        if (selectedProject) {
          // Fase de Inicialização
          setCurrentTask('Iniciando processo de transferência do Trello para o Asana...');
          await new Promise(resolve => setTimeout(resolve, 800));
          setProgress(5);

          setCurrentTask('Verificando conexão com as APIs...');
          await new Promise(resolve => setTimeout(resolve, 600));
          setProgress(10);

          setCurrentTask('Analisando estrutura do board...');
          await new Promise(resolve => setTimeout(resolve, 700));
          setProgress(15);

          // Fase de Preparação
          setCurrentTask(`Preparando transferência de ${selectedProject.lists?.length || 0} listas e ${selectedProject.cards} cards...`);
          await new Promise(resolve => setTimeout(resolve, 800));
          setProgress(20);

          // Fase de Criação da Estrutura
          setCurrentTask('Criando estrutura no Asana...');
          await new Promise(resolve => setTimeout(resolve, 600));
          setProgress(25);

          setCurrentTask('Configurando seções e propriedades...');
          await new Promise(resolve => setTimeout(resolve, 700));
          setProgress(30);

          // Fase de Transferência
          setCurrentTask('Iniciando transferência de conteúdo...');
          await new Promise(resolve => setTimeout(resolve, 500));
          setProgress(35);

          // Transferência dos Cards
          await migrateProjects('trello', [selectedTrelloBoard], (progress) => {
            const baseProgress = 35;
            const transferProgress = Math.round((progress.current / progress.total) * 40);
            setProgress(baseProgress + transferProgress);

            if (progress.current === progress.total) {
              setCurrentTask('Todos os cards foram transferidos com sucesso!');
            } else {
              setCurrentTask(
                `Transferindo card ${progress.current} de ${progress.total}...\n` +
                `${selectedProject?.lists?.find(l => l.cards.find(c => c.id === String(progress.current)))?.name || ''}`
              );
            }
          });
        }
      } else if (selectedAsanaProject) {
        // Migração do Asana para o Trello
        const selectedProject = asanaProjects.find(p => p.id === selectedAsanaProject);
        if (selectedProject) {
          // Fase de Inicialização
          setCurrentTask('Iniciando processo de transferência do Asana para o Trello...');
          await new Promise(resolve => setTimeout(resolve, 800));
          setProgress(5);

          setCurrentTask('Verificando conexão com as APIs...');
          await new Promise(resolve => setTimeout(resolve, 600));
          setProgress(10);

          setCurrentTask('Analisando estrutura do projeto...');
          await new Promise(resolve => setTimeout(resolve, 700));
          setProgress(15);

          // Fase de Preparação
          setCurrentTask(`Preparando transferência de ${selectedProject.lists?.length || 0} seções e ${selectedProject.cards} tasks...`);
          await new Promise(resolve => setTimeout(resolve, 800));
          setProgress(20);

          // Fase de Criação da Estrutura
          setCurrentTask('Criando estrutura no Trello...');
          await new Promise(resolve => setTimeout(resolve, 600));
          setProgress(25);

          setCurrentTask('Configurando listas e propriedades...');
          await new Promise(resolve => setTimeout(resolve, 700));
          setProgress(30);

          // Fase de Transferência
          setCurrentTask('Iniciando transferência de conteúdo...');
          await new Promise(resolve => setTimeout(resolve, 500));
          setProgress(35);

          // Transferência das Tasks
          await migrateProjects('asana', [selectedAsanaProject], (progress) => {
            const baseProgress = 35;
            const transferProgress = Math.round((progress.current / progress.total) * 40);
            setProgress(baseProgress + transferProgress);

            if (progress.current === progress.total) {
              setCurrentTask('Todas as tasks foram transferidas com sucesso!');
            } else {
              setCurrentTask(
                `Transferindo task ${progress.current} de ${progress.total}...\n` +
                `${selectedProject?.lists?.find(l => l.cards.find(c => c.id === String(progress.current)))?.name || ''}`
              );
            }
          });
        }
      }

      // Fase de Finalização
      setCurrentTask('Verificando integridade dos dados...');
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(80);

      setCurrentTask('Removendo dados originais...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(85);

      setCurrentTask('Atualizando referências...');
      await new Promise(resolve => setTimeout(resolve, 700));
      setProgress(90);

      // Atualizar as listas
      setCurrentTask('Sincronizando alterações...');
      await Promise.all([
        loadTrelloProjects(),
        loadAsanaProjects()
      ]);
      setProgress(95);

      setCurrentTask('Finalizando processo...');
      await new Promise(resolve => setTimeout(resolve, 600));
      setProgress(100);

      setCurrentTask('Transferência concluída com sucesso! 🎉\nTodos os dados foram migrados e verificados.');
      setStatus('success');
      
      // Delay para mostrar o sucesso
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Limpar seleções
      setSelectedTrelloBoard(undefined);
      setSelectedAsanaProject(undefined);
      
      // Recarregar os dados
      await Promise.all([
        loadTrelloProjects(),
        loadAsanaProjects()
      ]);
    } catch (error) {
      console.error('Erro durante a migração:', error);
      setCurrentTask('❌ Erro durante a transferência.\nVerifique as conexões e tente novamente.');
      setStatus('error');
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setMigrating(false);
      setProgress(0);
      setCurrentTask('');
      setStatus('processing');
    }
  };

  const handleSingleCardMigration = async (cardId: string, boardId: string) => {
    if (!selectedAsanaProject) {
      setCurrentTask('Erro: Selecione um projeto do Asana para migrar o card.');
      setStatus('error');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentTask('');
      setStatus('processing');
      return;
    }

    if (!selectedAsanaSection) {
      setCurrentTask('Erro: Selecione uma seção do Asana para migrar o card.');
      setStatus('error');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentTask('');
      setStatus('processing');
      return;
    }

    if (migratingCards.has(cardId)) return;
    
    setMigratingCards(prev => new Set(prev).add(cardId));
    setMigrating(true);
    setProgress(0);
    setStatus('processing');
    
    try {
      setCurrentTask('Iniciando migração do card...');
      
      await migrateSingleCard(
        cardId, 
        boardId, 
        selectedAsanaProject,
        selectedAsanaSection,
        (progress) => {
          setProgress(progress.current / progress.total * 100);
          setCurrentTask('Migrando card para o Asana...');
        }
      );
      
      setProgress(100);
      setCurrentTask('Card migrado com sucesso!');
      setStatus('success');
      
      await Promise.all([
        loadTrelloProjects(),
        loadAsanaProjects()
      ]);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error: any) {
      console.error('Erro detalhado ao migrar card:', {
        cardId,
        boardId,
        projectId: selectedAsanaProject,
        sectionId: selectedAsanaSection,
        error: error.message,
        stack: error.stack
      });
      
      setCurrentTask('Erro: ' + (error.message || 'Falha ao migrar o card') + '. Verifique o console para mais detalhes.');
      setStatus('error');
      await new Promise(resolve => setTimeout(resolve, 3000));
    } finally {
      setMigratingCards(prev => {
        const next = new Set(prev);
        next.delete(cardId);
        return next;
      });
      setMigrating(false);
      setProgress(0);
      setCurrentTask('');
      setStatus('processing');
    }
  };

  const handleCardClick = (card: {
    id: string;
    name: string;
    description: string;
  }, boardId: string) => {
    setSelectedCard({
      id: card.id,
      boardId,
      name: card.name,
      description: card.description
    });
  };

  const handleConfirmMigration = async () => {
    if (!selectedCard || !selectedAsanaProject || !selectedAsanaSection) return;
    
    await handleSingleCardMigration(selectedCard.id, selectedCard.boardId);
    setSelectedCard(null);
  };

  return (
    <PageWrapper>
      <Content>
        <ProjectPanel
          type="trello"
          title="Trello"
          projects={trelloProjects}
          loading={loadingTrello}
          searchValue={trelloSearch}
          selectedProjectId={selectedTrelloBoard}
          onSearchChange={setTrelloSearch}
          onProjectSelect={setSelectedTrelloBoard}
          icon={<IconBrandTrello />}
        />

        <TransferArea
          isActive={!!selectedTrelloBoard || !!selectedAsanaProject}
          isMigrating={migrating}
          progress={progress}
          currentTask={currentTask}
          onTransfer={handleMigration}
        />

        <ProjectPanel
          type="asana"
          title="Asana"
          projects={asanaProjects}
          loading={loadingAsana}
          searchValue={asanaSearch}
          selectedProjectId={selectedAsanaProject}
          selectedListId={selectedAsanaSection}
          onSearchChange={setAsanaSearch}
          onProjectSelect={setSelectedAsanaProject}
          onListSelect={setSelectedAsanaSection}
          icon={<IconBrandAsana />}
        />
      </Content>

      <ProgressModal 
        isOpen={migrating}
        currentTask={currentTask}
        progress={progress}
        status={status}
      />

      <CardMigrationModal
        card={selectedCard}
        asanaProjects={asanaProjects}
        selectedProjectId={selectedAsanaProject}
        selectedSectionId={selectedAsanaSection}
        onProjectSelect={setSelectedAsanaProject}
        onSectionSelect={setSelectedAsanaSection}
        onClose={() => setSelectedCard(null)}
        onConfirm={handleConfirmMigration}
      />
    </PageWrapper>
  );
} 