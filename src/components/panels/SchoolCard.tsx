import type { School } from '../../types';
import { formatPricePerWeek } from '../../lib/format';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface SchoolCardProps {
  school: School;
  onRemove?: () => void;
}

export function SchoolCard({ school, onRemove }: SchoolCardProps) {
  return (
    <div style={{
      border: 'var(--border-style)',
      boxShadow: 'var(--shadow-default)',
      padding: '12px',
      backgroundColor: 'var(--color-bg)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, flex: 1 }}>{school.name}</h3>
        {onRemove && (
          <Button variant="ghost" onClick={onRemove} style={{ fontSize: '16px', padding: '0 4px' }}>✕</Button>
        )}
      </div>
      <div style={{ display: 'flex', gap: '4px', margin: '6px 0', flexWrap: 'wrap' }}>
        <Badge>{school.type === 'university' ? 'Universidad' : 'Privada'}</Badge>
        {school.intensity && <Badge>{school.intensity}</Badge>}
      </div>
      {school.neighborhood && <p style={{ fontSize: '12px', color: '#666' }}>{school.neighborhood}</p>}
      {school.hoursPerWeek && <p style={{ fontSize: '12px' }}>{school.hoursPerWeek} hrs/semana</p>}
      {school.levels && <p style={{ fontSize: '12px' }}>Niveles: {school.levels.join(', ')}</p>}
      <p style={{ fontSize: '15px', fontWeight: 700, marginTop: '6px' }}>{formatPricePerWeek(school.pricePerWeekCAD)}</p>
      <a href={school.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px' }}>
        Sitio web
      </a>
    </div>
  );
}
