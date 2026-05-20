import { useEffect, useState } from 'react';

import styles from './ScrollToTop.module.css';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      className={styles.button}
      onClick={scrollToTop}
      type="button"
      aria-label="Scroll to top"
    >
      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
        arrow_upward
      </span>
    </button>
  );
}
