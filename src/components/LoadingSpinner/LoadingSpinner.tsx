import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  isSlowLoad: boolean;
}

export function LoadingSpinner({ isSlowLoad }: LoadingSpinnerProps) {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <div className={styles.spinner} />
      <p className={styles.text}>
        {isSlowLoad
          ? 'Taking longer than expected...'
          : 'Loading countries...'}
      </p>
    </div>
  );
}
