import type { WalkingMinutes } from '../../types';

interface SliderProps {
  value: WalkingMinutes;
  onChange: (value: WalkingMinutes) => void;
  disabled?: boolean;
}

const STEPS: WalkingMinutes[] = [5, 10, 15, 20];

export function Slider({ value, onChange, disabled }: SliderProps) {
  return (
    <div style={{ opacity: disabled ? 0.4 : 1 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '4px',
        fontSize: '12px',
        fontWeight: 'var(--font-weight-medium)' as unknown as number,
      }}>
        {STEPS.map((s) => (
          <span key={s} style={{ fontWeight: s === value ? 700 : 400 }}>{s} min</span>
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={3}
        step={1}
        value={STEPS.indexOf(value)}
        disabled={disabled}
        onChange={(e) => onChange(STEPS[Number(e.target.value)])}
        style={{
          width: '100%',
          accentColor: 'var(--color-accent)',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      />
      <p style={{
        fontSize: '11px',
        color: '#666',
        marginTop: '4px',
        fontStyle: 'italic',
      }}>
        Distancia aproximada en linea recta. Tiempo real puede variar.
      </p>
    </div>
  );
}
