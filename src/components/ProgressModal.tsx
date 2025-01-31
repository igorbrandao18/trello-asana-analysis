'use client';

import styled from 'styled-components';
import { IconLoader2, IconCheck, IconX } from '@tabler/icons-react';

interface ProgressModalProps {
  isOpen: boolean;
  currentTask: string;
  progress: number;
  status?: 'processing' | 'success' | 'error';
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Modal = styled.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Header = styled.div<{ status?: 'processing' | 'success' | 'error' }>`
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-6);

  .icon {
    animation: ${props => props.status === 'processing' ? 'spin 1s linear infinite' : 'bounce 0.5s ease'};
    color: ${props => {
      switch (props.status) {
        case 'success': return 'var(--status-success)';
        case 'error': return 'var(--status-error)';
        default: return 'var(--brand-primary)';
      }
    }};
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
  }
`;

const Task = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  min-height: 1.5em;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s ease;

  &.fade-enter {
    opacity: 0;
    transform: translateY(10px);
  }

  &.fade-exit {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const ProgressBar = styled.div`
  height: 4px;
  background: var(--bg-surface-hover);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--space-2);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const Progress = styled.div<{ value: number }>`
  height: 100%;
  width: ${props => props.value}%;
  background: var(--brand-primary);
  transition: width 0.3s ease;
`;

const Percentage = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-align: right;
  font-variant-numeric: tabular-nums;
  transition: all 0.3s ease;
`;

export function ProgressModal({ isOpen, currentTask, progress, status = 'processing' }: ProgressModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Modal>
        <Header status={status}>
          {status === 'processing' && <IconLoader2 size={24} className="icon" />}
          {status === 'success' && <IconCheck size={24} className="icon" />}
          {status === 'error' && <IconX size={24} className="icon" />}
          <h3>
            {status === 'processing' && 'Processando'}
            {status === 'success' && 'Concluído'}
            {status === 'error' && 'Erro'}
          </h3>
        </Header>
        
        <Task>{currentTask}</Task>
        
        <ProgressBar>
          <Progress value={progress} />
        </ProgressBar>
        
        <Percentage>{progress}%</Percentage>
      </Modal>
    </Overlay>
  );
} 