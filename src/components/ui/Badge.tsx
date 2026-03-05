import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: string;
}

export function Badge({ children, color }: BadgeProps) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      fontSize: '12px',
      fontWeight: 'var(--font-weight-bold)' as unknown as number,
      border: '2px solid var(--color-border)',
      borderRadius: 'var(--border-radius)',
      backgroundColor: color || 'var(--color-bg)',
    }}>
      {children}
    </span>
  );
}
