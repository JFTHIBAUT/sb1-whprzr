import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faPercent, 
  faVenusMars, 
  faClock, 
  faCheckDouble 
} from '@fortawesome/free-solid-svg-icons';
import type { DailyMetrics } from '../../types';

interface MetricsTableProps {
  metrics: DailyMetrics[];
}

export const MetricsTable: React.FC<MetricsTableProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="table-header">Date</th>
            <th className="table-header">
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Customers
            </th>
            <th className="table-header">
              <FontAwesomeIcon icon={faPercent} className="mr-2" />
              Capture Rate
            </th>
            <th className="table-header">
              <FontAwesomeIcon icon={faVenusMars} className="mr-2" />
              Gender Distribution
            </th>
            <th className="table-header">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              Dwell Time
            </th>
            <th className="table-header">
              <FontAwesomeIcon icon={faCheckDouble} className="mr-2" />
              Data Accuracy
            </th>
            <th className="table-header">Weather</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="table-cell">
                {metric.date.toLocaleDateString()}
              </td>
              <td className="table-cell text-right">
                {metric.customers}
              </td>
              <td className="table-cell text-right">
                {metric.captureRate.toFixed(1)}%
              </td>
              <td className="table-cell">
                <div className="flex items-center justify-between">
                  <span>♂️ {metric.genderDistribution.men.toFixed(1)}%</span>
                  <span>♀️ {metric.genderDistribution.women.toFixed(1)}%</span>
                </div>
              </td>
              <td className="table-cell text-right">
                {metric.dwellTime}
              </td>
              <td className="table-cell text-right">
                {metric.dataAccuracy.toFixed(1)}%
              </td>
              <td className="table-cell text-center text-2xl">
                {metric.weather.weatherEmoji}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};