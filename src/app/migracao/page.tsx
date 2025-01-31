'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { IconBrandTrello, IconBrandAsana, IconArrowRight, IconCheck } from '@tabler/icons-react';

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

  .meta {
    display: flex;
    gap: var(--space-4);
    font-size: 0.75rem;
    color: var(--text-secondary);
  }

  .checkbox {
    width: 18px;
    height: 18px;
    border: 2px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    
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

export default function MigracaoPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<'trello' | 'asana' | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const projects = [
    { id: '1', title: 'Marketing Digital', cards: 12, members: 5, status: 'Em andamento' },
    { id: '2', title: 'Website Redesign', cards: 8, members: 3, status: 'Planejamento' },
    { id: '3', title: 'Design System', cards: 15, members: 4, status: 'Em andamento' },
  ];

  const handleItemSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
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
            {projects.map(project => (
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
                <div className="meta">
                  <span>{project.cards} cards</span>
                  <span>{project.members} membros</span>
                  <span>{project.status}</span>
                </div>
              </ProjectCard>
            ))}
          </ProjectList>

          <ActionBar>
            <Button disabled={!selectedPlatform || selectedItems.length === 0}>
              Iniciar Migração
              <IconArrowRight size={16} />
            </Button>
          </ActionBar>
        </MainPanel>
      </Content>
    </PageWrapper>
  );
} 