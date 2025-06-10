import { useQuery } from '@tanstack/react-query';
import api from '../api';
import type { DashboardStats, StorageMetrics, ContainerMetrics, TimeRange } from '@/types/dashboard';

export const useGetDashboardStats = (timeRange: TimeRange = 'week') => {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats', timeRange],
    queryFn: async () => {
      const { data } = await api.get(`/dashboard/stats?timeRange=${timeRange}`);
      return data;
    },
  });
};

export const useGetStorageMetrics = (timeRange: TimeRange = 'week') => {
  return useQuery<StorageMetrics>({
    queryKey: ['dashboard', 'storage', 'metrics', timeRange],
    queryFn: async () => {
      const { data } = await api.get(`/dashboard/storage/metrics?timeRange=${timeRange}`);
      return data;
    },
  });
};

export const useGetContainerMetrics = (containerName: string, timeRange: TimeRange = 'week') => {
  return useQuery<ContainerMetrics>({
    queryKey: ['dashboard', 'container', 'metrics', containerName, timeRange],
    queryFn: async () => {
      const { data } = await api.get(`/dashboard/container/metrics?containerName=${containerName}&timeRange=${timeRange}`);
      return data;
    },
    enabled: !!containerName,
  });
}; 