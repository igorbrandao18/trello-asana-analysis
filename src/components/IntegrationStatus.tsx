'use client';

import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

interface IntegrationStatusProps {
  isLoading?: boolean;
  error?: string;
  success?: boolean;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StatusContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
  animation: ${fadeIn} ${({ theme }) => theme.transitions.normal};
`;

const ErrorContainer = styled(StatusContainer)`
  background: ${({ theme }) => theme.colors.background.error};
  border: 1px solid ${({ theme }) => theme.colors.border.error};
  color: ${({ theme }) => theme.colors.status.error};
`;

const SuccessContainer = styled(StatusContainer)`
  background: ${({ theme }) => theme.colors.background.success};
  border: 1px solid ${({ theme }) => theme.colors.border.success};
  color: ${({ theme }) => theme.colors.status.success};
`;

const LoadingContainer = styled(StatusContainer)`
  background: ${({ theme }) => theme.colors.background.warning};
  border: 1px solid ${({ theme }) => theme.colors.border.warning};
  color: ${({ theme }) => theme.colors.status.warning};
`;

const StatusIcon = styled.div`
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const StatusMessage = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  flex: 1;
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const LoadingIcon = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

export function IntegrationStatus({ isLoading, error, success }: IntegrationStatusProps) {
  if (isLoading) {
    return (
      <LoadingContainer>
        <StatusIcon>
          <LoadingIcon />
        </StatusIcon>
        <StatusMessage>
          Sincronizando dados entre Trello e Asana...
        </StatusMessage>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <StatusIcon>
          <XCircle />
        </StatusIcon>
        <StatusMessage>
          {error}
        </StatusMessage>
      </ErrorContainer>
    );
  }

  if (success) {
    return (
      <SuccessContainer>
        <StatusIcon>
          <CheckCircle />
        </StatusIcon>
        <StatusMessage>
          Integração concluída com sucesso!
        </StatusMessage>
      </SuccessContainer>
    );
  }

  return null;
} 