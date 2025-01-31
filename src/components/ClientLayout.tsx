'use client';

import { ReactNode, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyles } from '@/styles/global';
import { IconHome, IconBriefcase, IconList, IconSettings, IconBrandTrello, IconBrandAsana, IconBell, IconUser, IconArrowsExchange, IconTrash, IconRefresh, IconDatabaseImport } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { trelloApi, asanaApi } from '@/services/api';
import { migrationScripts } from '@/scripts/migration-data';
import { ProgressModal } from './ProgressModal';
import { ConfirmModal } from './ConfirmModal';

interface ClientLayoutProps {
  children: ReactNode;
}

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--bg-base);
`;

const Sidebar = styled.aside`
  width: var(--sidebar-width);
  background: var(--bg-surface);
  border-right: 1px solid var(--border-subtle);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: var(--space-4) 0;
`;

const TopSection = styled.div`
  flex-shrink: 0;
`;

const NavSection = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: var(--space-2) 0;

  /* Esconde a scrollbar mas mantém a funcionalidade */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BottomSection = styled.div`
  padding: 0 var(--space-4) var(--space-2);
`;

const Logo = styled.div`
  padding: 0 var(--space-4);
  margin-bottom: var(--space-4);
  font-size: 1.25rem;
  font-weight: 700;
  
  span {
    background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ConnectionPanel = styled.div`
  margin: 0 var(--space-4) var(--space-4);
  padding: var(--space-4);
  background: var(--bg-surface-hover);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  justify-content: center;
`;

const ConnectionStatus = styled.div<{ isConnected: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  position: relative;

  svg {
    width: 24px;
    height: 24px;
    color: ${props => props.isConnected ? 'var(--text-accent)' : 'var(--text-secondary)'};
    opacity: ${props => props.isConnected ? 1 : 0.5};
    transition: all 0.3s ease;
  }

  .status {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
    background: ${props => props.isConnected ? 'var(--status-success)' : 'var(--status-error)'};
    transition: all 0.3s ease;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      border-radius: var(--radius-full);
      background: ${props => props.isConnected ? 'var(--status-success)' : 'var(--status-error)'};
      opacity: 0.2;
      animation: ${props => props.isConnected ? 'pulse 2s infinite' : 'none'};
    }
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.2; }
    50% { transform: scale(2.5); opacity: 0; }
    100% { transform: scale(1); opacity: 0.2; }
  }
`;

const Nav = styled.nav`
  padding: 0 var(--space-4);
`;

const NavItem = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  color: ${props => props.active ? 'var(--text-primary)' : 'var(--text-secondary)'};
  background: ${props => props.active ? 'var(--bg-accent)' : 'transparent'};
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  margin-bottom: var(--space-1);
  font-size: 0.875rem;
  font-weight: 500;

  svg {
    width: 18px;
    height: 18px;
    opacity: ${props => props.active ? 1 : 0.7};
  }

  &:hover {
    background: var(--bg-surface-hover);
    color: var(--text-primary);
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--bg-surface-hover);
    color: var(--text-primary);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const UserProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border-subtle);
  margin: var(--space-2) var(--space-4);
  opacity: 0.5;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-2) var(--space-3);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  font-size: 0.75rem;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-1);

  &:last-child {
    margin-bottom: 0;
  }

  &:hover:not(:disabled) {
    background: var(--bg-surface-hover);
    color: var(--text-primary);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 14px;
    height: 14px;
  }

  &.danger {
    color: var(--status-error);
    
    &:hover:not(:disabled) {
      background: var(--status-error-hover);
    }
  }
`;

const menuItems = [
  {
    icon: <IconArrowsExchange />,
    label: 'Migração',
    href: '/migracao',
  },
  {
    icon: <IconSettings />,
    label: 'Configurações',
    href: '/configuracoes',
  },
];

export function ClientLayout({ children }: ClientLayoutProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [showConfirm, setShowConfirm] = useState(false);
  const [trelloConnected, setTrelloConnected] = useState(false);
  const [asanaConnected, setAsanaConnected] = useState(false);

  const checkConnections = async () => {
    try {
      const trelloResponse = await trelloApi.get('/members/me', { timeout: 5000 });
      setTrelloConnected(true);
    } catch (error) {
      setTrelloConnected(false);
    }

    try {
      const asanaResponse = await asanaApi.get('/users/me', { timeout: 5000 });
      setAsanaConnected(true);
    } catch (error) {
      setAsanaConnected(false);
    }
  };

  useEffect(() => {
    // Verifica conexão imediatamente ao montar
    checkConnections();

    // Configura verificação periódica a cada 30 segundos
    const interval = setInterval(checkConnections, 30000);

    // Limpa o intervalo ao desmontar
    return () => clearInterval(interval);
  }, []);

  const handleTrelloClick = async () => {
    try {
      // Busca boards e cards do Trello
      const [boards, cards] = await Promise.all([
        trelloApi.get('/members/me/boards', {
          params: {
            fields: 'id,name,lists',
          },
        }),
        trelloApi.get('/members/me/cards', {
          params: {
            fields: 'id,name,desc,idList',
          },
        }),
      ]);

      console.log('Dados do Trello:', { boards: boards.data, cards: cards.data });
      router.push('/trello');
    } catch (error) {
      console.error('Erro ao buscar dados do Trello:', error);
    }
  };

  const handleAsanaClick = async () => {
    try {
      // Busca workspace e projetos do Asana
      const user = await asanaApi.get('/users/me');
      const workspaceId = user.data.data.workspaces[0].gid;
      
      const projects = await asanaApi.get(`/workspaces/${workspaceId}/projects`);
      
      console.log('Dados do Asana:', { 
        workspace: user.data.data.workspaces[0],
        projects: projects.data.data 
      });
      
      router.push('/asana');
    } catch (error) {
      console.error('Erro ao buscar dados do Asana:', error);
    }
  };

  const handleCleanup = async () => {
    setShowConfirm(true);
  };

  const handleConfirmCleanup = async () => {
    setShowConfirm(false);
    setIsLoading(true);
    setProgress(0);
    setStatus('processing');
    
    try {
      // Limpando dados
      setCurrentTask('Removendo boards do Trello...');
      const trelloBoards = await trelloApi.get('/members/me/boards');
      const totalBoards = trelloBoards.data.length;
      
      for (let i = 0; i < totalBoards; i++) {
        await trelloApi.delete(`/boards/${trelloBoards.data[i].id}`);
        setProgress(Math.round((i + 1) / (totalBoards + 5) * 50));
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setCurrentTask('Removendo projetos do Asana...');
      const user = await asanaApi.get('/users/me');
      const workspaceId = user.data.data.workspaces[0].gid;
      const asanaProjects = await asanaApi.get(`/workspaces/${workspaceId}/projects`);
      const totalProjects = asanaProjects.data.data.length;

      for (let i = 0; i < totalProjects; i++) {
        await asanaApi.delete(`/projects/${asanaProjects.data.data[i].gid}`);
        setProgress(50 + Math.round((i + 1) / (totalProjects + 5) * 50));
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      // Limpa a sessão de migração
      setCurrentTask('Limpando sessão de migração...');
      localStorage.removeItem('migrationSession');
      localStorage.removeItem('selectedBoards');
      localStorage.removeItem('selectedProjects');
      sessionStorage.clear();
      
      setProgress(100);
      setCurrentTask('Todos os dados foram removidos com sucesso!');
      setStatus('success');
      
      // Delay para mostrar sucesso
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Força um refresh completo da página
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      setCurrentTask('Erro ao limpar dados. Tente novamente.');
      setStatus('error');
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setIsLoading(false);
      setProgress(0);
      setCurrentTask('');
      setStatus('processing');
    }
  };

  const handlePopulate = async () => {
    setIsLoading(true);
    setProgress(0);
    setStatus('processing');
    
    try {
      // Trello Setup
      setCurrentTask('Configurando board do Sistema de Delivery...');
      setProgress(5);
      await new Promise(resolve => setTimeout(resolve, 800));

      setCurrentTask('Criando listas de acompanhamento de pedidos...');
      setProgress(15);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCurrentTask('Configurando etiquetas e categorias...');
      setProgress(25);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Restaurantes e Pedidos
      setCurrentTask('Cadastrando restaurante Sabor Oriental Sushi...');
      setProgress(35);
      await new Promise(resolve => setTimeout(resolve, 800));

      setCurrentTask('Cadastrando restaurante La Pasta Autêntica...');
      setProgress(45);
      await new Promise(resolve => setTimeout(resolve, 800));

      setCurrentTask('Cadastrando restaurante Burger House Premium...');
      setProgress(55);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Asana Setup
      setCurrentTask('Configurando projeto de Gestão de Delivery...');
      setProgress(65);
      await new Promise(resolve => setTimeout(resolve, 800));

      setCurrentTask('Criando seções de acompanhamento...');
      setProgress(75);
      await new Promise(resolve => setTimeout(resolve, 800));

      setCurrentTask('Registrando métricas e metas...');
      setProgress(85);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      await migrationScripts.populate();
      
      setCurrentTask('Finalizando configurações e validando dados...');
      setProgress(95);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProgress(100);
      setCurrentTask('Sistema de Delivery configurado com sucesso! 🎉');
      setStatus('success');
      
      // Delay para mostrar sucesso
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Erro ao criar dados:', error);
      setCurrentTask('Erro ao configurar o sistema. Por favor, tente novamente.');
      setStatus('error');
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setIsLoading(false);
      setProgress(0);
      setCurrentTask('');
      setStatus('processing');
    }
  };

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Sidebar>
            <SidebarContent>
              <TopSection>
                <Logo>
                  <span>SysMiddle</span>
                </Logo>
                
                <ConnectionPanel>
                  <ConnectionStatus isConnected={trelloConnected}>
                    <IconBrandTrello />
                    <div className="status" />
                  </ConnectionStatus>
                  <ConnectionStatus isConnected={asanaConnected}>
                    <IconBrandAsana />
                    <div className="status" />
                  </ConnectionStatus>
                </ConnectionPanel>
              </TopSection>

              <NavSection>
                <Nav>
                  {menuItems.map((item, index) => (
                    <NavItem key={index} href={item.href}>
                      {item.icon}
                      {item.label}
                    </NavItem>
                  ))}
                </Nav>
              </NavSection>

              <BottomSection>
                <Divider />
                <div style={{ padding: '0 var(--space-4)' }}>
                  <ActionButton 
                    onClick={handlePopulate}
                    disabled={isLoading}
                  >
                    <IconDatabaseImport />
                    Criar Dados de Exemplo
                  </ActionButton>

                  <ActionButton 
                    onClick={handleCleanup}
                    disabled={isLoading}
                    className="danger"
                  >
                    <IconTrash />
                    Limpar Todos os Dados
                  </ActionButton>
                </div>
              </BottomSection>
            </SidebarContent>
          </Sidebar>

          {children}

          <ProgressModal 
            isOpen={isLoading}
            currentTask={currentTask}
            progress={progress}
            status={status}
          />

          <ConfirmModal
            isOpen={showConfirm}
            title="Limpar Todos os Dados"
            message="Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita."
            onConfirm={handleConfirmCleanup}
            onCancel={() => setShowConfirm(false)}
          />
        </Layout>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}