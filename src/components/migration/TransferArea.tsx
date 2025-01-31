import styled from 'styled-components';
import { IconArrowsExchange, IconLoader2 } from '@tabler/icons-react';

interface TransferAreaWrapperProps {
  $progress: number;
}

const TransferAreaWrapper = styled.div<TransferAreaWrapperProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  width: 120px;
  height: 120px;

  .progress-text {
    position: absolute;
    bottom: -30px;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
    text-align: center;
  }

  .progress-ring {
    position: absolute;
    width: 100px;
    height: 100px;
    transform: rotate(-90deg);

    circle {
      fill: none;
      stroke-width: 3;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.3s ease;
    }

    .progress-ring-bg {
      stroke: rgba(255, 255, 255, 0.1);
    }

    .progress-ring-fg {
      stroke: #ffffff;
      stroke-dasharray: 283;
      stroke-dashoffset: ${props => 283 - (283 * props.$progress) / 100};
    }
  }
`;

const TransferCircle = styled.div<{ active?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .progress-ring {
    position: absolute;
    width: 100px;
    height: 100px;
    transform: rotate(-90deg);
    pointer-events: none;
    z-index: 5;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(30, 42, 59, 0.1);
    border: 1px solid rgba(30, 42, 59, ${props => props.active ? '0.3' : '0.1'});
    animation: pulse 2s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 120%;
    height: 120%;
    border-radius: 50%;
    border: 1px solid rgba(30, 42, 59, ${props => props.active ? '0.2' : '0.05'});
    animation: pulse 2s ease-in-out infinite 0.3s;
    pointer-events: none;
    z-index: 1;
  }
`;

const TransferButton = styled.button<{ active?: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 
    '#1e2a3b' : 
    'rgba(30, 42, 59, 0.5)'
  };
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  cursor: ${props => props.active ? 'pointer' : 'not-allowed'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:hover:not(:disabled) {
    transform: scale(1.05);
    background: ${props => props.active ? 
      '#1e2a3b' : 
      'rgba(30, 42, 59, 0.6)'
    };
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }

  span {
    font-size: 0.75rem;
    font-weight: 500;
  }
`;

const ParticleEffect = styled.div<{ active?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.3s ease;
  }

  &::before {
    top: 20%;
    left: 10%;
    animation: float 3s ease-in-out infinite;
  }

  &::after {
    bottom: 20%;
    right: 10%;
    animation: float 3s ease-in-out infinite 1.5s;
  }

  @keyframes float {
    0% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-5px) scale(1.2); }
    100% { transform: translateY(0) scale(1); }
  }
`;

interface TransferAreaProps {
  isActive: boolean;
  isMigrating: boolean;
  progress: number;
  currentTask: string;
  onTransfer: () => void;
}

export const TransferArea: React.FC<TransferAreaProps> = ({
  isActive,
  isMigrating,
  progress,
  currentTask,
  onTransfer
}) => {
  return (
    <TransferAreaWrapper $progress={progress}>
      <TransferCircle active={isActive}>
        <ParticleEffect active={isActive} />
        {isMigrating && (
          <svg className="progress-ring" viewBox="0 0 100 100">
            <circle 
              className="progress-ring-bg"
              cx="50" 
              cy="50" 
              r="45"
            />
            <circle 
              className="progress-ring-fg"
              cx="50" 
              cy="50" 
              r="45"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
            />
          </svg>
        )}
        <TransferButton
          active={isActive}
          disabled={!isActive || isMigrating}
          onClick={onTransfer}
        >
          {isMigrating ? (
            <>
              <IconLoader2 className="spin" />
              <span>Transferindo</span>
            </>
          ) : (
            <>
              <IconArrowsExchange />
              <span>Transferir</span>
            </>
          )}
        </TransferButton>
      </TransferCircle>
      {isMigrating && (
        <div className="progress-text">
          {Math.round(progress)}%
          <br />
          {currentTask}
        </div>
      )}
    </TransferAreaWrapper>
  );
}; 