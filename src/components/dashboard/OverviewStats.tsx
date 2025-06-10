import { Card, CardContent } from '@/components/ui/card';
import { formatBytes } from '@/lib/utils';
import { Database, FileText, HardDrive, Clock, Users, Info } from 'lucide-react';
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
      title: 'Total Containers',
      value: overview.totalContainers,
      icon: Database,
      description: 'Active storage containers',
    },
    {
      title: 'Total Files',
      value: overview.totalFiles,
      icon: FileText,
      description: 'Files stored across containers',
    },
    {
      title: 'Total Size',
      value: formatBytes(overview.totalSize),
      icon: HardDrive,
      description: 'Combined storage size',
    },
    {
      title: 'Last Updated',
      value: new Date(overview.lastUpdated).toLocaleDateString(),
      icon: Clock,
      description: 'Latest data refresh',
    },
    {
      title: 'Total Users',
      value: overview.totalUsers,
      icon: Users,
      description: 'Total number of users',
    },
    {
      title: 'Total File Types',
      value: overview.totalFileTypes,
      icon: FileText,
      description: 'Total number of file types',
      tooltip: overview.fileTypes.join(', '),
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden h-full">
          <CardContent className="p-6 h-full">
            <div className="flex items-center gap-4 h-full">
              <div className="rounded-lg bg-primary/10 p-2">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  {stat.tooltip && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground hover:text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{stat.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}