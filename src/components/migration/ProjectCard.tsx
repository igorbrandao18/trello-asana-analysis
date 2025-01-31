import styled from 'styled-components';
import { IconChevronDown, IconLayoutList, IconCards, IconUsers, IconCalendar, IconTag } from '@tabler/icons-react';

const Card = styled.div<{ selected?: boolean }>`
  padding: 1.25rem;
  background: ${props => props.selected ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)'};
  border-radius: 8px;
  border: 1px solid ${props => props.selected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)'};
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;

    span {
      font-size: 0.95rem;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    svg {
      width: 16px;
      height: 16px;
      opacity: 0.7;
    }
  }

  .description {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  .meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.375rem;

      svg {
        width: 14px;
        height: 14px;
        opacity: 0.5;
      }
    }
  }

  .lists {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
  }
`;

interface List {
  id: string;
  name: string;
  cards: Array<{
    id: string;
    name: string;
    description?: string;
    due?: string;
    labels?: string[];
    members?: string[];
  }>;
}

interface ProjectCardProps {
  id: string;
  title: string;
  description?: string;
  lists?: List[];
  members: number;
  selected?: boolean;
  icon?: React.ReactNode;
  onSelect: (id: string) => void;
  onListSelect?: (listId: string) => void;
  selectedListId?: string;
  type: 'trello' | 'asana';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  lists = [],
  members,
  selected,
  icon,
  onSelect,
  onListSelect,
  selectedListId,
  type
}) => {
  const filteredLists = lists.filter(list => 
    list.name !== 'Seção sem título' && 
    list.name.toLowerCase() !== 'sem título' && 
    list.name.toLowerCase() !== 'untitled'
  );

  const totalItems = filteredLists.reduce((total, list) => total + list.cards.length, 0);

  return (
    <Card selected={selected} onClick={() => onSelect(id)}>
      <div className="title">
        <span>
          {icon}
          {title}
        </span>
        <IconChevronDown />
      </div>
      {description && (
        <div className="description">{description}</div>
      )}
      <div className="meta">
        <div className="meta-item">
          <IconLayoutList />
          {filteredLists.length} {type === 'trello' ? 'Listas' : 'Seções'}
        </div>
        <div className="meta-item">
          <IconCards />
          {totalItems} {type === 'trello' ? 'Cards' : 'Tasks'}
        </div>
        <div className="meta-item">
          <IconUsers />
          {members} {members === 1 ? 'Membro' : 'Membros'}
        </div>
        <div className="meta-item">
          <IconCalendar />
          Atualizado {new Date().toLocaleDateString()}
        </div>
      </div>
      {selected && filteredLists.length > 0 && (
        <div className="lists">
          {filteredLists.map(list => (
            <ListPreview
              key={list.id}
              list={list}
              selected={selectedListId === list.id}
              onSelect={onListSelect}
              type={type}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

const ListPreviewWrapper = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    
    h4 {
      font-size: 0.85rem;
      font-weight: 500;
      color: #ffffff;
      margin: 0;
    }
    
    span {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.4);
    }
  }
  
  .cards-preview {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const CardPreview = styled.div`
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(4px);
  }

  .card-description {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 0.25rem;
  }

  .card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;

    .meta-tag {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.05);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;

      svg {
        width: 12px;
        height: 12px;
        opacity: 0.7;
      }
    }
  }
`;

interface ListPreviewProps {
  list: List;
  selected?: boolean;
  onSelect?: (listId: string) => void;
  type: 'trello' | 'asana';
}

const ListPreview: React.FC<ListPreviewProps> = ({ list, selected, onSelect, type }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(list.id);
  };

  return (
    <ListPreviewWrapper onClick={handleClick}>
      <div className="list-header">
        <h4>{list.name}</h4>
        <span>{list.cards.length} {type === 'trello' ? 'cards' : 'tasks'}</span>
      </div>
      <div className="cards-preview">
        {list.cards.slice(0, 3).map(card => (
          <CardPreview key={card.id}>
            {card.name}
            {card.description && (
              <div className="card-description">
                {card.description.length > 50 
                  ? card.description.substring(0, 50) + '...' 
                  : card.description}
              </div>
            )}
            {(card.due || (card.labels && card.labels.length > 0) || (card.members && card.members.length > 0)) && (
              <div className="card-meta">
                {card.due && (
                  <span className="meta-tag">
                    <IconCalendar />
                    {new Date(card.due).toLocaleDateString()}
                  </span>
                )}
                {card.labels?.map((label, idx) => (
                  <span key={idx} className="meta-tag">
                    <IconTag />
                    {label}
                  </span>
                ))}
                {card.members && card.members.length > 0 && (
                  <span className="meta-tag">
                    <IconUsers />
                    {card.members.length}
                  </span>
                )}
              </div>
            )}
          </CardPreview>
        ))}
        {list.cards.length > 3 && (
          <div className="more-cards">
            +{list.cards.length - 3} {type === 'trello' ? 'cards' : 'tasks'}
          </div>
        )}
      </div>
    </ListPreviewWrapper>
  );
}; 