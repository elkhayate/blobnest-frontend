import { Activity, Download, Upload, Trash2 } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityMetricsProps {
  metrics: {
    uploads: number;
    downloads: number;
    deletions: number;
    totalOperations: number;
  };
}

const stats = [
  {
    title: 'Uploads',
    key: 'uploads',
    icon: Upload,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    title: 'Downloads',
    key: 'downloads',
    icon: Download,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  {
    title: 'Deletions',
    key: 'deletions',
    icon: Trash2,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  {
    title: 'Total Operations',
    key: 'totalOperations',
    icon: Activity,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
];
 

export function ActivityMetrics({ metrics }: ActivityMetricsProps) {

  return (
    <>
      <CardHeader className="flex flex-row items-center gap-2 pb-3">
        <Activity className="h-4 w-4 text-primary" />
        <CardTitle className="text-lg">Activity Metrics</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div 
              key={stat.key} 
              className={`group relative overflow-hidden rounded-lg border ${stat.border} ${stat.bg} p-3 transition-all hover:shadow-sm hover:scale-[1.02]`}
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg ${stat.bg} p-2 ring-1 ring-inset ${stat.border}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground mb-1 truncate">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground leading-none">
                    {metrics[stat.key as keyof typeof metrics].toLocaleString()}
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