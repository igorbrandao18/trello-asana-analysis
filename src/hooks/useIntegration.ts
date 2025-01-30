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
    queryFn: trelloService.getBoards,
  });

  const { data: asanaWorkspaces, isLoading: isLoadingAsana } = useQuery({
    queryKey: ['asana-workspaces'],
    queryFn: asanaService.getWorkspaces,
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