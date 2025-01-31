import useSWR from 'swr';
// import { getDashboardData } from '@/services/api';
import { DashboardData } from '@/types/dashboard';

export function useDashboard() {
  // const { 
  //   data, 
  //   error, 
  //   isLoading, 
  //   mutate: refresh 
  // } = useSWR<DashboardData>('dashboard', getDashboardData, {
  //   refreshInterval: 30000, // Atualiza a cada 30 segundos
  // });

  return {
    // data,
    // error,
    // isLoading,
    // refresh,
  };
} 