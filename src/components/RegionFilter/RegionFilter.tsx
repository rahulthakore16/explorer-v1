import { REGIONS, type Region } from '../../config/constants';

import styles from './RegionFilter.module.css';

interface RegionFilterProps {
  activeRegion: Region;
  onChange: (region: Region) => void;
}

export function RegionFilter({ activeRegion, onChange }: RegionFilterProps) {
  return (
    <div className={styles.container} role="tablist" aria-label="Filter by region">
      {REGIONS.map((region) => (
        <button
          key={region}
          className={`${styles.button} ${region === activeRegion ? styles.active : ''}`}
          onClick={() => onChange(region)}
          role="tab"
          aria-selected={region === activeRegion}
          type="button"
        >
          {region.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
