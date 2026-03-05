interface SelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  label?: string;
}

export function Select<T extends string>({ value, onChange, options, label }: SelectProps<T>) {
  return (
    <div>
      {label && <label style={{ display: 'block', fontSize: '12px', fontWeight: 'var(--font-weight-medium)' as unknown as number, marginBottom: '4px' }}>{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        style={{
          width: '100%',
          padding: '8px',
          border: 'var(--border-style)',
          borderRadius: 'var(--border-radius)',
          backgroundColor: 'var(--color-bg)',
          fontFamily: 'var(--font-family)',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
