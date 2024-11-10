import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';

interface DateSelectionProps {
  startDate: Date;
  endDate: Date | null;
  benchmark: boolean;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date | null) => void;
  onBenchmarkChange: (checked: boolean) => void;
}

export const DateSelection: React.FC<DateSelectionProps> = ({
  startDate,
  endDate,
  benchmark,
  onStartDateChange,
  onEndDateChange,
  onBenchmarkChange,
}) => {
  return (
    <div className="flex items-center space-x-4 mb-6 bg-white p-4 rounded-xl shadow-lg">
      <div className="relative">
        <DatePicker
          selected={startDate}
          onChange={onStartDateChange}
          className="datepicker-input pr-10"
          dateFormat="MM/dd/yyyy"
        />
        <FontAwesomeIcon 
          icon={faCalendar} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="benchmark"
          checked={benchmark}
          onChange={(e) => onBenchmarkChange(e.target.checked)}
          className="custom-checkbox"
        />
        <label htmlFor="benchmark" className="text-sm font-medium">
          Benchmark
        </label>
      </div>

      {benchmark && (
        <>
          <FontAwesomeIcon icon={faArrowsLeftRight} className="text-gray-400" />
          <div className="relative">
            <DatePicker
              selected={endDate}
              onChange={onEndDateChange}
              className="datepicker-input pr-10"
              dateFormat="MM/dd/yyyy"
            />
            <FontAwesomeIcon 
              icon={faCalendar} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </>
      )}
    </div>
  );
};