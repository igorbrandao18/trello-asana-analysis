import { useQuery } from '@tanstack/react-query';
import { trelloService } from '@/services/trello';
import { asanaService } from '@/services/asana';

export type ConnectionStatus = 'checking' | 'connected' | 'error' | 'disconnected';

interface ConnectionTestResult {
  success: boolean;
  userData?: {
    id: string;
    name: string;
    email?: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

function getStatus(
  isLoading: boolean,
  isError: boolean,
  data: ConnectionTestResult | undefined,
  error: unknown
): ConnectionStatus {
  console.group('Connection Status Check');
  console.log('Loading:', isLoading);
  console.log('Error:', isError);
  console.log('Data:', data);
  console.log('Error object:', error);

  let status: ConnectionStatus;

  if (isLoading) {
    status = 'checking';
  } else if (isError) {
    console.error('Connection test error:', error);
    status = 'error';
  } else if (!data) {
    status = 'disconnected';
  } else if (!data.success) {
    console.error('Connection test failed:', data.error);
    status = 'error';
  } else {
    status = 'connected';
  }

  console.log('Final status:', status);
  console.groupEnd();
  return status;
}

export function useConnectionTest() {
  const trelloTest = useQuery({
    queryKey: ['trello-test'],
    queryFn: async () => {
      console.group('Trello Connection Test');
      try {
        const result = await trelloService.testConnection();
        console.log('Trello test result:', result);
        console.groupEnd();
        return {
          success: true,
          userData: result,
        };
      } catch (error) {
        console.error('Trello connection test failed:', error);
        console.groupEnd();
        return {
          success: false,
          error: {
            code: 'TRELLO_CONNECTION_ERROR',
            message: error instanceof Error ? error.message : 'Unknown error',
          },
        };
      }
    },
    retry: false,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const asanaTest = useQuery({
    queryKey: ['asana-test'],
    queryFn: async () => {
      console.group('Asana Connection Test');
      try {
        const result = await asanaService.testConnection();
        console.log('Asana test result:', result);
        console.groupEnd();
        return {
          success: true,
          userData: result,
        };
      } catch (error) {
        console.error('Asana connection test failed:', error);
        console.groupEnd();
        return {
          success: false,
          error: {
            code: 'ASANA_CONNECTION_ERROR',
            message: error instanceof Error ? error.message : 'Unknown error',
          },
        };
      }
    },
    retry: false,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const trelloStatus = getStatus(trelloTest.isLoading, trelloTest.isError, trelloTest.data, trelloTest.error);
  const asanaStatus = getStatus(asanaTest.isLoading, asanaTest.isError, asanaTest.data, asanaTest.error);

  console.group('Connection Status Summary');
  console.log('Trello Status:', trelloStatus);
  console.log('Asana Status:', asanaStatus);
  console.groupEnd();

  return {
    trelloStatus,
    asanaStatus,
    trelloData: trelloTest.data,
    asanaData: asanaTest.data,
    isLoading: trelloTest.isLoading || asanaTest.isLoading,
    error: trelloTest.error || asanaTest.error,
    retryTrello: trelloTest.refetch,
    retryAsana: asanaTest.refetch,
  };
} 