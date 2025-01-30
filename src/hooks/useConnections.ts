import useSWR from 'swr';
import { checkConnections } from '@/services/api';

interface ConnectionStatus {
  trello: boolean;
  asana: boolean;
}

export function useConnections() {
  const { 
    data, 
    error, 
    isLoading,
    mutate 
  } = useSWR<ConnectionStatus>('connections', checkConnections, {
    refreshInterval: 60000, // Verifica as conexões a cada minuto
  });

  return {
    isConnected: {
      trello: data?.trello ?? false,
      asana: data?.asana ?? false,
    },
    error,
    isLoading,
    refresh: mutate,
  };
} 