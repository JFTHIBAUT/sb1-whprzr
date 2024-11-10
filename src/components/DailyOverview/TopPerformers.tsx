import React from 'react';
import { format } from 'date-fns';
import type { RestaurantData } from '../../types';

interface TopPerformersProps {
  data: RestaurantData[];
}

export const TopPerformers: React.FC<TopPerformersProps> = ({ data }) => {
  const topCustomers = [...data]
    .sort((a, b) => b.customers - a.customers)
    .slice(0, 3);

  const topCaptureRate = [...data]
    .sort((a, b) => (b.customers / b.passersby) - (a.customers / a.passersby))
    .slice(0, 3);

  return (
    <div className="grid grid-cols-2 gap-6 mt-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Top Customer Days</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header rounded-tl-lg">Date</th>
              <th className="table-header">Customers</th>
              <th className="table-header rounded-tr-lg">Weather</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((day, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="table-cell">{format(day.timestamp, 'MM/dd/yyyy')}</td>
                <td className="table-cell text-right">{day.customers}</td>
                <td className="table-cell text-center">{day.weather?.weatherEmoji}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Top Capture Rate Days</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header rounded-tl-lg">Date</th>
              <th className="table-header">Rate</th>
              <th className="table-header rounded-tr-lg">Weather</th>
            </tr>
          </thead>
          <tbody>
            {topCaptureRate.map((day, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="table-cell">{format(day.timestamp, 'MM/dd/yyyy')}</td>
                <td className="table-cell text-right">
                  {((day.customers / day.passersby) * 100).toFixed(1)}%
                </td>
                <td className="table-cell text-center">{day.weather?.weatherEmoji}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};