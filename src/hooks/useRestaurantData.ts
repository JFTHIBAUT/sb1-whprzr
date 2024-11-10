import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { parse } from 'date-fns';
import type { RestaurantData } from '../types';

export const useRestaurantData = () => {
  const [data, setData] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/JFTHIBAUT/Xki/main/xdatax.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          complete: (results) => {
            const parsedData: RestaurantData[] = results.data
              .slice(1) // Skip header row
              .filter((row: any[]) => row.length === 14 && row[0]) // Ensure complete rows and valid date
              .map((row: any[]) => {
                try {
                  const timestamp = parse(row[0], 'MM/dd/yyyy H:mm', new Date());
                  
                  // Validate if the date is valid
                  if (isNaN(timestamp.getTime())) {
                    console.warn(`Invalid date found: ${row[0]}`);
                    return null;
                  }

                  return {
                    timestamp,
                    customers: Number(row[1]) || 0,
                    customersOut: Number(row[2]) || 0,
                    men: Number(row[3]) || 0,
                    menOut: Number(row[4]) || 0,
                    women: Number(row[5]) || 0,
                    womenOut: Number(row[6]) || 0,
                    group: Number(row[7]) || 0,
                    groupOut: Number(row[8]) || 0,
                    passersby: Number(row[9]) || 0,
                    aCustomers: Number(row[10]) || 0,
                    aCustomersOut: Number(row[11]) || 0,
                    customersLive: Number(row[12]) || 0,
                    dwelltime: row[13] || '0:00'
                  };
                } catch (err) {
                  console.warn(`Error parsing row:`, row, err);
                  return null;
                }
              })
              .filter((row): row is RestaurantData => row !== null);

            setData(parsedData);
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};