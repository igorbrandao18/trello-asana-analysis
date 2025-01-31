import styled from 'styled-components';
import { IconLoader2 } from '@tabler/icons-react';
import { Project } from '@/types/project';
import { ProjectCard } from './ProjectCard';

const Panel = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

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
  padding: 1rem 1.25rem;
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

const ActionBar = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`;

interface ProjectPanelProps {
  type: 'trello' | 'asana';
  title: React.ReactNode;
  projects: Project[];
  loading: boolean;
  searchValue: string;
  selectedProjectId?: string;
  selectedListId?: string;
  onSearchChange: (value: string) => void;
  onProjectSelect: (projectId: string) => void;
  onListSelect?: (listId: string) => void;
  icon?: React.ReactNode;
}

export const ProjectPanel: React.FC<ProjectPanelProps> = ({
  type,
  title,
  projects,
  loading,
  searchValue,
  selectedProjectId,
  selectedListId,
  onSearchChange,
  onProjectSelect,
  onListSelect,
  icon
}) => {
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <Panel>
      <PanelHeader>
        <h2>
          {icon}
          {title}
        </h2>
      </PanelHeader>
      <SearchBar>
        <input 
          type="text" 
          placeholder={`Buscar ${type === 'trello' ? 'quadros' : 'projetos'}...`}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </SearchBar>
      <ProjectList>
        {loading ? (
          <LoadingWrapper>
            <IconLoader2 size={24} />
            <span>Carregando {type === 'trello' ? 'quadros' : 'projetos'}...</span>
          </LoadingWrapper>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              lists={project.lists}
              members={project.members}
              selected={selectedProjectId === project.id}
              icon={icon}
              onSelect={onProjectSelect}
              onListSelect={onListSelect}
              selectedListId={selectedListId}
              type={type}
            />
          ))
        ) : (
          <EmptyState>
            {searchValue 
              ? `Nenhum ${type === 'trello' ? 'quadro' : 'projeto'} encontrado` 
              : `Nenhum ${type === 'trello' ? 'quadro' : 'projeto'} disponível`}
          </EmptyState>
        )}
      </ProjectList>
      <ActionBar>
        <Stats>
          {selectedProject && (
            <>
              <span>1 {type === 'trello' ? 'quadro' : 'projeto'} selecionado</span>
              {type === 'trello' && (
                <>
                  <span className="separator">•</span>
                  <span>{selectedProject.cards} cards para transferir</span>
                </>
              )}
            </>
          )}
        </Stats>
      </ActionBar>
    </Panel>
  );
}; 