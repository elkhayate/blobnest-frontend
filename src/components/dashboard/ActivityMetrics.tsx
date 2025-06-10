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
  },
  {
    title: 'Downloads',
    key: 'downloads',
    icon: Download,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    title: 'Deletions',
    key: 'deletions',
    icon: Trash2,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  {
    title: 'Total Operations',
    key: 'totalOperations',
    icon: Activity,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
];

export function ActivityMetrics({ metrics }: ActivityMetricsProps) {
  return (
    <div className="space-y-4">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Activity className="h-5 w-5 text-primary" />
        <CardTitle>Activity Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border rounded-xl overflow-hidden bg-background shadow">
          {stats.map((stat) => (
            <li key={stat.key} className="flex items-center gap-4 px-6 py-6">
              <div className={`rounded-xl ${stat.bg} p-3`}>
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-base font-medium text-muted-foreground mb-1">{stat.title}</p>
                <span className="text-3xl font-extrabold text-foreground">
                  {metrics[stat.key as keyof typeof metrics]}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </div>
  );
}