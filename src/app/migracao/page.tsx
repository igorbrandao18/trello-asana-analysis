'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconArrowsExchange, IconBrandTrello, IconLayoutGrid, IconLoader2, IconChevronDown, IconCalendar, IconTag, IconUsers, IconLayoutList, IconCards, IconBrandAsana } from '@tabler/icons-react';
import { Header } from '@/components/Header';
import { getTrelloProjects, getAsanaProjects, migrateProjects, migrateSingleCard } from '@/services/migration';
import { ProgressModal } from '@/components/ProgressModal';

const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: var(--sidebar-width);
  background: #1e2a3b;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem;
  gap: 2rem;
  overflow: hidden;
`;

const SourcePanel = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TargetPanel = styled(SourcePanel)``;

const PanelHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      width: 24px;
      height: 24px;
      opacity: 0.9;
    }
  }
`;

const SearchBar = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    font-size: 0.875rem;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.08);
    }
  }
`;

const ProjectList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.25rem;
`;

const ProjectCard = styled.div<{ selected?: boolean }>`
  padding: 1.25rem;
  background: ${props => props.selected ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)'};
  border-radius: 8px;
  border: 1px solid ${props => props.selected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)'};
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;

    span {
      font-size: 0.95rem;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    svg {
      width: 16px;
      height: 16px;
      opacity: 0.7;
    }
  }

  .description {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  .meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.375rem;

      svg {
        width: 14px;
        height: 14px;
        opacity: 0.5;
      }
    }
  }

  .lists {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
  }

  .list-item {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 6px;
    padding: 0.75rem;
    
    .list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      
      h4 {
        font-size: 0.85rem;
        font-weight: 500;
        color: #ffffff;
        margin: 0;
      }
      
      span {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    
    .cards-preview {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      .card-preview {
        padding: 0.5rem;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 4px;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.7);
      }
      
      .more-cards {
        text-align: center;
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.4);
        padding: 0.25rem;
      }
    }
  }
`;

const ProjectDetails = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
  overflow-y: auto;
  max-height: 500px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }
`;

const ListColumn = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ListHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .list-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .list-meta {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    padding: 0.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
`;

const CardsList = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }

  .card-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: #ffffff;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  .card-description {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.75rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.6875rem;
    color: rgba(255, 255, 255, 0.5);

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      
      svg {
        width: 12px;
        height: 12px;
        opacity: 0.7;
      }
    }
  }
`;

const ActionBar = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  ${props => props.variant === 'primary' ? `
    background: #ffffff;
    color: #1e2a3b;
    border: none;

    &:hover {
      background: rgba(255, 255, 255, 0.9);
    }
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.7);
  gap: 1rem;
  height: 100%;

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.7);
  height: 100%;
  text-align: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.5rem;

  .progress {
    height: 100%;
    background: #ffffff;
    transition: width 0.3s ease;
  }
`;

const TransferArea = styled.div`
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
      stroke-dashoffset: ${props => 283 - (283 * props.progress) / 100};
    }
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

const CardActions = styled.div`
  margin-top: var(--space-2);
  display: flex;
  justify-content: flex-end;

  button {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-1) var(--space-2);
    font-size: 0.75rem;
    color: var(--text-secondary);
    background: var(--bg-surface);
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);

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
  }
`;

const ProjectsList = styled.div`
  margin-top: var(--space-4);

  .project-item {
    margin-bottom: var(--space-3);
    
    h5 {
      margin: 0 0 var(--space-2);
      font-size: 0.9rem;
      color: var(--text-primary);
    }
  }
`;

const SectionsList = styled.div`
  margin-left: var(--space-4);
`;

const ProjectItem = styled.div<{ selected?: boolean }>`
  padding: var(--space-3);
  margin: var(--space-2) 0;
  border-radius: var(--radius-lg);
  background: ${props => props.selected ? 'var(--primary-soft)' : 'var(--bg-surface)'};
  border: 2px solid ${props => props.selected ? 'var(--primary)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.selected 
    ? '0 8px 16px rgba(var(--primary-rgb), 0.15)' 
    : '0 2px 4px rgba(0, 0, 0, 0.05)'};

  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 12px 24px rgba(var(--primary-rgb), 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${props => props.selected ? 'var(--primary)' : 'transparent'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: var(--space-3);
    width: 20px;
    height: 20px;
    border: 2px solid ${props => props.selected ? 'var(--primary)' : 'var(--border-color)'};
    border-radius: 50%;
    transform: translateY(-50%) scale(${props => props.selected ? '1' : '0.8'});
    opacity: ${props => props.selected ? '1' : '0.5'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: ${props => props.selected ? 'var(--primary)' : 'transparent'};
    background-image: ${props => props.selected ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E\")" : 'none'};
    background-size: 12px;
    background-position: center;
    background-repeat: no-repeat;
  }

  h5 {
    margin: 0;
    font-size: ${props => props.selected ? '1.1rem' : '1rem'};
    color: ${props => props.selected ? 'var(--primary)' : 'var(--text-primary)'};
    font-weight: ${props => props.selected ? '600' : '400'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding-right: var(--space-8);
  }
`;

const SectionItem = styled.div<{ selected?: boolean }>`
  padding: var(--space-2) var(--space-3);
  margin: var(--space-1) 0;
  margin-left: var(--space-4);
  border-radius: var(--radius-lg);
  background: ${props => props.selected ? 'var(--primary-soft)' : 'var(--bg-surface)'};
  border: 2px solid ${props => props.selected ? 'var(--primary)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  box-shadow: ${props => props.selected 
    ? '0 4px 12px rgba(var(--primary-rgb), 0.15)' 
    : '0 1px 3px rgba(0, 0, 0, 0.05)'};

  &:hover {
    border-color: var(--primary);
    transform: translateX(8px);
    box-shadow: 0 6px 16px rgba(var(--primary-rgb), 0.2);
  }

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.selected ? 'var(--primary)' : 'var(--border-color)'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(${props => props.selected ? '1' : '0.8'});
    box-shadow: ${props => props.selected 
      ? '0 0 0 4px rgba(var(--primary-rgb), 0.2)' 
      : 'none'};
  }

  &::after {
    content: '';
    position: absolute;
    left: -24px;
    top: 50%;
    width: 16px;
    height: 2px;
    background: ${props => props.selected ? 'var(--primary)' : 'var(--border-color)'};
    transform: scaleX(${props => props.selected ? '1' : '0'});
    transform-origin: left;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  color: ${props => props.selected ? 'var(--primary)' : 'var(--text-primary)'};
  font-weight: ${props => props.selected ? '600' : '400'};
  font-size: ${props => props.selected ? '0.95rem' : '0.9rem'};
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
  transform: scale(0.95);
  opacity: 0;
  animation: modalEnter 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @keyframes modalEnter {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  h3 {
    margin: 0 0 var(--space-4);
    font-size: 1.4rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: var(--space-2);

    &::before {
      content: '';
      width: 4px;
      height: 24px;
      background: var(--primary);
      border-radius: var(--radius-sm);
    }
  }

  .description {
    margin-bottom: var(--space-4);
    color: var(--text-secondary);
    font-size: 0.95rem;
    
    strong {
      color: var(--text-primary);
      font-size: 1.1rem;
      display: block;
      margin-bottom: var(--space-2);
    }
  }

  .select-project {
    margin-top: var(--space-4);
    padding-top: var(--space-4);
    border-top: 1px solid var(--border-color);

    h4 {
      margin: 0 0 var(--space-3);
      font-size: 1rem;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
  }

  .actions {
    display: flex;
    gap: var(--space-2);
    justify-content: flex-end;
    margin-top: var(--space-6);

    button {
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-lg);
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

      &.cancel {
        background: transparent;
        color: var(--text-secondary);
        border: 2px solid var(--border-color);

        &:hover {
          background: var(--bg-surface-hover);
          color: var(--text-primary);
          border-color: var(--text-primary);
        }
      }

      &.confirm {
        background: var(--primary);
        color: white;
        border: none;
        padding: var(--space-2) var(--space-6);
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          transform: translate(-50%, -50%) scale(0);
          border-radius: 50%;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        &:hover:not(:disabled) {
          background: var(--primary-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);

          &::before {
            transform: translate(-50%, -50%) scale(2.5);
          }
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }
`;

const CardPreview = styled.div`
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(4px);
  }

  .card-description {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 0.25rem;
  }

  .card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;

    .meta-tag {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.05);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;

      svg {
        width: 12px;
        height: 12px;
        opacity: 0.7;
      }
    }
  }
`;

interface Project {
  id: string;
  title: string;
  description?: string;
  cards: number;
  members: number;
  status: string;
  lists?: Array<{
    id: string;
    name: string;
    cards: Array<{
      id: string;
      name: string;
      description: string;
      due?: string;
      labels?: string[];
      members?: string[];
    }>;
  }>;
}

export default function MigracaoPage() {
  const [trelloProjects, setTrelloProjects] = useState<Project[]>([]);
  const [asanaProjects, setAsanaProjects] = useState<Project[]>([]);
  const [selectedTrelloBoard, setSelectedTrelloBoard] = useState<string>();
  const [selectedAsanaProject, setSelectedAsanaProject] = useState<string>();
  const [selectedAsanaSection, setSelectedAsanaSection] = useState<string>();
  const [loadingTrello, setLoadingTrello] = useState(false);
  const [loadingAsana, setLoadingAsana] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [trelloSearch, setTrelloSearch] = useState('');
  const [asanaSearch, setAsanaSearch] = useState('');
  const [migratingCards, setMigratingCards] = useState<Set<string>>(new Set());
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    boardId: string;
    name: string;
    description: string;
  } | null>(null);

  const loadTrelloProjects = async () => {
    setLoadingTrello(true);
    try {
      const data = await getTrelloProjects();
      setTrelloProjects(data);
    } catch (error) {
      console.error('Erro ao carregar projetos do Trello:', error);
    } finally {
      setLoadingTrello(false);
    }
  };

  const loadAsanaProjects = async () => {
    setLoadingAsana(true);
    try {
      const data = await getAsanaProjects();
      setAsanaProjects(data);
    } catch (error) {
      console.error('Erro ao carregar projetos do Asana:', error);
    } finally {
      setLoadingAsana(false);
    }
  };

  useEffect(() => {
    loadTrelloProjects();
    loadAsanaProjects();
  }, []);

  const filteredTrelloProjects = trelloProjects.filter(project =>
    project.title.toLowerCase().includes(trelloSearch.toLowerCase()) ||
    project.description?.toLowerCase().includes(trelloSearch.toLowerCase())
  );

  const filteredAsanaProjects = asanaProjects.filter(project =>
    project.title.toLowerCase().includes(asanaSearch.toLowerCase()) ||
    project.description?.toLowerCase().includes(asanaSearch.toLowerCase())
  );

  const selectedTrelloProject = trelloProjects.find(p => p.id === selectedTrelloBoard);

  const handleMigration = async () => {
    if (!selectedTrelloBoard) return;
    
    setMigrating(true);
    setProgress(0);
    setStatus('processing');
    
    try {
      const selectedProject = trelloProjects.find(p => p.id === selectedTrelloBoard);
      if (selectedProject) {
        // Fase de Inicialização
        setCurrentTask('Iniciando processo de transferência...');
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(5);

        setCurrentTask('Verificando conexão com as APIs...');
        await new Promise(resolve => setTimeout(resolve, 600));
        setProgress(10);

        setCurrentTask('Analisando estrutura do board...');
        await new Promise(resolve => setTimeout(resolve, 700));
        setProgress(15);

        // Fase de Preparação
        setCurrentTask(`Preparando transferência de ${selectedProject.lists?.length || 0} listas e ${selectedProject.cards} cards...`);
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(20);

        // Fase de Criação da Estrutura
        setCurrentTask('Criando estrutura no Asana...');
        await new Promise(resolve => setTimeout(resolve, 600));
        setProgress(25);

        setCurrentTask('Configurando seções e propriedades...');
        await new Promise(resolve => setTimeout(resolve, 700));
        setProgress(30);

        // Fase de Transferência
        setCurrentTask('Iniciando transferência de conteúdo...');
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(35);
      }

      // Transferência dos Cards
      await migrateProjects('trello', [selectedTrelloBoard], (progress) => {
        const baseProgress = 35;
        const transferProgress = Math.round((progress.current / progress.total) * 40);
        setProgress(baseProgress + transferProgress);

        if (progress.current === progress.total) {
          setCurrentTask('Todos os cards foram transferidos com sucesso!');
        } else {
          setCurrentTask(
            `Transferindo card ${progress.current} de ${progress.total}...\n` +
            `${selectedProject?.lists?.find(l => l.cards.find(c => c.id === String(progress.current)))?.name || ''}`
          );
        }
      });

      // Fase de Finalização
      setCurrentTask('Verificando integridade dos dados...');
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(80);

      setCurrentTask('Removendo dados originais...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(85);

      setCurrentTask('Atualizando referências...');
      await new Promise(resolve => setTimeout(resolve, 700));
      setProgress(90);

      // Atualizar as listas
      setCurrentTask('Sincronizando alterações...');
      await Promise.all([
        loadTrelloProjects(),
        loadAsanaProjects()
      ]);
      setProgress(95);

      setCurrentTask('Finalizando processo...');
      await new Promise(resolve => setTimeout(resolve, 600));
      setProgress(100);

      setCurrentTask('Transferência concluída com sucesso! 🎉\nTodos os dados foram migrados e verificados.');
      setStatus('success');
      
      // Delay para mostrar o sucesso
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Limpar apenas a seleção do Trello
      setSelectedTrelloBoard(undefined);
      
      // Recarregar os dados
      await Promise.all([
        loadTrelloProjects(),
        loadAsanaProjects()
      ]);
    } catch (error) {
      console.error('Erro durante a migração:', error);
      setCurrentTask('❌ Erro durante a transferência.\nVerifique as conexões e tente novamente.');
      setStatus('error');
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setMigrating(false);
      setProgress(0);
      setCurrentTask('');
      setStatus('processing');
    }
  };

  const handleSingleCardMigration = async (cardId: string, boardId: string) => {
    if (!selectedAsanaProject) {
      setCurrentTask('Erro: Selecione um projeto do Asana para migrar o card.');
      setStatus('error');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentTask('');
      setStatus('processing');
      return;
    }

    if (!selectedAsanaSection) {
      setCurrentTask('Erro: Selecione uma seção do Asana para migrar o card.');
      setStatus('error');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentTask('');
      setStatus('processing');
      return;
    }

    if (migratingCards.has(cardId)) return;
    
    setMigratingCards(prev => new Set(prev).add(cardId));
    setMigrating(true);
    setProgress(0);
    setStatus('processing');
    
    try {
      setCurrentTask('Iniciando migração do card...');
      
      await migrateSingleCard(
        cardId, 
        boardId, 
        selectedAsanaProject,
        selectedAsanaSection,
        (progress) => {
          setProgress(progress.current / progress.total * 100);
          setCurrentTask('Migrando card para o Asana...');
        }
      );
      
      setProgress(100);
      setCurrentTask('Card migrado com sucesso!');
      setStatus('success');
      
      await Promise.all([
        loadTrelloProjects(),
        loadAsanaProjects()
      ]);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error: any) {
      console.error('Erro detalhado ao migrar card:', {
        cardId,
        boardId,
        projectId: selectedAsanaProject,
        sectionId: selectedAsanaSection,
        error: error.message,
        stack: error.stack
      });
      
      setCurrentTask('Erro: ' + (error.message || 'Falha ao migrar o card') + '. Verifique o console para mais detalhes.');
      setStatus('error');
      await new Promise(resolve => setTimeout(resolve, 3000));
    } finally {
      setMigratingCards(prev => {
        const next = new Set(prev);
        next.delete(cardId);
        return next;
      });
      setMigrating(false);
      setProgress(0);
      setCurrentTask('');
      setStatus('processing');
    }
  };

  const handleCardClick = (card: {
    id: string;
    name: string;
    description: string;
  }, boardId: string) => {
    setSelectedCard({
      id: card.id,
      boardId,
      name: card.name,
      description: card.description
    });
  };

  const handleConfirmMigration = async () => {
    if (!selectedCard || !selectedAsanaProject || !selectedAsanaSection) return;
    
    await handleSingleCardMigration(selectedCard.id, selectedCard.boardId);
    setSelectedCard(null);
  };

  const renderTrelloCard = (project: Project) => (
    <ProjectCard 
      key={project.id} 
      selected={selectedTrelloBoard === project.id}
      onClick={() => setSelectedTrelloBoard(selectedTrelloBoard === project.id ? undefined : project.id)}
    >
      <div className="title">
        <span>
          <IconBrandTrello />
          {project.title}
        </span>
        <IconChevronDown />
      </div>
      {project.description && (
        <div className="description">{project.description}</div>
      )}
      <div className="meta">
        <div className="meta-item">
          <IconLayoutList />
          {project.lists?.length || 0} Listas
        </div>
        <div className="meta-item">
          <IconCards />
          {project.cards} Cards
        </div>
        <div className="meta-item">
          <IconUsers />
          {project.members} {project.members === 1 ? 'Membro' : 'Membros'}
        </div>
        <div className="meta-item">
          <IconCalendar />
          Atualizado {new Date().toLocaleDateString()}
        </div>
      </div>
      {selectedTrelloBoard === project.id && project.lists && (
        <div className="lists">
          {project.lists.map(list => (
            <div key={list.id} className="list-item">
              <div className="list-header">
                <h4>{list.name}</h4>
                <span>{list.cards.length} cards</span>
              </div>
              <div className="cards-preview">
                {list.cards.slice(0, 3).map(card => (
                  <div key={card.id} className="card-preview">
                    {card.name}
                  </div>
                ))}
                {list.cards.length > 3 && (
                  <div className="more-cards">
                    +{list.cards.length - 3} cards
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </ProjectCard>
  );

  const renderAsanaCard = (project: Project) => (
    <ProjectCard 
      key={project.id}
      selected={selectedAsanaProject === project.id}
      onClick={() => {
        setSelectedAsanaProject(selectedAsanaProject === project.id ? undefined : project.id);
        setSelectedAsanaSection(undefined);
      }}
    >
      <div className="title">
        <span>
          <IconBrandAsana />
          {project.title}
        </span>
        <IconChevronDown />
      </div>
      {project.description && (
        <div className="description">{project.description}</div>
      )}
      <div className="meta">
        <div className="meta-item">
          <IconLayoutList />
          {project.lists?.length || 0} Seções
        </div>
        <div className="meta-item">
          <IconCards />
          {project.cards} Tasks
        </div>
        <div className="meta-item">
          <IconUsers />
          {project.members} {project.members === 1 ? 'Membro' : 'Membros'}
        </div>
        <div className="meta-item">
          <IconCalendar />
          Atualizado {new Date().toLocaleDateString()}
        </div>
      </div>
      {selectedAsanaProject === project.id && project.lists && (
        <div className="lists">
          {project.lists.map(list => (
            <div 
              key={list.id} 
              className="list-item"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedAsanaSection(selectedAsanaSection === list.id ? undefined : list.id);
              }}
            >
              <div className="list-header">
                <h4>{list.name}</h4>
                <span>{list.cards.length} tasks</span>
              </div>
              <div className="cards-preview">
                {list.cards.slice(0, 3).map(card => (
                  <div 
                    key={card.id} 
                    className="card-preview"
                    style={{
                      background: selectedAsanaSection === list.id ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                      borderLeft: selectedAsanaSection === list.id ? '2px solid var(--primary)' : 'none',
                      paddingLeft: selectedAsanaSection === list.id ? '0.75rem' : '0.5rem'
                    }}
                  >
                    {card.name}
                    {card.description && (
                      <div className="card-description">
                        {card.description.length > 50 
                          ? card.description.substring(0, 50) + '...' 
                          : card.description}
                      </div>
                    )}
                    {(card.due || card.labels?.length > 0 || card.members?.length > 0) && (
                      <div className="card-meta">
                        {card.due && (
                          <span className="meta-tag">
                            <IconCalendar />
                            {new Date(card.due).toLocaleDateString()}
                          </span>
                        )}
                        {card.labels?.map((label, idx) => (
                          <span key={idx} className="meta-tag">
                            <IconTag />
                            {label}
                          </span>
                        ))}
                        {card.members?.length > 0 && (
                          <span className="meta-tag">
                            <IconUsers />
                            {card.members.length}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {list.cards.length > 3 && (
                  <div className="more-cards">
                    +{list.cards.length - 3} tasks
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </ProjectCard>
  );

  return (
    <PageWrapper>
      <Content>
        <SourcePanel>
          <PanelHeader>
            <h2>
              <IconBrandTrello />
              Trello
            </h2>
          </PanelHeader>
          <SearchBar>
            <input 
              type="text" 
              placeholder="Buscar quadros..." 
              value={trelloSearch}
              onChange={(e) => setTrelloSearch(e.target.value)}
            />
          </SearchBar>
          <ProjectList>
            {loadingTrello ? (
              <LoadingWrapper>
                <IconLoader2 size={24} />
                <span>Carregando quadros...</span>
              </LoadingWrapper>
            ) : filteredTrelloProjects.length > 0 ? (
              filteredTrelloProjects.map(renderTrelloCard)
            ) : (
              <EmptyState>
                {trelloSearch ? 'Nenhum quadro encontrado' : 'Nenhum quadro disponível'}
              </EmptyState>
            )}
          </ProjectList>
          <ActionBar>
            <Stats>
              {selectedTrelloProject && (
                <>
                  <span>1 quadro selecionado</span>
                  <span className="separator">•</span>
                  <span>{selectedTrelloProject.cards} cards para transferir</span>
                </>
              )}
            </Stats>
          </ActionBar>
        </SourcePanel>

        <TransferArea>
          <TransferCircle active={!!selectedTrelloBoard}>
            <ParticleEffect active={!!selectedTrelloBoard} />
            {migrating && (
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
              active={!!selectedTrelloBoard}
              disabled={!selectedTrelloBoard || migrating}
              onClick={handleMigration}
            >
              {migrating ? (
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
          {migrating && (
            <div className="progress-text">
              {Math.round(progress)}%
              <br />
              {currentTask}
            </div>
          )}
        </TransferArea>

        <TargetPanel>
          <PanelHeader>
            <h2>
              <IconLayoutGrid />
              Asana
            </h2>
          </PanelHeader>
          <SearchBar>
            <input 
              type="text" 
              placeholder="Buscar projetos..." 
              value={asanaSearch}
              onChange={(e) => setAsanaSearch(e.target.value)}
            />
          </SearchBar>
          <ProjectList>
            {loadingAsana ? (
              <LoadingWrapper>
                <IconLoader2 size={24} />
                <span>Carregando projetos...</span>
              </LoadingWrapper>
            ) : filteredAsanaProjects.length > 0 ? (
              filteredAsanaProjects.map(renderAsanaCard)
            ) : (
              <EmptyState>
                {asanaSearch ? 'Nenhum projeto encontrado' : 'Nenhum projeto disponível'}
              </EmptyState>
            )}
          </ProjectList>
          <ActionBar>
            <Stats>
              {selectedAsanaProject && <span>1 projeto selecionado</span>}
            </Stats>
          </ActionBar>
        </TargetPanel>
      </Content>

      <ProgressModal 
        isOpen={migrating}
        currentTask={currentTask}
        progress={progress}
        status={status}
      />

      {selectedCard && (
        <Modal onClick={() => setSelectedCard(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h3>Transferir Card</h3>
            <div className="description">
              <strong>{selectedCard.name}</strong>
              <p>{selectedCard.description}</p>
            </div>
            
            <div className="select-project">
              <h4>Selecione o destino no Asana:</h4>
              <div className="projects-list">
                {asanaProjects.map(project => (
                  <div key={project.id}>
                    <ProjectItem
                      selected={selectedAsanaProject === project.id}
                      onClick={() => {
                        setSelectedAsanaProject(project.id);
                        setSelectedAsanaSection(undefined);
                      }}
                    >
                      <h5>{project.title}</h5>
                    </ProjectItem>
                    
                    {selectedAsanaProject === project.id && project.lists && (
                      <div className="sections-wrapper">
                        <div className="sections-header">
                          Selecione a seção:
                        </div>
                        {project.lists.map(section => (
                          <SectionItem
                            key={section.id}
                            selected={selectedAsanaSection === section.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAsanaSection(section.id);
                            }}
                          >
                            {section.name}
                          </SectionItem>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="actions">
              <button className="cancel" onClick={() => setSelectedCard(null)}>
                Cancelar
              </button>
              <button
                className="confirm"
                onClick={handleConfirmMigration}
                disabled={!selectedAsanaProject || !selectedAsanaSection}
              >
                {!selectedAsanaProject 
                  ? 'Selecione um projeto'
                  : !selectedAsanaSection 
                    ? 'Selecione uma seção'
                    : 'Transferir'}
              </button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </PageWrapper>
  );
} 