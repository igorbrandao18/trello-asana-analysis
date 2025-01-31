'use client';

import styled from 'styled-components';
import { 
  IconBrandTrello,
  IconBrandAsana,
  IconArrowsExchange,
  IconTrendingUp,
  IconAlertTriangle,
  IconCheck,
  IconX,
  IconClock,
  IconRefresh,
  IconTag
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { trelloApi, asanaApi } from '@/services/api';

const DashboardContainer = styled.div`
  padding: var(--space-6);
  margin-left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin-bottom: var(--space-6);

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-2);
  }

  p {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-8);
  padding: var(--space-4);
`;

const Card = styled.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  transition: all 0.2s ease;
  min-height: 160px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .icon {
    width: 40px;
    height: 40px;
    padding: var(--space-2);
    border-radius: var(--radius-md);
    background: var(--bg-surface-hover);
    color: var(--brand-primary);
  }
`;

const Value = styled.div<{ trend?: 'up' | 'down' }>`
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  margin-top: auto;

  small {
    font-size: 0.875rem;
    color: ${props => props.trend === 'up' ? 'var(--status-success)' : 'var(--status-error)'};
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }
`;

const Section = styled.div`
  margin-bottom: var(--space-8);
  flex: 1;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-6);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: 0 var(--space-4);

    svg {
      width: 24px;
      height: 24px;
      color: var(--brand-primary);
    }
  }
`;

const Table = styled.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr auto auto;
  padding: var(--space-4) var(--space-6);
  background: var(--bg-surface-hover);
  border-bottom: 1px solid var(--border-subtle);
  gap: var(--space-6);

  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const TableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 400px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr auto auto;
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
  align-items: center;
  gap: var(--space-6);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--bg-surface-hover);
  }

  span {
    font-size: 0.875rem;
  }
`;

const Tag = styled.span<{ variant: 'success' | 'warning' | 'error' | 'info' }>`
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => {
    switch (props.variant) {
      case 'success': return 'var(--status-success-hover)';
      case 'warning': return 'var(--status-warning-hover)';
      case 'error': return 'var(--status-error-hover)';
      case 'info': return 'var(--brand-primary-hover)';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'success': return 'var(--status-success)';
      case 'warning': return 'var(--status-warning)';
      case 'error': return 'var(--status-error)';
      case 'info': return 'var(--brand-primary)';
    }
  }};
`;

const PlatformIcon = styled.div<{ platform: 'trello' | 'asana' }>`
  width: 28px;
  height: 28px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.platform === 'trello' ? '#0079BF20' : '#F0644720'};
  color: ${props => props.platform === 'trello' ? '#0079BF' : '#F06447'};

  svg {
    width: 18px;
    height: 18px;
  }
`;

const TagList = styled.div`
  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;
`;

const SmallTag = styled.span`
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-size: 0.6875rem;
  background: var(--bg-surface-hover);
  color: var(--text-secondary);
  white-space: nowrap;
`;

export function Dashboard() {
  const [stats, setStats] = useState({
    totalBoards: 0,
    totalProjects: 0,
    syncedItems: 0,
    errorRate: 0
  });

  const [recentMigrations, setRecentMigrations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Buscar dados do Trello
        const trelloBoards = await trelloApi.get('/members/me/boards');
        const trelloCards = await trelloApi.get('/members/me/cards');
        
        // Buscar dados do Asana
        const user = await asanaApi.get('/users/me');
        const workspaceId = user.data.data.workspaces[0].gid;
        const asanaProjects = await asanaApi.get(`/workspaces/${workspaceId}/projects`);
        const asanaTasks = await asanaApi.get(`/workspaces/${workspaceId}/tasks`);

        // Calcular estatísticas
        setStats({
          totalBoards: trelloBoards.data.length,
          totalProjects: asanaProjects.data.data.length,
          syncedItems: Math.min(trelloCards.data.length, asanaTasks.data.data.length),
          errorRate: Math.random() * 2 // Simulado
        });

        // Simular migrações recentes
        setRecentMigrations([
          {
            id: 1,
            source: 'trello',
            sourceName: 'Sprint Planning',
            target: 'asana',
            targetName: 'Q4 Planning',
            status: 'success',
            items: ['tasks', 'attachments', 'comments'],
            time: '2 min atrás'
          },
          {
            id: 2,
            source: 'asana',
            sourceName: 'Marketing Campaign',
            target: 'trello',
            targetName: 'Q4 Marketing',
            status: 'syncing',
            items: ['tasks', 'labels', 'due-dates'],
            time: '5 min atrás'
          },
          {
            id: 3,
            source: 'trello',
            sourceName: 'Product Roadmap',
            target: 'asana',
            targetName: 'Product Strategy',
            status: 'error',
            items: ['tasks', 'members'],
            time: '15 min atrás'
          },
          {
            id: 4,
            source: 'trello',
            sourceName: 'Bug Tracking',
            target: 'asana',
            targetName: 'Issue Tracking',
            status: 'success',
            items: ['tasks', 'labels', 'members'],
            time: '30 min atrás'
          }
        ]);

      } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <DashboardContainer>
      <Header>
        <h1>Dashboard de Integração</h1>
        <p>Monitoramento da sincronização entre Trello e Asana</p>
      </Header>

      <Grid>
        <Card>
          <CardHeader>
            <h3>Boards Trello</h3>
            <IconBrandTrello className="icon" />
          </CardHeader>
          <Value trend="up">
            {stats.totalBoards}
            <small>
              <IconTrendingUp size={14} />
              +2
            </small>
          </Value>
        </Card>

        <Card>
          <CardHeader>
            <h3>Projetos Asana</h3>
            <IconBrandAsana className="icon" />
          </CardHeader>
          <Value trend="up">
            {stats.totalProjects}
            <small>
              <IconTrendingUp size={14} />
              +3
            </small>
          </Value>
        </Card>

        <Card>
          <CardHeader>
            <h3>Items Sincronizados</h3>
            <IconArrowsExchange className="icon" />
          </CardHeader>
          <Value trend="up">
            {stats.syncedItems}
            <small>
              <IconTrendingUp size={14} />
              +15
            </small>
          </Value>
        </Card>

        <Card>
          <CardHeader>
            <h3>Taxa de Erro</h3>
            <IconAlertTriangle className="icon" />
          </CardHeader>
          <Value trend="down">
            {stats.errorRate.toFixed(1)}%
            <small>
              <IconTrendingUp size={14} />
              -0.5%
            </small>
          </Value>
        </Card>
      </Grid>

      <Section>
        <h2>
          <IconRefresh />
          Migrações Recentes
        </h2>
        <Table>
          <TableHeader>
            <span>Origem</span>
            <span>Board/Projeto</span>
            <span>Destino</span>
            <span>Status</span>
            <span>Detalhes</span>
          </TableHeader>
          <TableContent>
            {recentMigrations.map(migration => (
              <TableRow key={migration.id}>
                <PlatformIcon platform={migration.source as 'trello' | 'asana'}>
                  {migration.source === 'trello' ? <IconBrandTrello /> : <IconBrandAsana />}
                </PlatformIcon>
                <span>{migration.sourceName}</span>
                <span>{migration.targetName}</span>
                <Tag
                  variant={
                    migration.status === 'success' ? 'success' :
                    migration.status === 'syncing' ? 'info' :
                    'error'
                  }
                >
                  {migration.status === 'success' ? <><IconCheck size={14} /> Concluído</> :
                   migration.status === 'syncing' ? <><IconClock size={14} /> Sincronizando</> :
                   <><IconX size={14} /> Erro</>}
                </Tag>
                <TagList>
                  {migration.items.map(item => (
                    <SmallTag key={item}>
                      <IconTag size={12} style={{ marginRight: 4 }} />
                      {item}
                    </SmallTag>
                  ))}
                </TagList>
              </TableRow>
            ))}
          </TableContent>
        </Table>
      </Section>
    </DashboardContainer>
  );
} 