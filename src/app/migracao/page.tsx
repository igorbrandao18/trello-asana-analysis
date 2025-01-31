'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconBrandTrello, IconBrandAsana, IconArrowRight, IconCheck, IconLoader2, IconCalendar, IconTag, IconUsers } from '@tabler/icons-react';
import { getTrelloProjects, getAsanaProjects, migrateProjects } from '@/services/migration';

const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: var(--sidebar-width);
  background: var(--bg-surface);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
  
  h1 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: var(--space-2);
    color: var(--text-primary);
  }
  
  p {
    color: var(--text-secondary);
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 280px;
  border-right: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  overflow-y: auto;
`;

const MainPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-base);
`;

const PlatformOption = styled.div<{ selected?: boolean }>`
  padding: var(--space-4);
  cursor: pointer;
  border-left: 2px solid ${props => props.selected ? 'var(--brand-primary)' : 'transparent'};
  background: ${props => props.selected ? 'var(--bg-surface-hover)' : 'transparent'};

  &:hover {
    background: var(--bg-surface-hover);
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-2);

    svg {
      width: 20px;
      height: 20px;
      color: ${props => props.selected ? 'var(--brand-primary)' : 'var(--text-secondary)'};
    }

    h3 {
      font-size: 0.875rem;
      font-weight: 500;
      color: ${props => props.selected ? 'var(--text-primary)' : 'var(--text-secondary)'};
    }
  }

  p {
    padding-left: calc(20px + var(--space-3));
    font-size: 0.75rem;
    color: var(--text-secondary);
  }
`;

const ProjectList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4);
`;

const ProjectCard = styled.div`
  padding: var(--space-4);
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  margin-bottom: var(--space-3);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--brand-primary);
    background: var(--bg-surface-hover);
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-2);
  }

  .title {
    font-weight: 500;
    color: var(--text-primary);
  }

  .description {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: var(--space-3);
    margin-left: calc(18px + var(--space-3));
  }

  .meta {
    display: flex;
    gap: var(--space-4);
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-left: calc(18px + var(--space-3));
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);

    svg {
      width: 14px;
      height: 14px;
    }
  }

  .lists {
    margin-top: var(--space-3);
    margin-left: calc(18px + var(--space-3));
    padding-top: var(--space-3);
    border-top: 1px solid var(--border-subtle);
    display: flex;
    gap: var(--space-3);
    overflow-x: auto;
    padding-bottom: var(--space-2);
  }

  .list {
    flex: 0 0 200px;
    padding: var(--space-2);
    background: var(--bg-surface-hover);
    border-radius: var(--radius-sm);
    font-size: 0.75rem;

    .list-name {
      font-weight: 500;
      margin-bottom: var(--space-2);
      color: var(--text-primary);
    }

    .card-count {
      color: var(--text-secondary);
    }
  }

  .checkbox {
    width: 18px;
    height: 18px;
    border: 2px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    flex-shrink: 0;
    
    &:checked {
      background: var(--brand-primary);
      border-color: var(--brand-primary);
    }
  }
`;

const ActionBar = styled.div`
  padding: var(--space-4);
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--brand-primary);
  color: white;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--brand-primary-dark);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  color: var(--text-secondary);
  gap: var(--space-4);

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  color: var(--text-secondary);
`;

interface List {
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
}

interface Project {
  id: string;
  title: string;
  description?: string;
  cards: number;
  members: number;
  status: string;
  lists?: List[];
}

export default function MigracaoPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<'trello' | 'asana' | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      if (!selectedPlatform) {
        setProjects([]);
        return;
      }

      setLoading(true);
      try {
        const data = await (selectedPlatform === 'trello' ? getTrelloProjects() : getAsanaProjects());
        setProjects(data);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        // Aqui você pode adicionar uma notificação de erro para o usuário
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [selectedPlatform]);

  const handleItemSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleMigration = async () => {
    if (!selectedPlatform || selectedItems.length === 0) return;

    setMigrating(true);
    try {
      await migrateProjects(selectedPlatform, selectedItems);
      // Aqui você pode adicionar uma notificação de sucesso
      setSelectedItems([]);
      setSelectedPlatform(null);
    } catch (error) {
      console.error('Erro durante a migração:', error);
      // Aqui você pode adicionar uma notificação de erro
    } finally {
      setMigrating(false);
    }
  };

  return (
    <PageWrapper>
      <Header>
        <h1>Migração de Projetos</h1>
        <p>Selecione a plataforma de destino e os projetos para migrar</p>
      </Header>
      
      <Content>
        <Sidebar>
          <PlatformOption 
            selected={selectedPlatform === 'trello'}
            onClick={() => setSelectedPlatform('trello')}
          >
            <div className="header">
              <IconBrandTrello />
              <h3>Trello</h3>
            </div>
            <p>Migre mantendo cards e listas</p>
          </PlatformOption>

          <PlatformOption 
            selected={selectedPlatform === 'asana'}
            onClick={() => setSelectedPlatform('asana')}
          >
            <div className="header">
              <IconBrandAsana />
              <h3>Asana</h3>
            </div>
            <p>Preserve tarefas e timelines</p>
          </PlatformOption>
        </Sidebar>

        <MainPanel>
          <ProjectList>
            {loading ? (
              <LoadingState>
                <IconLoader2 className="spin" />
                <p>Carregando projetos...</p>
              </LoadingState>
            ) : projects.length > 0 ? (
              projects.map(project => (
                <ProjectCard key={project.id} onClick={() => handleItemSelect(project.id)}>
                  <div className="header">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedItems.includes(project.id)}
                      onChange={() => {}}
                    />
                    <span className="title">{project.title}</span>
                  </div>
                  
                  {project.description && (
                    <div className="description">{project.description}</div>
                  )}

                  <div className="meta">
                    <span className="meta-item">
                      <IconTag size={14} />
                      {project.cards} cards
                    </span>
                    <span className="meta-item">
                      <IconUsers size={14} />
                      {project.members} membros
                    </span>
                    <span className="meta-item">
                      {project.status}
                    </span>
                  </div>

                  {project.lists && project.lists.length > 0 && (
                    <div className="lists">
                      {project.lists.map(list => (
                        <div key={list.id} className="list">
                          <div className="list-name">{list.name}</div>
                          <div className="card-count">{list.cards.length} cards</div>
                        </div>
                      ))}
                    </div>
                  )}
                </ProjectCard>
              ))
            ) : selectedPlatform ? (
              <EmptyState>
                <p>Nenhum projeto encontrado</p>
              </EmptyState>
            ) : (
              <EmptyState>
                <p>Selecione uma plataforma para ver os projetos</p>
              </EmptyState>
            )}
          </ProjectList>

          <ActionBar>
            <Button 
              disabled={!selectedPlatform || selectedItems.length === 0 || migrating}
              onClick={handleMigration}
            >
              {migrating ? (
                <>
                  <IconLoader2 className="spin" />
                  Migrando...
                </>
              ) : (
                <>
                  Iniciar Migração
                  <IconArrowRight size={16} />
                </>
              )}
            </Button>
          </ActionBar>
        </MainPanel>
      </Content>
    </PageWrapper>
  );
} 