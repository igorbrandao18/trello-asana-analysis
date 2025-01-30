'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyles } from '@/styles/global';
import { IconHome, IconBriefcase, IconList, IconSettings, IconBrandTrello, IconBrandAsana, IconBell, IconUser } from '@tabler/icons-react';

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
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: var(--space-6) 0;
`;

const MainWrapper = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
`;

const Logo = styled.div`
  padding: 0 var(--space-6);
  margin-bottom: var(--space-6);
  font-size: 1.5rem;
  font-weight: 700;
  
  span {
    background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ConnectionPanel = styled.div`
  margin: 0 var(--space-4) var(--space-6);
  padding: var(--space-4);
  background: var(--bg-surface-hover);
  border-radius: var(--radius-lg);
`;

const ConnectionItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-3);

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    width: 20px;
    height: 20px;
    color: var(--text-accent);
  }

  .connection-info {
    flex: 1;
  }

  .status {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
    background: var(--status-success);
  }
`;

const Nav = styled.nav`
  padding: 0 var(--space-4);
`;

const NavItem = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  color: ${props => props.active ? 'var(--text-primary)' : 'var(--text-secondary)'};
  background: ${props => props.active ? 'var(--bg-accent)' : 'transparent'};
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  margin-bottom: var(--space-2);
  font-weight: 500;

  svg {
    width: 20px;
    height: 20px;
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

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Sidebar>
            <Logo>
              <span>SysMiddle</span>
            </Logo>
            
            <ConnectionPanel>
              <ConnectionItem>
                <IconBrandTrello />
                <div className="connection-info">
                  <div>Trello</div>
                  <small style={{ color: 'var(--text-secondary)' }}>Conectado</small>
                </div>
                <div className="status" />
              </ConnectionItem>
              <ConnectionItem>
                <IconBrandAsana />
                <div className="connection-info">
                  <div>Asana</div>
                  <small style={{ color: 'var(--text-secondary)' }}>Conectado</small>
                </div>
                <div className="status" />
              </ConnectionItem>
            </ConnectionPanel>

            <Nav>
              <NavItem href="/dashboard" active>
                <IconHome />
                Dashboard
              </NavItem>
              <NavItem href="/projects">
                <IconBriefcase />
                Projetos
              </NavItem>
              <NavItem href="/tasks">
                <IconList />
                Tarefas
              </NavItem>
              <NavItem href="/settings">
                <IconSettings />
                Configurações
              </NavItem>
            </Nav>
          </Sidebar>

          {children}
        </Layout>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}