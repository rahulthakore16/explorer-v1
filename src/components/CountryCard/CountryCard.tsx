import { useEffect, useRef, useState } from 'react';

import type { Country } from '../../types';
import {
  formatCurrencies,
  formatLanguages,
  formatPopulation,
  getCapital,
} from '../../utils/formatters';
import { highlightText } from '../../utils/highlightText';

import styles from './CountryCard.module.css';

interface CountryCardProps {
  country: Country;
  index: number;
  searchTerm?: string;
  maxPopulation?: number;
  onCompare?: (country: Country) => void;
  isSelected?: boolean;
}

export function CountryCard({ country, index, searchTerm = '', maxPopulation = 1, onCompare, isSelected = false }: CountryCardProps) {
  const isEven = index % 2 === 1;
  const indexLabel = String(index + 1).padStart(2, '0');
  const densityPercent = (country.population / maxPopulation) * 100;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      data-country-index={index}
      className={`${styles.card} ${isEven ? styles.cardReversed : ''} ${isVisible ? styles.visible : styles.hidden}`}
    >
      <div className={`${styles.info} ${isEven ? styles.infoReversed : ''}`}>
        <h2 className={styles.name}>
          {highlightText(country.name.common, searchTerm, styles.highlight)}
        </h2>
        <span className={styles.indexLabel}>{indexLabel}.</span>
        <div className={styles.dataGrid}>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Population</span>
            <span className={styles.dataValue}>{formatPopulation(country.population)}</span>
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Capital</span>
            <span className={styles.dataValue}>{getCapital(country.capital)}</span>
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Currency</span>
            <span className={styles.dataValue}>{formatCurrencies(country.currencies)}</span>
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Languages</span>
            <span className={styles.dataValue}>{formatLanguages(country.languages)}</span>
          </div>
        </div>
        <div className={styles.densityBar}>
          <div className={styles.densityFill} style={{ width: `${densityPercent}%` }} />
        </div>
        {onCompare && (
          <button
            className={`${styles.compareBtn} ${isSelected ? styles.compareBtnActive : ''}`}
            onClick={() => onCompare(country)}
            type="button"
          >
            {isSelected ? 'SELECTED' : 'COMPARE'}
          </button>
        )}
      </div>
      <div className={styles.imageContainer}>
        <img
          className={styles.flag}
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          loading="lazy"
        />
      </div>
    </article>
  );
}
