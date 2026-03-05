import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
}

const styles: Record<string, React.CSSProperties> = {
  base: {
    fontFamily: 'var(--font-family)',
    fontWeight: 'var(--font-weight-bold)' as unknown as number,
    fontSize: '14px',
    padding: '8px 16px',
    border: 'var(--border-style)',
    borderRadius: 'var(--border-radius)',
    cursor: 'pointer',
    transition: 'box-shadow 0.1s, transform 0.1s',
    boxShadow: 'var(--shadow-default)',
  },
  primary: {
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-text)',
  },
  secondary: {
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
  },
  ghost: {
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    padding: '4px 8px',
  },
};

export function Button({ variant = 'secondary', children, style, ...props }: ButtonProps) {
  return (
    <button
      style={{ ...styles.base, ...styles[variant], ...style }}
      onMouseDown={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = 'var(--shadow-pressed)';
        el.style.transform = 'translate(2px, 2px)';
      }}
      onMouseUp={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = variant === 'ghost' ? 'none' : 'var(--shadow-default)';
        el.style.transform = 'none';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = variant === 'ghost' ? 'none' : 'var(--shadow-default)';
        el.style.transform = 'none';
      }}
      {...props}
    >
      {children}
    </button>
  );
}
