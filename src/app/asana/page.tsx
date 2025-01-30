'use client';

import { PageWrapper } from '@/components/PageWrapper';
import styled from 'styled-components';
import { IconLoader2, IconAlertTriangle, IconLayoutKanban } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { asanaApi } from '@/services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
`;

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-4);
`;

const Project = styled.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  padding: var(--space-4);
`;

const ProjectHeader = styled.div`
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
    color: var(--brand-secondary);
  }

  h2 {
    font-size: 1.125rem;
    font-weight: 500;
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const Task = styled.div`
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

interface Project {
  gid: string;
  name: string;
  tasks?: any[];
}

export default function AsanaPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAsanaData() {
      try {
        setLoading(true);
        setError(null);

        // Busca o workspace
        const userResponse = await asanaApi.get('/users/me');
        const workspaceId = userResponse.data.data.workspaces[0].gid;

        // Busca projetos do workspace
        const projectsResponse = await asanaApi.get(`/workspaces/${workspaceId}/projects`);
        
        // Para cada projeto, busca suas tasks
        const projectsWithTasks = await Promise.all(
          projectsResponse.data.data.map(async (project: Project) => {
            const tasksResponse = await asanaApi.get(`/projects/${project.gid}/tasks`);
            return {
              ...project,
              tasks: tasksResponse.data.data,
            };
          })
        );

        setProjects(projectsWithTasks);
      } catch (err) {
        setError('Erro ao carregar dados do Asana. Por favor, tente novamente.');
        console.error('Erro ao carregar dados do Asana:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAsanaData();
  }, []);

  if (error) {
    return (
      <PageWrapper title="Asana">
        <ErrorMessage>
          <IconAlertTriangle />
          {error}
        </ErrorMessage>
      </PageWrapper>
    );
  }

  if (loading) {
    return (
      <PageWrapper title="Asana">
        <LoadingOverlay>
          <IconLoader2 />
        </LoadingOverlay>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Asana">
      <Container>
        <ProjectList>
          {projects.map(project => (
            <Project key={project.gid}>
              <ProjectHeader>
                <div className="icon">
                  <IconLayoutKanban />
                </div>
                <h2>{project.name}</h2>
              </ProjectHeader>
              <TaskList>
                {project.tasks?.map(task => (
                  <Task key={task.gid}>
                    <h3>{task.name}</h3>
                    {task.notes && <p>{task.notes}</p>}
                  </Task>
                ))}
              </TaskList>
            </Project>
          ))}
        </ProjectList>
      </Container>
    </PageWrapper>
  );
} 