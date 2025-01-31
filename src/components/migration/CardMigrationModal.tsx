import styled from 'styled-components';
import { Project } from '@/types/project';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
  transform: scale(0.95);
  opacity: 0;
  animation: modalEnter 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @keyframes modalEnter {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  h3 {
    margin: 0 0 var(--space-4);
    font-size: 1.4rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: var(--space-2);

    &::before {
      content: '';
      width: 4px;
      height: 24px;
      background: var(--primary);
      border-radius: var(--radius-sm);
    }
  }

  .description {
    margin-bottom: var(--space-4);
    color: var(--text-secondary);
    font-size: 0.95rem;
    
    strong {
      color: var(--text-primary);
      font-size: 1.1rem;
      display: block;
      margin-bottom: var(--space-2);
    }
  }
`;

const ProjectItem = styled.div<{ selected?: boolean }>`
  padding: var(--space-3);
  margin: var(--space-2) 0;
  border-radius: var(--radius-lg);
  background: ${props => props.selected ? 'var(--primary-soft)' : 'var(--bg-surface)'};
  border: 2px solid ${props => props.selected ? 'var(--primary)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.selected 
    ? '0 8px 16px rgba(var(--primary-rgb), 0.15)' 
    : '0 2px 4px rgba(0, 0, 0, 0.05)'};

  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 12px 24px rgba(var(--primary-rgb), 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${props => props.selected ? 'var(--primary)' : 'transparent'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  h5 {
    margin: 0;
    font-size: ${props => props.selected ? '1.1rem' : '1rem'};
    color: ${props => props.selected ? 'var(--primary)' : 'var(--text-primary)'};
    font-weight: ${props => props.selected ? '600' : '400'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding-right: var(--space-8);
  }
`;

const SectionItem = styled.div<{ selected?: boolean }>`
  padding: var(--space-2) var(--space-3);
  margin: var(--space-1) 0;
  margin-left: var(--space-4);
  border-radius: var(--radius-lg);
  background: ${props => props.selected ? 'var(--primary-soft)' : 'var(--bg-surface)'};
  border: 2px solid ${props => props.selected ? 'var(--primary)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  box-shadow: ${props => props.selected 
    ? '0 4px 12px rgba(var(--primary-rgb), 0.15)' 
    : '0 1px 3px rgba(0, 0, 0, 0.05)'};

  &:hover {
    border-color: var(--primary);
    transform: translateX(8px);
    box-shadow: 0 6px 16px rgba(var(--primary-rgb), 0.2);
  }

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.selected ? 'var(--primary)' : 'var(--border-color)'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(${props => props.selected ? '1' : '0.8'});
    box-shadow: ${props => props.selected 
      ? '0 0 0 4px rgba(var(--primary-rgb), 0.2)' 
      : 'none'};
  }

  &::after {
    content: '';
    position: absolute;
    left: -24px;
    top: 50%;
    width: 16px;
    height: 2px;
    background: ${props => props.selected ? 'var(--primary)' : 'var(--border-color)'};
    transform: scaleX(${props => props.selected ? '1' : '0'});
    transform-origin: left;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  color: ${props => props.selected ? 'var(--primary)' : 'var(--text-primary)'};
  font-weight: ${props => props.selected ? '600' : '400'};
  font-size: ${props => props.selected ? '0.95rem' : '0.9rem'};
`;

const Actions = styled.div`
  display: flex;
  gap: var(--space-2);
  justify-content: flex-end;
  margin-top: var(--space-6);

  button {
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-lg);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &.cancel {
      background: transparent;
      color: var(--text-secondary);
      border: 2px solid var(--border-color);

      &:hover {
        background: var(--bg-surface-hover);
        color: var(--text-primary);
        border-color: var(--text-primary);
      }
    }

    &.confirm {
      background: var(--primary);
      color: white;
      border: none;
      padding: var(--space-2) var(--space-6);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        transform: translate(-50%, -50%) scale(0);
        border-radius: 50%;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      &:hover:not(:disabled) {
        background: var(--primary-dark);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);

        &::before {
          transform: translate(-50%, -50%) scale(2.5);
        }
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
`;

interface Section {
  id: string;
  name: string;
}

interface CardMigrationModalProps {
  card: {
    id: string;
    boardId: string;
    name: string;
    description: string;
  } | null;
  asanaProjects: Project[];
  selectedProjectId?: string;
  selectedSectionId?: string;
  onProjectSelect: (projectId: string) => void;
  onSectionSelect: (sectionId: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export const CardMigrationModal: React.FC<CardMigrationModalProps> = ({
  card,
  asanaProjects,
  selectedProjectId,
  selectedSectionId,
  onProjectSelect,
  onSectionSelect,
  onClose,
  onConfirm
}) => {
  if (!card) return null;

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h3>Transferir Card</h3>
        <div className="description">
          <strong>{card.name}</strong>
          <p>{card.description}</p>
        </div>
        
        <div className="select-project">
          <h4>Selecione o destino no Asana:</h4>
          <div className="projects-list">
            {asanaProjects.map(project => (
              <div key={project.id}>
                <ProjectItem
                  selected={selectedProjectId === project.id}
                  onClick={() => {
                    onProjectSelect(project.id);
                    onSectionSelect('');
                  }}
                >
                  <h5>{project.title}</h5>
                </ProjectItem>
                
                {selectedProjectId === project.id && project.lists && (
                  <div className="sections-wrapper">
                    <div className="sections-header">
                      Selecione a seção:
                    </div>
                    {project.lists.map((section: Section) => (
                      <SectionItem
                        key={section.id}
                        selected={selectedSectionId === section.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSectionSelect(section.id);
                        }}
                      >
                        {section.name}
                      </SectionItem>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Actions>
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="confirm"
            onClick={onConfirm}
            disabled={!selectedProjectId || !selectedSectionId}
          >
            {!selectedProjectId 
              ? 'Selecione um projeto'
              : !selectedSectionId 
                ? 'Selecione uma seção'
                : 'Transferir'}
          </button>
        </Actions>
      </ModalContent>
    </Modal>
  );
}; 