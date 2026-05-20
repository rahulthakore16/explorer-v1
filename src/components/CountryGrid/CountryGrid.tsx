import { useMemo } from 'react';

import type { Country } from '../../types';
import { CountryCard } from '../CountryCard';

import styles from './CountryGrid.module.css';

interface CountryGridProps {
  countries: Country[];
  searchTerm?: string;
  onCompare?: (country: Country) => void;
  selectedCountries?: Country[];
}

export function CountryGrid({ countries, searchTerm = '', onCompare, selectedCountries = [] }: CountryGridProps) {
  const maxPopulation = useMemo(
    () => Math.max(...countries.map((c) => c.population), 1),
    [countries]
  );

  if (countries.length === 0) {
    return (
      <div className={styles.empty}>
        <p>NO COUNTRIES FOUND</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {countries.map((country, index) => (
        <CountryCard
          key={country.name.common}
          country={country}
          index={index}
          searchTerm={searchTerm}
          maxPopulation={maxPopulation}
          onCompare={onCompare}
          isSelected={selectedCountries.some((c) => c.name.common === country.name.common)}
        />
      ))}
    </div>
  );
}
