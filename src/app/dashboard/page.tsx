'use client';

import { PageWrapper } from '@/components/PageWrapper';
import styled from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IconArrowUpRight, IconArrowDownRight, IconClock, IconChecks } from '@tabler/icons-react';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-6);
`;

const Card = styled.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border: 1px solid var(--border-subtle);
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
  height: 300px;
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

const chartData = [
  { name: 'Jan', trello: 400, asana: 240 },
  { name: 'Fev', trello: 300, asana: 139 },
  { name: 'Mar', trello: 200, asana: 980 },
  { name: 'Abr', trello: 278, asana: 390 },
  { name: 'Mai', trello: 189, asana: 480 },
  { name: 'Jun', trello: 239, asana: 380 },
  { name: 'Jul', trello: 349, asana: 430 },
];

const tasks = [
  {
    id: 1,
    title: 'Migração de Dados',
    description: 'Transferência de cartões do Trello para o Asana',
    status: 'Em Progresso',
    icon: <IconClock />,
  },
  {
    id: 2,
    title: 'Sincronização Completa',
    description: 'Todos os dados foram sincronizados com sucesso',
    status: 'Concluído',
    icon: <IconChecks />,
  },
];

export default function DashboardPage() {
  return (
    <PageWrapper title="Dashboard">
      <Grid>
        <StatCard>
          <StatTitle>Total de Cards</StatTitle>
          <StatValue>2,543</StatValue>
          <StatChange positive>
            <IconArrowUpRight />
            12.5%
          </StatChange>
        </StatCard>

        <StatCard>
          <StatTitle>Cards Migrados</StatTitle>
          <StatValue>1,875</StatValue>
          <StatChange positive>
            <IconArrowUpRight />
            8.2%
          </StatChange>
        </StatCard>

        <StatCard>
          <StatTitle>Taxa de Sucesso</StatTitle>
          <StatValue>94.3%</StatValue>
          <StatChange positive>
            <IconArrowUpRight />
            2.1%
          </StatChange>
        </StatCard>

        <StatCard>
          <StatTitle>Erros</StatTitle>
          <StatValue>23</StatValue>
          <StatChange>
            <IconArrowDownRight />
            5.4%
          </StatChange>
        </StatCard>

        <ChartCard>
          <h2 style={{ marginBottom: 'var(--space-4)', fontSize: '1.125rem', fontWeight: 500 }}>
            Atividade de Migração
          </h2>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={chartData}>
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
        </ChartCard>

        <ChartCard>
          <h2 style={{ marginBottom: 'var(--space-4)', fontSize: '1.125rem', fontWeight: 500 }}>
            Status da Migração
          </h2>
          <TaskList>
            {tasks.map(task => (
              <TaskItem key={task.id}>
                <div className="task-icon">
                  {task.icon}
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
        </ChartCard>
      </Grid>
    </PageWrapper>
  );
} 