import { FALLBACK_TEXT } from '../config/constants';
import type { Country } from '../types';

export function formatPopulation(population: number): string {
  return population.toLocaleString();
}

export function formatCurrencies(
  currencies: Country['currencies']
): string {
  if (!currencies) return FALLBACK_TEXT;

  const entries = Object.values(currencies);
  if (entries.length === 0) return FALLBACK_TEXT;

  return entries
    .map((c) => (c.symbol ? `${c.name} (${c.symbol})` : c.name))
    .join(', ');
}

export function formatLanguages(languages: Country['languages']): string {
  if (!languages) return FALLBACK_TEXT;

  const values = Object.values(languages);
  if (values.length === 0) return FALLBACK_TEXT;

  return values.join(', ');
}

export function getCapital(capital: string[] | undefined): string {
  if (!capital || capital.length === 0) return FALLBACK_TEXT;
  return capital[0] ?? FALLBACK_TEXT;
}
