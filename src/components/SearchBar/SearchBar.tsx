import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="country-search">
        FILTER BY NAME
      </label>
      <input
        id="country-search"
        type="search"
        className={styles.input}
        placeholder="TYPE TO FILTER..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search countries by name"
      />
    </div>
  );
}
