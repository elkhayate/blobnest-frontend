import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { DashboardErrorBoundary } from '@/components/dashboard/DashboardErrorBoundary';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <DashboardErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardContent />
      </Suspense>
    </DashboardErrorBoundary>
  );
} 