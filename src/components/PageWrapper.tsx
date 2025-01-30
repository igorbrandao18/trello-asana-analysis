import { ReactNode } from 'react';
import styled from 'styled-components';
import { IconBell, IconUser } from '@tabler/icons-react';

interface PageWrapperProps {
  title: string;
  children: ReactNode;
}

const Wrapper = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
  background: var(--bg-base);
`;

const Header = styled.header`
  height: var(--header-height);
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  padding: 0 var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
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

const Main = styled.main`
  padding: var(--space-6);
  max-width: var(--content-max-width);
  margin: 0 auto;
`;

export function PageWrapper({ title, children }: PageWrapperProps) {
  return (
    <Wrapper>
      <Header>
        <PageTitle>{title}</PageTitle>
        <HeaderActions>
          <IconButton>
            <IconBell />
          </IconButton>
          <UserProfile>
            <IconUser />
          </UserProfile>
        </HeaderActions>
      </Header>
      <Main>{children}</Main>
    </Wrapper>
  );
} 