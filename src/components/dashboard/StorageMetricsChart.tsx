import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { StorageMetrics } from '@/types/dashboard';
import { BarChart3 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StorageMetricsChartProps {
  metrics: StorageMetrics;
}

 
export function StorageMetricsChart({ metrics  }: StorageMetricsChartProps) {
  const data = {
    labels: metrics.size.map(item => 
      new Date(item.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    ),
    datasets: [
      {
        label: 'Storage Size (MB)',
        data: metrics.size.map(item => item.size / 1024 / 1024), 
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: true,
      },
      {
        label: 'Uploads',
        data: metrics.uploads.map(item => item.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgb(59, 130, 246, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Downloads',
        data: metrics.downloads.map(item => item.count),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgb(239, 68, 68, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Deletions',
        data: metrics.deletions.map(item => item.count),
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgb(245, 158, 11, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          padding: 15,
          font: {
            size: 11,
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'hsl(var(--popover))',
        titleColor: 'hsl(var(--popover-foreground))',
        bodyColor: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        bodySpacing: 4,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.datasetIndex === 0) {
              label += context.parsed.y.toFixed(1) + ' MB';
            } else {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    scales: {
      x: {
        ticks: { 
          color: 'hsl(var(--muted-foreground))',
          font: { size: 10 },
          maxTicksLimit: 6,
        },
        grid: { 
          color: 'hsl(var(--border))',
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: { 
          color: 'hsl(var(--muted-foreground))',
          font: { size: 10 },
          maxTicksLimit: 5,
        },
        grid: { 
          color: 'hsl(var(--border))',
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <CardHeader className="flex flex-row items-center gap-2 pb-3">
        <BarChart3 className="h-4 w-4 text-primary" />
        <CardTitle className="text-lg">Storage Metrics</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative h-[280px] w-full">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </>
  );
}