import styles from './SortSelect.module.css';

export type SortOption = 'name-asc' | 'name-desc' | 'pop-desc' | 'pop-asc';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="sort-select">SORT BY</label>
      <select
        id="sort-select"
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        <option value="name-asc">NAME A–Z</option>
        <option value="name-desc">NAME Z–A</option>
        <option value="pop-desc">POPULATION HIGH–LOW</option>
        <option value="pop-asc">POPULATION LOW–HIGH</option>
      </select>
    </div>
  );
}
