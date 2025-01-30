'use client';

import { PageWrapper } from '@/components/PageWrapper';
import styled from 'styled-components';
import { IconLoader2, IconAlertTriangle, IconBrandTrello } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { trelloApi } from '@/services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
`;

const BoardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-4);
`;

const Board = styled.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  padding: var(--space-4);
`;

const BoardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-subtle);

  .icon {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--bg-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--brand-primary);
  }

  h2 {
    font-size: 1.125rem;
    font-weight: 500;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const Card = styled.div`
  background: var(--bg-surface-hover);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  border: 1px solid var(--border-subtle);

  h3 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: var(--space-2);
  }

  p {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
`;

const LoadingOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);

  svg {
    width: 32px;
    height: 32px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  padding: var(--space-4);
  background: var(--bg-surface);
  border: 1px solid var(--status-error);
  border-radius: var(--radius-md);
  color: var(--status-error);
  display: flex;
  align-items: center;
  gap: var(--space-2);

  svg {
    width: 20px;
    height: 20px;
  }
`;

interface Board {
  id: string;
  name: string;
  lists: any[];
  cards?: any[];
}

export default function TrelloPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrelloData() {
      try {
        setLoading(true);
        setError(null);

        // Busca todos os boards
        const boardsResponse = await trelloApi.get('/members/me/boards', {
          params: {
            fields: 'id,name,lists',
          },
        });

        // Para cada board, busca seus cards
        const boardsWithCards = await Promise.all(
          boardsResponse.data.map(async (board: Board) => {
            const cardsResponse = await trelloApi.get(`/boards/${board.id}/cards`, {
              params: {
                fields: 'id,name,desc',
              },
            });
            return {
              ...board,
              cards: cardsResponse.data,
            };
          })
        );

        setBoards(boardsWithCards);
      } catch (err) {
        setError('Erro ao carregar dados do Trello. Por favor, tente novamente.');
        console.error('Erro ao carregar dados do Trello:', err);
      } finally {
        setLoading(false);
      }
    }

    loadTrelloData();
  }, []);

  if (error) {
    return (
      <PageWrapper title="Trello">
        <ErrorMessage>
          <IconAlertTriangle />
          {error}
        </ErrorMessage>
      </PageWrapper>
    );
  }

  if (loading) {
    return (
      <PageWrapper title="Trello">
        <LoadingOverlay>
          <IconLoader2 />
        </LoadingOverlay>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Trello">
      <Container>
        <BoardList>
          {boards.map(board => (
            <Board key={board.id}>
              <BoardHeader>
                <div className="icon">
                  <IconBrandTrello />
                </div>
                <h2>{board.name}</h2>
              </BoardHeader>
              <CardList>
                {board.cards?.map(card => (
                  <Card key={card.id}>
                    <h3>{card.name}</h3>
                    {card.desc && <p>{card.desc}</p>}
                  </Card>
                ))}
              </CardList>
            </Board>
          ))}
        </BoardList>
      </Container>
    </PageWrapper>
  );
} 