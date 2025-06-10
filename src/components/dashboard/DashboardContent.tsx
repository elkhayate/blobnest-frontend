import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetDashboardStats, useGetStorageMetrics } from '@/api/dashboard/queries';
import type { TimeRange } from '@/types/dashboard';
import { OverviewStats } from './OverviewStats';
import { ContainerStats } from './ContainerStats';
import { ActivityMetrics } from './ActivityMetrics';
import { StorageMetricsChart } from './StorageMetricsChart';
import { LoadingSpinner } from '../ui/loading-spinner';
import { Card } from '@/components/ui/card';

export function DashboardContent() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  const { data: dashboardStats, isLoading: isLoadingStats } = useGetDashboardStats(timeRange);
  const { data: storageMetrics, isLoading: isLoadingMetrics } = useGetStorageMetrics(timeRange);

  if (isLoadingStats || isLoadingMetrics) {
    return <LoadingSpinner />;
  }

  if (!dashboardStats || !storageMetrics) {
    throw new Error('Error loading dashboard data');
  }

  return (
    <div className="container mx-auto px-1 py-1 md:px-4 md:py-4">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor your storage metrics and activity
          </p>
        </div>
        <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 hours</SelectItem>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="year">Last 365 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <div className="grid gap-4 md:grid-cols-2 p-4">
          <Card className="rounded-md border bg-background p-4 md:p-6">
            <StorageMetricsChart metrics={storageMetrics} />
          </Card>
          <Card className="rounded-md border bg-background p-4 md:p-6">
            <OverviewStats overview={dashboardStats.overview} />
          </Card>
          <Card className="rounded-md border bg-background p-4 md:p-6">
            <ActivityMetrics metrics={dashboardStats.activityMetrics} />
          </Card>
          <Card className="rounded-md border bg-background p-4 md:p-6">
            <ContainerStats containers={dashboardStats.containerStats} />
          </Card>

        </div>
      </div>
    </div>
  );
}