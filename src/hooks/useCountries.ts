import { useEffect, useRef, useState } from 'react';

import { TIMEOUTS } from '../config/constants';
import { fetchAllCountries } from '../services/countryService';
import type { Country } from '../types';

interface UseCountriesReturn {
  countries: Country[];
  loading: boolean;
  error: string | null;
  isSlowLoad: boolean;
  retry: () => void;
}

export function useCountries(): UseCountriesReturn {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSlowLoad, setIsSlowLoad] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setIsSlowLoad(false);

    const slowTimer = setTimeout(() => {
      setIsSlowLoad(true);
    }, TIMEOUTS.SLOW_LOAD_MS);

    const abortTimer = setTimeout(() => {
      controller.abort();
      setError('Request timed out. Please check your connection and try again.');
      setLoading(false);
    }, TIMEOUTS.ABORT_MS);

    fetchAllCountries(controller.signal)
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.name === 'AbortError') return;
        setError(err.message || 'An unexpected error occurred.');
        setLoading(false);
      })
      .finally(() => {
        clearTimeout(slowTimer);
        clearTimeout(abortTimer);
      });

    return () => {
      controller.abort();
      clearTimeout(slowTimer);
      clearTimeout(abortTimer);
    };
  }, [fetchKey]);

  const retry = () => setFetchKey((prev) => prev + 1);

  return { countries, loading, error, isSlowLoad, retry };
}
