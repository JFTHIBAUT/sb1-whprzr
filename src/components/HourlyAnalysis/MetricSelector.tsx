import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers,
  faPersonWalking,
  faPercent,
  faMars,
  faVenus,
  faUserGroup,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

interface MetricSelectorProps {
  selectedMetric: string;
  onMetricChange: (metric: string) => void;
}

const metrics = [
  { id: 'customers', label: 'Customers', icon: faUsers },
  { id: 'passersby', label: 'Passersby', icon: faPersonWalking },
  { id: 'captureRate', label: 'Capture Rate', icon: faPercent },
  { id: 'men', label: 'Men', icon: faMars },
  { id: 'women', label: 'Women', icon: faVenus },
  { id: 'group', label: 'Group', icon: faUserGroup },
  { id: 'customersLive', label: 'Live Customers', icon: faChartLine },
];

export const MetricSelector: React.FC<MetricSelectorProps> = ({
  selectedMetric,
  onMetricChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Select Metric</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {metrics.map(metric => (
          <button
            key={metric.id}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              selectedMetric === metric.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => onMetricChange(metric.id)}
          >
            <FontAwesomeIcon icon={metric.icon} />
            <span>{metric.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};