'use client';

import styled from 'styled-components';
import { IconAlertTriangle } from '@tabler/icons-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
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

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-4);

  .icon {
    color: var(--status-warning);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
  }
`;

const Message = styled.p`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
`;

const Button = styled.button<{ variant?: 'danger' | 'secondary' }>`
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  ${props => props.variant === 'danger' ? `
    background: var(--status-error);
    color: white;
    &:hover {
      background: var(--status-error-dark);
    }
  ` : `
    background: var(--bg-surface-hover);
    color: var(--text-secondary);
    &:hover {
      background: var(--bg-surface-hover);
      color: var(--text-primary);
    }
  `}
`;

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onCancel}>
      <Modal onClick={e => e.stopPropagation()}>
        <Header>
          <IconAlertTriangle size={24} className="icon" />
          <h3>{title}</h3>
        </Header>
        
        <Message>{message}</Message>
        
        <Actions>
          <Button onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Confirmar
          </Button>
        </Actions>
      </Modal>
    </Overlay>
  );
} 