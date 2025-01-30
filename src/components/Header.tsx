'use client';

import { Loader2, CheckCircle, XCircle, AlertCircle, RefreshCw, TrelloIcon, LayoutGrid } from 'lucide-react';
import styled from 'styled-components';
import { ConnectionStatus } from '@/hooks/useConnectionTest';

interface HeaderProps {
  trelloStatus?: ConnectionStatus;
  asanaStatus?: ConnectionStatus;
  trelloUser?: {
    name: string;
    email?: string;
  };
  asanaUser?: {
    name: string;
    email?: string;
  };
  onRetryTrello?: () => void;
  onRetryAsana?: () => void;
}

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.brand.gradient};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const HeaderContent = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Logo = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  white-space: nowrap;

  svg {
    width: 24px;
    height: 24px;
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

const StatusBadge = styled.div<{ status?: ConnectionStatus }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  background: ${({ theme }) => theme.colors.background.glass};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 240px;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    ${({ status, theme }) => {
      switch (status) {
        case 'checking':
          return `
            animation: spin 1s linear infinite;
            color: ${theme.colors.status.warning};
          `;
        case 'connected':
          return `color: ${theme.colors.status.success};`;
        case 'error':
          return `color: ${theme.colors.status.error};`;
        case 'disconnected':
          return `color: ${theme.colors.text.secondary};`;
        default:
          return `color: ${theme.colors.text.secondary};`;
      }
    }}
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const StatusInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  min-width: 0;
  flex: 1;
`;

const StatusLabel = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const UserInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RetryButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: all ${({ theme }) => theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.hover};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.border.focus};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export function Header({ 
  trelloStatus, 
  asanaStatus, 
  trelloUser, 
  asanaUser,
  onRetryTrello,
  onRetryAsana,
}: HeaderProps) {
  const getStatusIcon = (status?: ConnectionStatus) => {
    switch (status) {
      case 'checking':
        return <Loader2 />;
      case 'connected':
        return <CheckCircle />;
      case 'error':
        return <XCircle />;
      case 'disconnected':
        return <AlertCircle />;
      default:
        return <AlertCircle />;
    }
  };

  const getStatusText = (service: string, status?: ConnectionStatus) => {
    switch (status) {
      case 'checking':
        return `${service} Conectando...`;
      case 'connected':
        return `${service} Conectado`;
      case 'error':
        return `${service} Erro`;
      case 'disconnected':
        return `${service} Desconectado`;
      default:
        return `${service} Desconectado`;
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <span>
            <TrelloIcon />
            Trello
          </span>
          →
          <span>
            <LayoutGrid />
            Asana
          </span>
        </Logo>
        <StatusContainer>
          <StatusBadge status={trelloStatus}>
            {getStatusIcon(trelloStatus)}
            <StatusInfo>
              <StatusLabel>
                {getStatusText('Trello', trelloStatus)}
                {onRetryTrello && (trelloStatus === 'error' || trelloStatus === 'disconnected') && (
                  <RetryButton onClick={onRetryTrello} title="Tentar novamente">
                    <RefreshCw />
                  </RetryButton>
                )}
              </StatusLabel>
              {trelloUser && (
                <UserInfo>
                  {trelloUser.name}
                  {trelloUser.email && ` (${trelloUser.email})`}
                </UserInfo>
              )}
            </StatusInfo>
          </StatusBadge>
          <StatusBadge status={asanaStatus}>
            {getStatusIcon(asanaStatus)}
            <StatusInfo>
              <StatusLabel>
                {getStatusText('Asana', asanaStatus)}
                {onRetryAsana && (asanaStatus === 'error' || asanaStatus === 'disconnected') && (
                  <RetryButton onClick={onRetryAsana} title="Tentar novamente">
                    <RefreshCw />
                  </RetryButton>
                )}
              </StatusLabel>
              {asanaUser && (
                <UserInfo>
                  {asanaUser.name}
                  {asanaUser.email && ` (${asanaUser.email})`}
                </UserInfo>
              )}
            </StatusInfo>
          </StatusBadge>
        </StatusContainer>
      </HeaderContent>
    </HeaderContainer>
  );
} 