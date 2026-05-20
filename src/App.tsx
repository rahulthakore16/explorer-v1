import { useCallback, useMemo, useState } from 'react';

import { DEFAULT_REGION, type Region } from './config/constants';
import { ComparisonModal } from './components/ComparisonModal';
import { CountryGrid } from './components/CountryGrid';
import { ErrorMessage } from './components/ErrorMessage';
import { RegionFilter } from './components/RegionFilter';
import { ScrollToTop } from './components/ScrollToTop';
import { SearchBar } from './components/SearchBar';
import { SkeletonCard } from './components/SkeletonCard';
import { SortSelect, type SortOption } from './components/SortSelect';
import { useCountries } from './hooks/useCountries';
import { useTheme } from './hooks/useTheme';
import type { Country } from './types';

import styles from './App.module.css';

export function App() {
  const { countries, loading, error, retry } = useCountries();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState<Region>(DEFAULT_REGION);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const { theme, toggle: toggleTheme } = useTheme();
  const [compareList, setCompareList] = useState<Country[]>([]);

  const handleCompare = useCallback((country: Country) => {
    setCompareList((prev) => {
      const exists = prev.some((c) => c.name.common === country.name.common);
      if (exists) return prev.filter((c) => c.name.common !== country.name.common);
      if (prev.length >= 3) return prev;
      return [...prev, country];
    });
  }, []);

  const handleRandomCountry = () => {
    if (filteredCountries.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredCountries.length);
    const el = document.querySelector(`[data-country-index="${randomIndex}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const filteredCountries = useMemo(() => {
    let result = countries.filter((c) => c.region === activeRegion);
    const trimmed = searchTerm.trim().toLowerCase();
    if (trimmed) {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(trimmed)
      );
    }
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.common.localeCompare(b.name.common);
        case 'name-desc':
          return b.name.common.localeCompare(a.name.common);
        case 'pop-desc':
          return b.population - a.population;
        case 'pop-asc':
          return a.population - b.population;
      }
    });
    return result;
  }, [countries, searchTerm, activeRegion, sortBy]);

  return (
    <div className={styles.app}>
      <header className={styles.topNav}>
        <div className={styles.navInner}>
          <a className={styles.logo} href="#">EXPLORER</a>
          <nav className={styles.nav}>
            <a className={styles.navLink} href="#">REGIONS</a>
            <a className={styles.navLink} href="#">CULTURES</a>
            <a className={`${styles.navLink} ${styles.navLinkActive}`} href="#">ARCHIVE</a>
            <a className={styles.navLink} href="#">ABOUT</a>
          </nav>
          <div className={styles.headerActions}>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              type="button"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
            <span className={styles.searchLabel}>
              SEARCH
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>search</span>
            </span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>DIRECTORY</h1>
          <p className={styles.heroSubtitle}>
            An objective catalog of sovereign states within the Asian continent.
            Data is presented strictly for comparative analysis, devoid of narrative interpretation.
          </p>
        </section>

        <div className={styles.searchSection}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <div className={styles.filterSection}>
          <RegionFilter activeRegion={activeRegion} onChange={setActiveRegion} />
        </div>

        <div className={styles.toolbar}>
          <span className={styles.countBadge}>
            SHOWING {filteredCountries.length} OF {countries.length} COUNTRIES
          </span>
          <div className={styles.toolbarActions}>
            <button
              className={styles.randomBtn}
              onClick={handleRandomCountry}
              type="button"
              aria-label="Jump to random country"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>shuffle</span>
              RANDOM
            </button>
            <SortSelect value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        <div className={styles.content}>
          {loading && (
            <div className={styles.skeletonList}>
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} reversed={i % 2 === 1} />
              ))}
            </div>
          )}
          {error && <ErrorMessage message={error} onRetry={retry} />}
          {!loading && !error && (
            <CountryGrid
              countries={filteredCountries}
              searchTerm={searchTerm}
              onCompare={handleCompare}
              selectedCountries={compareList}
            />
          )}
        </div>
      </main>

      <ComparisonModal countries={compareList} onClear={() => setCompareList([])} />
      <ScrollToTop />

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerCopy}>© 2024 EXPLORER. ALL RIGHTS RESERVED.</span>
          <nav className={styles.footerNav}>
            <a className={styles.footerLink} href="#">PRIVACY</a>
            <a className={styles.footerLink} href="#">TERMS</a>
            <a className={`${styles.footerLink} ${styles.footerLinkBold}`} href="#">INDEX</a>
            <a className={styles.footerLink} href="#">CONTACT</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
