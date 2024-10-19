// src/hooks/usePolling.js
import { useEffect, useState } from 'react';

const usePolling = (fetchData, interval) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataWithPolling = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (err) {
        setError(err);
      }
    };

    // Fetch data immediately on mount
    fetchDataWithPolling();

    // Set up the polling interval
    const pollingInterval = setInterval(fetchDataWithPolling, interval);

    // Cleanup on component unmount
    return () => clearInterval(pollingInterval);
  }, [fetchData, interval]);

  return { data, error };
};

export default usePolling;
