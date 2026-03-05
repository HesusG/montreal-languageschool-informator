import type { School, Accommodation } from '../../types';
import { formatPricePerWeek } from '../../lib/format';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface SchoolPopupProps {
  school: School;
  onCompare: (school: School) => void;
  onSelect: (school: School) => void;
  isInCompare: boolean;
}

export function SchoolPopup({ school, onCompare, onSelect, isInCompare }: SchoolPopupProps) {
  return (
    <div style={{ minWidth: '220px', fontFamily: 'var(--font-family)' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{school.name}</h3>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '6px', flexWrap: 'wrap' }}>
        <Badge>{school.type === 'university' ? 'Universidad' : 'Privada'}</Badge>
        {school.intensity && <Badge>{school.intensity}</Badge>}
      </div>
      {school.address && <p style={{ fontSize: '12px', marginBottom: '4px' }}>{school.address}</p>}
      {school.levels && <p style={{ fontSize: '12px', marginBottom: '4px' }}>Niveles: {school.levels.join(', ')}</p>}
      {school.hoursPerWeek && <p style={{ fontSize: '12px', marginBottom: '4px' }}>{school.hoursPerWeek} hrs/semana</p>}
      <p style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>{formatPricePerWeek(school.pricePerWeekCAD)}</p>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        <a href={school.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px' }}>Sitio web</a>
        <Button variant="ghost" onClick={() => onSelect(school)} style={{ fontSize: '12px' }}>
          Seleccionar
        </Button>
        <Button variant="ghost" onClick={() => onCompare(school)} style={{ fontSize: '12px' }}>
          {isInCompare ? '✓ En comparacion' : 'Comparar'}
        </Button>
      </div>
    </div>
  );
}

interface AccommodationPopupProps {
  accommodation: Accommodation;
}

export function AccommodationPopup({ accommodation: a }: AccommodationPopupProps) {
  const typeLabels: Record<string, string> = {
    university: 'Residencia universitaria',
    hostel: 'Hostel',
    residence: 'Residencia',
    hotel: 'Hotel',
  };

  return (
    <div style={{ minWidth: '200px', fontFamily: 'var(--font-family)' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{a.name}</h3>
      <Badge>{typeLabels[a.type] || a.type}</Badge>
      {a.address && <p style={{ fontSize: '12px', marginTop: '6px' }}>{a.address}</p>}
      <p style={{ fontSize: '14px', fontWeight: 700, marginTop: '6px' }}>{formatPricePerWeek(a.pricePerWeekCAD)}</p>
      {a.amenities && a.amenities.length > 0 && (
        <p style={{ fontSize: '12px', marginTop: '4px' }}>{a.amenities.join(', ')}</p>
      )}
      {a.summerOnly && <p style={{ fontSize: '11px', color: '#666', marginTop: '4px', fontStyle: 'italic' }}>Solo verano</p>}
      {a.bookingUrl && (
        <a href={a.bookingUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', display: 'block', marginTop: '6px' }}>
          Reservar
        </a>
      )}
    </div>
  );
}
