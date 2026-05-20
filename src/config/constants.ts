export const API_BASE_URL = 'https://restcountries.com/v3.1';

export const ENDPOINTS = {
  ALL_COUNTRIES: `${API_BASE_URL}/all?fields=name,capital,population,currencies,languages,flags,region`,
} as const;

export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;
export type Region = (typeof REGIONS)[number];
export const DEFAULT_REGION: Region = 'Asia';

export const TIMEOUTS = {
  SLOW_LOAD_MS: 5000,
  ABORT_MS: 15000,
} as const;

export const FALLBACK_TEXT = 'N/A' as const;
