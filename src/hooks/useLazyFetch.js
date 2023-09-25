import { useState } from 'react';

function useLazyFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuery = async (url, options={}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return [fetchQuery, { data, loading, error }];
}

export default useLazyFetch
