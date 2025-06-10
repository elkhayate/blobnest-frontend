import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatBytes } from '@/lib/utils';
import type { ContainerStat } from '@/types/dashboard';
import { Database, File, Calendar } from 'lucide-react';

interface ContainerStatsProps {
  containers: ContainerStat[];
}

export function ContainerStats({ containers }: ContainerStatsProps) {
  return (
    <>
      <CardHeader className="flex flex-row items-center gap-2 pb-3">
        <Database className="h-4 w-4 text-primary" />
        <CardTitle className="text-lg">Container Statistics</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {containers.map((container) => (
            <div
              key={container.name}
              className="group relative overflow-hidden rounded-lg border bg-card p-3 transition-all hover:bg-accent/50 hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground truncate mb-2">
                    {container.name}
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <File className="h-3 w-3 flex-shrink-0" />
                      <span className="font-medium">{container.fileCount}</span>
                      <span>files</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Database className="h-3 w-3 flex-shrink-0" />
                      <span className="font-medium">{formatBytes(container.totalSize)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-3">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wide">Last modified</div>
                    <div className="font-medium">
                      {container.lastModified 
                        ? new Date(container.lastModified).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        : 'No activity'
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
} 