import type { School } from '../../types';
import { formatPricePerWeek } from '../../lib/format';
import { Button } from '../ui/Button';

interface ComparatorProps {
  schools: School[];
  onRemove: (id: string) => void;
}

export function Comparator({ schools, onRemove }: ComparatorProps) {
  if (schools.length === 0) {
    return <p style={{ fontSize: '14px', color: '#666' }}>No hay escuelas para comparar.</p>;
  }

  const rows: { label: string; getValue: (s: School) => string }[] = [
    { label: 'Tipo', getValue: (s) => s.type === 'university' ? 'Universidad' : 'Privada' },
    { label: 'Barrio', getValue: (s) => s.neighborhood || '-' },
    { label: 'Intensidad', getValue: (s) => s.intensity || '-' },
    { label: 'Horas/semana', getValue: (s) => s.hoursPerWeek ? `${s.hoursPerWeek}` : '-' },
    { label: 'Niveles', getValue: (s) => s.levels?.join(', ') || '-' },
    { label: 'Duracion (semanas)', getValue: (s) => s.durationWeeks?.join(', ') || '-' },
    { label: 'Precio/semana', getValue: (s) => formatPricePerWeek(s.pricePerWeekCAD) },
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: 'var(--border-style)' }}></th>
            {schools.map((s) => (
              <th key={s.id} style={{ padding: '8px', borderBottom: 'var(--border-style)', textAlign: 'left', minWidth: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '13px' }}>{s.name}</span>
                  <Button variant="ghost" onClick={() => onRemove(s.id)} style={{ fontSize: '14px', padding: '0', flexShrink: 0 }}>✕</Button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td style={{ padding: '6px 8px', fontWeight: 500, borderBottom: '1px solid #ddd', whiteSpace: 'nowrap' }}>
                {row.label}
              </td>
              {schools.map((s) => (
                <td key={s.id} style={{ padding: '6px 8px', borderBottom: '1px solid #ddd' }}>
                  {row.getValue(s)}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td style={{ padding: '6px 8px', fontWeight: 500 }}>Sitio web</td>
            {schools.map((s) => (
              <td key={s.id} style={{ padding: '6px 8px' }}>
                <a href={s.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px' }}>
                  Ver
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
