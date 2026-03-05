interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: string;
}

export function Toggle({ label, checked, onChange, color }: ToggleProps) {
  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'var(--font-weight-medium)' as unknown as number,
      userSelect: 'none',
    }}>
      <span
        onClick={() => onChange(!checked)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          border: 'var(--border-style)',
          borderRadius: 'var(--border-radius)',
          backgroundColor: checked ? (color || 'var(--color-accent)') : 'var(--color-bg)',
          flexShrink: 0,
        }}
      >
        {checked && <span style={{ color: checked && color ? '#fff' : 'var(--color-text)', fontSize: '14px', fontWeight: 700 }}>✓</span>}
      </span>
      <span>{label}</span>
    </label>
  );
}
