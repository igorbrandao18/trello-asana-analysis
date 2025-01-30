'use client';

import { PageWrapper } from '@/components/PageWrapper';
import styled from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IconArrowUpRight, IconArrowDownRight, IconClock, IconChecks, IconAlertTriangle, IconLoader2, IconArrowRight } from '@tabler/icons-react';
import { useDashboard } from '@/hooks/useDashboard';
import { migrateFromTrelloToAsana } from '@/services/api';
import { useState } from 'react';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
  margin-bottom: var(--space-4);
  width: 100%;
`;

const Card = styled.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  border: 1px solid var(--border-subtle);
  position: relative;
  height: 100%;
`;

const StatCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;

const StatTitle = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const StatChange = styled.div<{ positive?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.875rem;
  color: ${props => props.positive ? 'var(--status-success)' : 'var(--status-error)'};

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ChartCard = styled(Card)`
  grid-column: span 2;
  min-height: 350px;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--bg-surface-hover);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);

  .task-icon {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--bg-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--brand-primary);
  }

  .task-info {
    flex: 1;

    h3 {
      font-weight: 500;
      margin-bottom: var(--space-1);
    }

    p {
      color: var(--text-secondary);
      font-size: 0.875rem;
    }
  }

  .task-status {
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 500;
    background: var(--bg-accent);
    color: var(--brand-primary);
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  border-radius: var(--radius-lg);

  svg {
    width: 24px;
    height: 24px;
    color: var(--text-primary);
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  padding: var(--space-4);
  background: var(--bg-surface);
  border: 1px solid var(--status-error);
  border-radius: var(--radius-md);
  color: var(--status-error);
  margin-bottom: var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-2);

  svg {
    width: 20px;
    height: 20px;
  }
`;

const MigrationButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--brand-primary);
  color: white;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all var(--transition-fast);
  margin-bottom: var(--space-4);

  &:hover {
    background: var(--brand-primary-hover);
  }

  &:disabled {
    background: var(--bg-surface);
    color: var(--text-secondary);
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export default function DashboardPage() {
  const { data, error, isLoading, refresh } = useDashboard();
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationError, setMigrationError] = useState<string | null>(null);

  const handleMigration = async () => {
    try {
      setIsMigrating(true);
      setMigrationError(null);
      
      await migrateFromTrelloToAsana();
      
      // Atualiza os dados do dashboard após a migração
      await refresh();
    } catch (err) {
      setMigrationError('Erro ao realizar a migração. Por favor, tente novamente.');
      console.error('Erro na migração:', err);
    } finally {
      setIsMigrating(false);
    }
  };

  if (error) {
    return (
      <PageWrapper title="Dashboard">
        <ErrorMessage>
          <IconAlertTriangle />
          Erro ao carregar os dados do dashboard. Por favor, tente novamente mais tarde.
        </ErrorMessage>
      </PageWrapper>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Em Progresso':
        return <IconClock />;
      case 'Concluído':
        return <IconChecks />;
      default:
        return <IconAlertTriangle />;
    }
  };

  return (
    <PageWrapper title="Dashboard">
      {migrationError && (
        <ErrorMessage>
          <IconAlertTriangle />
          {migrationError}
        </ErrorMessage>
      )}

      <MigrationButton 
        onClick={handleMigration} 
        disabled={isMigrating || isLoading}
      >
        {isMigrating ? (
          <>
            <IconLoader2 />
            Migrando dados...
          </>
        ) : (
          <>
            <IconArrowRight />
            Iniciar Migração
          </>
        )}
      </MigrationButton>

      <Grid>
        <StatCard>
          <StatTitle>Total de Cards</StatTitle>
          <StatValue>{data?.stats.totalCards.toLocaleString() ?? '---'}</StatValue>
          {data?.stats.changes && (
            <StatChange positive={data.stats.changes.totalCards > 0}>
              {data.stats.changes.totalCards > 0 ? <IconArrowUpRight /> : <IconArrowDownRight />}
              {Math.abs(data.stats.changes.totalCards)}%
            </StatChange>
          )}
          {isLoading && (
            <LoadingOverlay>
              <IconLoader2 />
            </LoadingOverlay>
          )}
        </StatCard>

        <StatCard>
          <StatTitle>Cards Migrados</StatTitle>
          <StatValue>{data?.stats.migratedCards.toLocaleString() ?? '---'}</StatValue>
          {data?.stats.changes && (
            <StatChange positive={data.stats.changes.migratedCards > 0}>
              {data.stats.changes.migratedCards > 0 ? <IconArrowUpRight /> : <IconArrowDownRight />}
              {Math.abs(data.stats.changes.migratedCards)}%
            </StatChange>
          )}
          {isLoading && (
            <LoadingOverlay>
              <IconLoader2 />
            </LoadingOverlay>
          )}
        </StatCard>

        <StatCard>
          <StatTitle>Taxa de Sucesso</StatTitle>
          <StatValue>{data?.stats.successRate.toFixed(1)}% ?? '---'</StatValue>
          {data?.stats.changes && (
            <StatChange positive={data.stats.changes.successRate > 0}>
              {data.stats.changes.successRate > 0 ? <IconArrowUpRight /> : <IconArrowDownRight />}
              {Math.abs(data.stats.changes.successRate)}%
            </StatChange>
          )}
          {isLoading && (
            <LoadingOverlay>
              <IconLoader2 />
            </LoadingOverlay>
          )}
        </StatCard>

        <StatCard>
          <StatTitle>Erros</StatTitle>
          <StatValue>{data?.stats.errors ?? '---'}</StatValue>
          {data?.stats.changes && (
            <StatChange positive={data.stats.changes.errors < 0}>
              {data.stats.changes.errors < 0 ? <IconArrowUpRight /> : <IconArrowDownRight />}
              {Math.abs(data.stats.changes.errors)}%
            </StatChange>
          )}
          {isLoading && (
            <LoadingOverlay>
              <IconLoader2 />
            </LoadingOverlay>
          )}
        </StatCard>

        <ChartCard>
          <h2 style={{ marginBottom: 'var(--space-4)', fontSize: '1.125rem', fontWeight: 500 }}>
            Atividade de Migração
          </h2>
          {data?.activity && (
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={data.activity}>
                <defs>
                  <linearGradient id="trelloFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="asanaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand-secondary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="trello"
                  stroke="var(--brand-primary)"
                  fillOpacity={1}
                  fill="url(#trelloFill)"
                />
                <Area
                  type="monotone"
                  dataKey="asana"
                  stroke="var(--brand-secondary)"
                  fillOpacity={1}
                  fill="url(#asanaFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
          {isLoading && (
            <LoadingOverlay>
              <IconLoader2 />
            </LoadingOverlay>
          )}
        </ChartCard>

        <ChartCard>
          <h2 style={{ marginBottom: 'var(--space-4)', fontSize: '1.125rem', fontWeight: 500 }}>
            Status da Migração
          </h2>
          <TaskList>
            {data?.tasks.map(task => (
              <TaskItem key={task.id}>
                <div className="task-icon">
                  {getStatusIcon(task.status)}
                </div>
                <div className="task-info">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <div className="task-status">
                  {task.status}
                </div>
              </TaskItem>
            ))}
          </TaskList>
          {isLoading && (
            <LoadingOverlay>
              <IconLoader2 />
            </LoadingOverlay>
          )}
        </ChartCard>
      </Grid>
    </PageWrapper>
  );
} 