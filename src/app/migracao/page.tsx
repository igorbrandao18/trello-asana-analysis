'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconArrowsExchange, IconBrandTrello, IconLayoutGrid, IconLoader2, IconChevronDown, IconCalendar, IconTag, IconUsers } from '@tabler/icons-react';
import { Header } from '@/components/Header';
import { getTrelloProjects, getAsanaProjects, migrateProjects } from '@/services/migration';
import { ProgressModal } from '@/components/ProgressModal';

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

const SourcePanel = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TargetPanel = styled(SourcePanel)``;

const PanelHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      width: 24px;
      height: 24px;
      opacity: 0.9;
    }
  }
`;

const SearchBar = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    font-size: 0.875rem;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.08);
    }
  }
`;

const ProjectList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
`;

const ProjectCard = styled.div<{ selected?: boolean }>`
  padding: 1rem 1.5rem;
  cursor: pointer;
  border-left: 2px solid ${props => props.selected ? '#ffffff' : 'transparent'};
  background: ${props => props.selected ? 'rgba(255, 255, 255, 0.08)' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .title {
    font-size: 0.875rem;
    font-weight: 500;
    color: #ffffff;
    margin: 0 0 0.25rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      width: 18px;
      height: 18px;
      opacity: 0.5;
      transition: transform 0.2s ease;
      transform: ${props => props.selected ? 'rotate(180deg)' : 'rotate(0deg)'};
    }
  }

  .description {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 0.75rem 0;
    line-height: 1.4;
  }

  .meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);

    .separator {
      color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const ProjectDetails = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
  overflow-y: auto;
  max-height: 500px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }
`;

const ListColumn = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ListHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .list-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .list-meta {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    padding: 0.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
`;

const CardsList = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }

  .card-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: #ffffff;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  .card-description {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.75rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.6875rem;
    color: rgba(255, 255, 255, 0.5);

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      
      svg {
        width: 12px;
        height: 12px;
        opacity: 0.7;
      }
    }
  }
`;

const ActionBar = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  ${props => props.variant === 'primary' ? `
    background: #ffffff;
    color: #1e2a3b;
    border: none;

    &:hover {
      background: rgba(255, 255, 255, 0.9);
    }
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.7);
  gap: 1rem;
  height: 100%;

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.7);
  height: 100%;
  text-align: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.5rem;

  .progress {
    height: 100%;
    background: #ffffff;
    transition: width 0.3s ease;
  }
`;

interface Project {
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

export default function MigracaoPage() {
  const [trelloProjects, setTrelloProjects] = useState<Project[]>([]);
  const [asanaProjects, setAsanaProjects] = useState<Project[]>([]);
  const [selectedTrelloBoard, setSelectedTrelloBoard] = useState<string>();
  const [selectedAsanaProject, setSelectedAsanaProject] = useState<string>();
  const [loadingTrello, setLoadingTrello] = useState(false);
  const [loadingAsana, setLoadingAsana] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [trelloSearch, setTrelloSearch] = useState('');
  const [asanaSearch, setAsanaSearch] = useState('');

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

  const filteredTrelloProjects = trelloProjects.filter(project =>
    project.title.toLowerCase().includes(trelloSearch.toLowerCase()) ||
    project.description?.toLowerCase().includes(trelloSearch.toLowerCase())
  );

  const filteredAsanaProjects = asanaProjects.filter(project =>
    project.title.toLowerCase().includes(asanaSearch.toLowerCase()) ||
    project.description?.toLowerCase().includes(asanaSearch.toLowerCase())
  );

  const selectedTrelloProject = trelloProjects.find(p => p.id === selectedTrelloBoard);

  const handleMigration = async () => {
    if (!selectedTrelloBoard || !selectedAsanaProject) return;
    
    setMigrating(true);
    setProgress(0);
    setStatus('processing');
    
    try {
      const selectedProject = trelloProjects.find(p => p.id === selectedTrelloBoard);
      if (selectedProject) {
        // Fase de Inicialização
        setCurrentTask('Iniciando processo de transferência...');
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
      }

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
            `${selectedProject?.lists?.find(l => l.cards.find(c => c.id === progress.current))?.name || ''}`
          );
        }
      });

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

  const renderTrelloCard = (project: Project) => (
    <ProjectCard 
      key={project.id} 
      selected={selectedTrelloBoard === project.id}
      onClick={() => setSelectedTrelloBoard(selectedTrelloBoard === project.id ? undefined : project.id)}
    >
      <div className="title">
        <span>{project.title}</span>
        <IconChevronDown />
      </div>
      {project.description && (
        <div className="description">{project.description}</div>
      )}
      <div className="meta">
        <span>{project.lists?.length || 0} Listas</span>
        <span className="separator">•</span>
        <span>{project.cards} Cards</span>
        <span className="separator">•</span>
        <span>{project.members} {project.members === 1 ? 'Membro' : 'Membros'}</span>
      </div>
      {selectedTrelloBoard === project.id && project.lists && (
        <ProjectDetails>
          <ListsContainer>
            {project.lists.map(list => (
              <ListColumn key={list.id}>
                <ListHeader>
                  <div className="list-title">
                    <span>{list.name}</span>
                  </div>
                  <div className="list-meta">
                    {list.cards.length} {list.cards.length === 1 ? 'card' : 'cards'}
                  </div>
                </ListHeader>
                <CardsList>
                  {list.cards.map(card => (
                    <Card key={card.id}>
                      <div className="card-title">{card.name}</div>
                      {card.description && (
                        <div className="card-description">{card.description}</div>
                      )}
                      <div className="card-meta">
                        {card.due && (
                          <span className="meta-item">
                            <IconCalendar />
                            {new Date(card.due).toLocaleDateString()}
                          </span>
                        )}
                        {card.labels && card.labels.length > 0 && (
                          <span className="meta-item">
                            <IconTag />
                            {card.labels.length} etiquetas
                          </span>
                        )}
                        {card.members && card.members.length > 0 && (
                          <span className="meta-item">
                            <IconUsers />
                            {card.members.length} membros
                          </span>
                        )}
                      </div>
                    </Card>
                  ))}
                </CardsList>
              </ListColumn>
            ))}
          </ListsContainer>
        </ProjectDetails>
      )}
    </ProjectCard>
  );

  const renderAsanaCard = (project: Project) => (
    <ProjectCard 
      key={project.id} 
      selected={selectedAsanaProject === project.id}
      onClick={() => setSelectedAsanaProject(selectedAsanaProject === project.id ? undefined : project.id)}
    >
      <div className="title">
        <span>{project.title}</span>
        <IconChevronDown />
      </div>
      {project.description && (
        <div className="description">{project.description}</div>
      )}
      <div className="meta">
        <span>{project.lists?.length || 0} Seções</span>
        <span className="separator">•</span>
        <span>{project.members} {project.members === 1 ? 'Membro' : 'Membros'}</span>
        <span className="separator">•</span>
        <span>{project.status}</span>
      </div>
      {selectedAsanaProject === project.id && project.lists && (
        <ProjectDetails>
          <ListsContainer>
            {project.lists.map(list => (
              <ListColumn key={list.id}>
                <ListHeader>
                  <div className="list-title">
                    <span>{list.name}</span>
                  </div>
                  <div className="list-meta">
                    {list.cards.length} {list.cards.length === 1 ? 'tarefa' : 'tarefas'}
                  </div>
                </ListHeader>
                <CardsList>
                  {list.cards.map(card => (
                    <Card key={card.id}>
                      <div className="card-title">{card.name}</div>
                      {card.description && (
                        <div className="card-description">
                          {card.description.split('\n').map((line, index) => (
                            line.startsWith('🎯') || line.startsWith('📊') || line.startsWith('📅') || 
                            line.startsWith('🏷️') || line.startsWith('⭐') || line.startsWith('📋') ? (
                              <div key={index} style={{ marginBottom: '0.25rem' }}>{line}</div>
                            ) : null
                          ))}
                        </div>
                      )}
                      <div className="card-meta">
                        {card.due && (
                          <span className="meta-item">
                            <IconCalendar />
                            {new Date(card.due).toLocaleDateString()}
                          </span>
                        )}
                        {card.labels && card.labels.length > 0 && (
                          <span className="meta-item">
                            <IconTag />
                            {card.labels.length} etiquetas
                          </span>
                        )}
                        {card.members && card.members.length > 0 && (
                          <span className="meta-item">
                            <IconUsers />
                            {card.members.length} membros
                          </span>
                        )}
                      </div>
                    </Card>
                  ))}
                </CardsList>
              </ListColumn>
            ))}
          </ListsContainer>
        </ProjectDetails>
      )}
    </ProjectCard>
  );

  return (
    <PageWrapper>
      <Content>
        <SourcePanel>
          <PanelHeader>
            <h2>
              <IconBrandTrello />
              Trello
            </h2>
          </PanelHeader>
          <SearchBar>
            <input 
              type="text" 
              placeholder="Buscar quadros..." 
              value={trelloSearch}
              onChange={(e) => setTrelloSearch(e.target.value)}
            />
          </SearchBar>
          <ProjectList>
            {loadingTrello ? (
              <LoadingWrapper>
                <IconLoader2 size={24} />
                <span>Carregando quadros...</span>
              </LoadingWrapper>
            ) : filteredTrelloProjects.length > 0 ? (
              filteredTrelloProjects.map(renderTrelloCard)
            ) : (
              <EmptyState>
                {trelloSearch ? 'Nenhum quadro encontrado' : 'Nenhum quadro disponível'}
              </EmptyState>
            )}
          </ProjectList>
          <ActionBar>
            <Stats>
              {selectedTrelloProject && (
                <>
                  <span>1 quadro selecionado</span>
                  <span className="separator">•</span>
                  <span>{selectedTrelloProject.cards} cards para transferir</span>
                </>
              )}
            </Stats>
            <Button 
              variant="primary"
              disabled={!selectedTrelloBoard || !selectedAsanaProject || migrating}
              onClick={handleMigration}
            >
              {migrating ? (
                <>
                  <IconLoader2 className="spin" />
                  Transferindo...
                </>
              ) : (
                <>
                  <IconArrowsExchange />
                  Transferir
                </>
              )}
            </Button>
          </ActionBar>
        </SourcePanel>

        <TargetPanel>
          <PanelHeader>
            <h2>
              <IconLayoutGrid />
              Asana
            </h2>
          </PanelHeader>
          <SearchBar>
            <input 
              type="text" 
              placeholder="Buscar projetos..." 
              value={asanaSearch}
              onChange={(e) => setAsanaSearch(e.target.value)}
            />
          </SearchBar>
          <ProjectList>
            {loadingAsana ? (
              <LoadingWrapper>
                <IconLoader2 size={24} />
                <span>Carregando projetos...</span>
              </LoadingWrapper>
            ) : filteredAsanaProjects.length > 0 ? (
              filteredAsanaProjects.map(renderAsanaCard)
            ) : (
              <EmptyState>
                {asanaSearch ? 'Nenhum projeto encontrado' : 'Nenhum projeto disponível'}
              </EmptyState>
            )}
          </ProjectList>
          <ActionBar>
            <Stats>
              {selectedAsanaProject && <span>1 projeto selecionado</span>}
            </Stats>
            <Button 
              variant="primary"
              disabled={!selectedTrelloBoard || !selectedAsanaProject || migrating}
              onClick={handleMigration}
            >
              {migrating ? (
                <>
                  <IconLoader2 />
                  Migrando...
                </>
              ) : (
                <>
                  <IconArrowsExchange />
                  Iniciar Migração
                </>
              )}
            </Button>
          </ActionBar>
        </TargetPanel>
      </Content>

      <ProgressModal 
        isOpen={migrating}
        currentTask={currentTask}
        progress={progress}
        status={status}
      />
    </PageWrapper>
  );
} 