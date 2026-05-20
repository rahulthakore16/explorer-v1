import { describe, expect, it } from 'vitest';

import {
  formatCurrencies,
  formatLanguages,
  formatPopulation,
  getCapital,
} from './formatters';

describe('formatPopulation', () => {
  it('formats large numbers with commas', () => {
    expect(formatPopulation(1380004385)).toBe('1,380,004,385');
  });

  it('formats zero', () => {
    expect(formatPopulation(0)).toBe('0');
  });

  it('formats small numbers without commas', () => {
    expect(formatPopulation(500)).toBe('500');
  });
});

describe('formatCurrencies', () => {
  it('returns N/A for undefined', () => {
    expect(formatCurrencies(undefined)).toBe('N/A');
  });

  it('returns N/A for empty object', () => {
    expect(formatCurrencies({})).toBe('N/A');
  });

  it('formats single currency with symbol', () => {
    expect(
      formatCurrencies({ INR: { name: 'Indian Rupee', symbol: '₹' } })
    ).toBe('Indian Rupee (₹)');
  });

  it('formats currency without symbol', () => {
    expect(
      formatCurrencies({ XYZ: { name: 'Some Currency' } })
    ).toBe('Some Currency');
  });

  it('formats multiple currencies', () => {
    const result = formatCurrencies({
      USD: { name: 'US Dollar', symbol: '$' },
      EUR: { name: 'Euro', symbol: '€' },
    });
    expect(result).toContain('US Dollar ($)');
    expect(result).toContain('Euro (€)');
  });
});

describe('formatLanguages', () => {
  it('returns N/A for undefined', () => {
    expect(formatLanguages(undefined)).toBe('N/A');
  });

  it('returns N/A for empty object', () => {
    expect(formatLanguages({})).toBe('N/A');
  });

  it('formats single language', () => {
    expect(formatLanguages({ jpn: 'Japanese' })).toBe('Japanese');
  });

  it('formats multiple languages comma-separated', () => {
    expect(formatLanguages({ hin: 'Hindi', eng: 'English' })).toBe(
      'Hindi, English'
    );
  });
});

describe('getCapital', () => {
  it('returns first capital from array', () => {
    expect(getCapital(['New Delhi'])).toBe('New Delhi');
  });

  it('returns first when multiple capitals exist', () => {
    expect(getCapital(['Colombo', 'Sri Jayawardenepura Kotte'])).toBe('Colombo');
  });

  it('returns N/A for undefined', () => {
    expect(getCapital(undefined)).toBe('N/A');
  });

  it('returns N/A for empty array', () => {
    expect(getCapital([])).toBe('N/A');
  });
});
