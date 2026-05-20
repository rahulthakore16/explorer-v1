import type { Country } from '../../types';
import { formatCurrencies, formatLanguages, formatPopulation, getCapital } from '../../utils/formatters';

import styles from './ComparisonModal.module.css';

interface ComparisonModalProps {
  countries: Country[];
  onClear: () => void;
}

export function ComparisonModal({ countries, onClear }: ComparisonModalProps) {
  if (countries.length < 2) return null;

  const maxPop = Math.max(...countries.map((c) => c.population));

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>COMPARING {countries.length} COUNTRIES</span>
        <button className={styles.clearBtn} onClick={onClear} type="button">
          CLEAR
        </button>
      </div>
      <div className={styles.grid}>
        {countries.map((country) => (
          <div key={country.name.common} className={styles.column}>
            <h3 className={styles.countryName}>{country.name.common}</h3>
            <div className={styles.stat}>
              <span className={styles.label}>POPULATION</span>
              <span className={styles.value}>{formatPopulation(country.population)}</span>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{ width: `${(country.population / maxPop) * 100}%` }}
                />
              </div>
            </div>
            <div className={styles.stat}>
              <span className={styles.label}>CAPITAL</span>
              <span className={styles.value}>{getCapital(country.capital)}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.label}>CURRENCY</span>
              <span className={styles.value}>{formatCurrencies(country.currencies)}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.label}>LANGUAGES</span>
              <span className={styles.value}>{formatLanguages(country.languages)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
