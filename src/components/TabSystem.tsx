import React from 'react';

interface TabProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabSystem: React.FC<TabProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        className={`px-6 py-2 rounded-lg transition-colors ${
          activeTab === 'daily' ? 'tab-active' : 'bg-gray-100 hover:bg-gray-200'
        }`}
        onClick={() => onTabChange('daily')}
      >
        Daily Overview
      </button>
      <button
        className={`px-6 py-2 rounded-lg transition-colors ${
          activeTab === 'hourly' ? 'tab-active' : 'bg-gray-100 hover:bg-gray-200'
        }`}
        onClick={() => onTabChange('hourly')}
      >
        Hourly Analysis
      </button>
    </div>
  );
};