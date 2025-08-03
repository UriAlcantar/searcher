"use client";

import { useEffect, useState } from 'react';

interface Character {
  id: number;
  name: string;
  image: string;
}

export function useCatalog(endpoint: string) {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => setData(json.results))
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
}