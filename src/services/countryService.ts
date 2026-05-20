
import { ENDPOINTS } from '../config/constants';
import type { Country } from '../types';

export async function fetchAllCountries(
  signal?: AbortSignal
): Promise<Country[]> {
  const response = await fetch(ENDPOINTS.ALL_COUNTRIES, { signal });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch countries (HTTP ${response.status}: ${response.statusText})`
    );
  }

  const data: Country[] = await response.json();
  return data;
}
