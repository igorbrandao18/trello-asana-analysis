import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { trelloService } from '@/services/trello';
import { asanaService } from '@/services/asana';

interface UseIntegrationProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useIntegration({ onSuccess, onError }: UseIntegrationProps = {}) {
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState('');

  const { data: trelloBoards, isLoading: isLoadingTrello } = useQuery({
    queryKey: ['trello-boards'],
    queryFn: async () => {
      console.log('Fetching Trello boards...');
      const boards = await trelloService.getBoards();
      console.log('Trello boards:', boards);
      return boards;
    },
    enabled: true, // Sempre buscar os quadros
  });

  const { data: asanaWorkspaces, isLoading: isLoadingAsana } = useQuery({
    queryKey: ['asana-workspaces'],
    queryFn: async () => {
      console.log('Fetching Asana workspaces...');
      const workspaces = await asanaService.getWorkspaces();
      console.log('Asana workspaces:', workspaces);
      return workspaces;
    },
    enabled: true, // Sempre buscar os workspaces
  });

  const { mutate: sync, isPending: isSyncing } = useMutation({
    mutationFn: async () => {
      if (!selectedBoard || !selectedWorkspace) {
        throw new Error('Selecione um quadro e um workspace');
      }

      await trelloService.syncToAsana({
        boardId: selectedBoard,
        workspaceId: selectedWorkspace,
      });
    },
    onSuccess,
    onError,
  });

  return {
    selectedBoard,
    setSelectedBoard,
    selectedWorkspace,
    setSelectedWorkspace,
    trelloBoards,
    asanaWorkspaces,
    isLoadingTrello,
    isLoadingAsana,
    isSyncing,
    sync,
  };
} 