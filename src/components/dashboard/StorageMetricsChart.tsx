import {   CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useRef, useEffect } from 'react';

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

export function StorageMetricsChart({ metrics }: StorageMetricsChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  // Responsive chart sizing
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.style.height = '100%';
      chartRef.current.style.maxHeight = '400px';
      chartRef.current.style.width = '100%';
    }
  }, []);

  const data = {
    labels: metrics.size.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: 'Storage Size',
        data: metrics.size,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Uploads',
        data: metrics.uploads,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
      {
        label: 'Downloads',
        data: metrics.downloads,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Deletions',
        data: metrics.deletions,
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Storage Metrics Over Time',
      },
    },
    layout: {
      padding: 16,
    },
    scales: {
      x: {
        ticks: { color: '#A3A3A3' },
        grid: { color: 'rgba(163,163,163,0.1)' },
      },
      y: {
        ticks: { color: '#A3A3A3' },
        grid: { color: 'rgba(163,163,163,0.1)' },
      },
    },
  };

  return (
    <div ref={chartRef} className="w-full h-[320px] md:h-[400px] lg:h-[440px]">
      <CardHeader>
        <CardTitle>Storage Metrics</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <div className="relative h-full w-full">
          <Line data={data} options={options} className="!h-full !w-full" />
        </div>
      </CardContent>
    </div>
  );
} 