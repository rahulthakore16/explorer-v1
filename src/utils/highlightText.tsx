import type { ReactNode } from 'react';

export function highlightText(
  text: string,
  query: string,
  highlightClass: string
): ReactNode {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  if (parts.length === 1) return text;

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className={highlightClass}>{part}</mark>
    ) : (
      part
    )
  );
}
