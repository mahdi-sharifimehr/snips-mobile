import { useEffect, useState } from 'react';
import { fetchJson } from '../services/api';
import { HOME_URL } from '../services/endpoints';
import type { HomeApiResponse } from '../services/types';

export function useHomeData() {
  const [data, setData] = useState<HomeApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await fetchJson<HomeApiResponse>(HOME_URL);
        if (isMounted) {
          setData(response);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load home data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
