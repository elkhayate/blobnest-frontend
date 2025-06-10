export type TimeRange = 'day' | 'week' | 'month' | 'year';

export interface DashboardStats {
  overview: {
    totalContainers: number;
    totalFiles: number;
    totalSize: number;
    lastUpdated: string;
    totalUsers: number;
    fileTypes: string[];
    totalFileTypes: number;
  };
  containerStats: ContainerStat[];
  activityMetrics: {
    uploads: number;
    downloads: number;
    deletions: number;
    totalOperations: number;
  };
  recentActivity: any[];
  changeFeedEnabled: boolean;
}

export interface ContainerStat {
  name: string;
  fileCount: number;
  totalSize: number;
  lastModified: string | null;
}

export interface StorageMetrics {
  uploads: any[];
  downloads: any[];
  deletions: any[];
  size: any[];
}

export interface ContainerMetrics {
  currentStats: {
    totalFiles: number;
    totalSize: number;
    lastModified: string;
  };
  uploads: any[];
  downloads: any[];
  deletions: any[];
  size: any[];
  fileTypes: any[];
} 