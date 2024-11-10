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
import type { RestaurantData } from '../../types';
import { format } from 'date-fns';

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

interface DailyChartProps {
  data: RestaurantData[];
}

export const DailyChart: React.FC<DailyChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => format(d.timestamp, 'MM/dd/yyyy')),
    datasets: [
      {
        type: 'bar' as const,
        label: 'Customers',
        data: data.map(d => d.customers),
        backgroundColor: '#2f7622',
        yAxisID: 'customers',
      },
      {
        type: 'line' as const,
        label: 'Passersby',
        data: data.map(d => d.passersby),
        borderColor: '#f39700',
        yAxisID: 'passersby',
      },
      {
        type: 'line' as const,
        label: 'Capture Rate (%)',
        data: data.map(d => (d.customers / d.passersby) * 100),
        borderColor: '#c5d469',
        yAxisID: 'percentage',
      },
      {
        type: 'line' as const,
        label: 'Dwell Time (min)',
        data: data.map(d => {
          const [hours, minutes] = d.dwelltime.split(':').map(Number);
          return hours * 60 + minutes;
        }),
        borderColor: '#666666',
        yAxisID: 'time',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      customers: {
        type: 'linear' as const,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Customers',
        },
      },
      passersby: {
        type: 'linear' as const,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Passersby',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      percentage: {
        type: 'linear' as const,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Capture Rate (%)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      time: {
        type: 'linear' as const,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Dwell Time (min)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Performance Metrics',
      },
    },
  };

  return (
    <div className="chart-container">
      <Chart type="bar" data={chartData} options={options} />
      <div className="mt-4 flex justify-center space-x-4">
        {data.map((d, i) => (
          <div key={i} className="text-center">
            <span className="text-2xl">{d.weather?.weatherEmoji}</span>
            <span className="text-sm block">{format(d.timestamp, 'MM/dd')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};