'use client';

import { Loader2 } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.primary};
  z-index: ${({ theme }) => theme.zIndices.modal};
`;

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Spinner = styled(Loader2)`
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.brand.secondary};
  animation: ${spin} 1s linear infinite;
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export function LoadingSpinner() {
  return (
    <Container>
      <SpinnerWrapper>
        <Spinner />
        <Text>Verificando conexões...</Text>
      </SpinnerWrapper>
    </Container>
  );
}
