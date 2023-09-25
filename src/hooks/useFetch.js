import { useState, useEffect } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // A flag to track if the component is mounted

    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!isMounted) {
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (!isMounted) {
          return;
        }

        setData(result);
        setLoading(false);
      } catch (error) {
        if (!isMounted) {
          return;
        }
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}