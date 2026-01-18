import { useEffect, useState } from 'react';
import { fetchJson } from '../services/api';
import { FEED_URL } from '../services/endpoints';
import type { FeedApiResponse } from '../services/types';

export function useFeedData() {
  const [data, setData] = useState<FeedApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await fetchJson<FeedApiResponse>(FEED_URL);
        if (isMounted) {
          setData(response);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load feed data');
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
