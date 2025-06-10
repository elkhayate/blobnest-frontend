import {  CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatBytes } from '@/lib/utils';
import type { ContainerStat } from '@/types/dashboard';
import { Database } from 'lucide-react';

interface ContainerStatsProps {
  containers: ContainerStat[];
}

export function ContainerStats({ containers }: ContainerStatsProps) {
  return (
    <div className="space-y-4">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Database className="h-5 w-5 text-primary" />
        <CardTitle>Container Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {containers.map((container) => (
            <div
              key={container.name}
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{container.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{container.fileCount} files</span>
                  <span>•</span>
                  <span>{formatBytes(container.totalSize)}</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {container.lastModified ? (
                  <div className="flex items-center gap-2">
                    <span>Last modified:</span>
                    <span>{new Date(container.lastModified).toLocaleDateString()}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground/70">No activity</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  );
} 