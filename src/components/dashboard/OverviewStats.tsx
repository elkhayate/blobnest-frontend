import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatBytes } from '@/lib/utils';
import { Database, FileText, HardDrive, Clock, Users, Info, TrendingUp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OverviewStatsProps {
  overview: {
    totalContainers: number;
    totalFiles: number;
    totalSize: number;
    lastUpdated: string;
    totalUsers: number;
    fileTypes: string[];
    totalFileTypes: number;
  };
}

export function OverviewStats({ overview }: OverviewStatsProps) {
  const stats = [
    {
      title: 'Containers',
      value: overview.totalContainers.toLocaleString(),
      icon: Database,
      description: 'Active storage containers',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      title: 'Files',
      value: overview.totalFiles.toLocaleString(),
      icon: FileText,
      description: 'Files stored across containers',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
    },
    {
      title: 'Storage',
      value: formatBytes(overview.totalSize),
      icon: HardDrive,
      description: 'Combined storage size',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    {
      title: 'Users',
      value: overview.totalUsers.toLocaleString(),
      icon: Users,
      description: 'Total number of users',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
    },
    {
      title: 'File Types',
      value: overview.totalFileTypes.toLocaleString(),
      icon: FileText,
      description: 'Unique file formats',
      tooltip: overview.fileTypes.join(', '),
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
    },
    {
      title: 'Last Updated',
      value: new Date(overview.lastUpdated).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
      icon: Clock,
      description: 'Latest data refresh',
      color: 'text-gray-500',
      bg: 'bg-gray-500/10',
      border: 'border-gray-500/20',
    },
  ];

  return (
    <>
      <CardHeader className="flex flex-row items-center gap-2 pb-3">
        <TrendingUp className="h-4 w-4 text-primary" />
        <CardTitle className="text-lg">Overview Stats</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`group relative overflow-hidden rounded-lg border ${stat.border} ${stat.bg} p-3 transition-all hover:shadow-sm hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-3">
                <div className={`rounded-lg ${stat.bg} p-2 ring-1 ring-inset ${stat.border}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <p className="text-xs font-medium text-muted-foreground truncate">
                      {stat.title}
                    </p>
                    {stat.tooltip && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground hover:text-primary cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-xs">{stat.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <p className="text-lg font-bold text-foreground leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
}