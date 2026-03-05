import type { Accommodation } from '../../types';
import { formatPricePerWeek } from '../../lib/format';
import { Badge } from '../ui/Badge';

interface AccommodationCardProps {
  accommodation: Accommodation;
}

const typeLabels: Record<string, string> = {
  university: 'Residencia universitaria',
  hostel: 'Hostel',
  residence: 'Residencia',
  hotel: 'Hotel',
};

export function AccommodationCard({ accommodation: a }: AccommodationCardProps) {
  return (
    <div style={{
      border: 'var(--border-style)',
      boxShadow: 'var(--shadow-default)',
      padding: '12px',
      backgroundColor: 'var(--color-bg)',
    }}>
      <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{a.name}</h3>
      <Badge>{typeLabels[a.type] || a.type}</Badge>
      {a.neighborhood && <p style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>{a.neighborhood}</p>}
      <p style={{ fontSize: '15px', fontWeight: 700, marginTop: '6px' }}>{formatPricePerWeek(a.pricePerWeekCAD)}</p>
      {a.amenities && a.amenities.length > 0 && (
        <p style={{ fontSize: '12px', marginTop: '4px' }}>{a.amenities.join(', ')}</p>
      )}
      {a.bookingUrl && (
        <a href={a.bookingUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', display: 'block', marginTop: '6px' }}>
          Reservar
        </a>
      )}
    </div>
  );
}
