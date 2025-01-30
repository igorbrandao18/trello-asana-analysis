'use client';

import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const Button = styled.button<{ $loading?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme, $loading }) => 
    $loading 
      ? theme.colors.background.glass
      : `linear-gradient(135deg, ${theme.colors.brand.secondary} 0%, ${theme.colors.brand.tertiary} 100%)`};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  transition: all ${({ theme }) => theme.transitions.normal};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    transition: left 0.5s ease-in-out;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    &::before {
      left: 100%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.brand.primary}33`};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.background.glass};
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: ${({ theme }) => theme.spacing[2]};
    animation: ${({ $loading }) => $loading ? `${pulse} 1s ease-in-out infinite` : 'none'};
  }
`; 