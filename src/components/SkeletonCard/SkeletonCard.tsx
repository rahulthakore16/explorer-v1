import styles from './SkeletonCard.module.css';

interface SkeletonCardProps {
  reversed?: boolean;
}

export function SkeletonCard({ reversed = false }: SkeletonCardProps) {
  return (
    <div className={`${styles.card} ${reversed ? styles.cardReversed : ''}`}>
      <div className={styles.info}>
        <div className={`${styles.shimmer} ${styles.title}`} />
        <div className={`${styles.shimmer} ${styles.label}`} />
        <div className={styles.dataGrid}>
          <div className={`${styles.shimmer} ${styles.dataBlock}`} />
          <div className={`${styles.shimmer} ${styles.dataBlock}`} />
          <div className={`${styles.shimmer} ${styles.dataBlock}`} />
          <div className={`${styles.shimmer} ${styles.dataBlock}`} />
        </div>
      </div>
      <div className={`${styles.shimmer} ${styles.image}`} />
    </div>
  );
}
