import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { format } from 'date-fns';
import type { RestaurantData } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HourlyChartProps {
  data: RestaurantData[];
  selectedMetric: string;
  benchmarkData?: RestaurantData[];
}

const metricConfigs = {
  customers: { label: 'Customers', color: '#2f7622' },
  passersby: { label: 'Passersby', color: '#f39700' },
  captureRate: { label: 'Capture Rate', color: '#c5d469' },
  men: { label: 'Men', color: '#4299e1' },
  women: { label: 'Women', color: '#ed64a6' },
  group: { label: 'Group', color: '#9f7aea' },
  customersLive: { label: 'Live Customers', color: '#48bb78' }
};

export const HourlyChart: React.FC<HourlyChartProps> = ({ 
  data, 
  selectedMetric,
  benchmarkData 
}) => {
  const getMetricValue = (item: RestaurantData, metric: string) => {
    if (metric === 'captureRate') {
      return (item.customers / item.passersby) * 100;
    }
    return item[metric as keyof RestaurantData] as number;
  };

  const chartData = {
    labels: data.map(d => format(d.timestamp, 'HH:mm')),
    datasets: [
      {
        label: `${metricConfigs[selectedMetric as keyof typeof metricConfigs].label}`,
        data: data.map(d => getMetricValue(d, selectedMetric)),
        backgroundColor: metricConfigs[selectedMetric as keyof typeof metricConfigs].color,
        borderColor: metricConfigs[selectedMetric as keyof typeof metricConfigs].color,
        type: 'bar' as const,
      },
      ...(benchmarkData ? [{
        label: `${metricConfigs[selectedMetric as keyof typeof metricConfigs].label} (Benchmark)`,
        data: benchmarkData.map(d => getMetricValue(d, selectedMetric)),
        borderColor: '#666666',
        borderDash: [5, 5],
        type: 'line' as const,
      }] : [])
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Hourly Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: selectedMetric === 'captureRate' ? 'Percentage (%)' : 'Count',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};