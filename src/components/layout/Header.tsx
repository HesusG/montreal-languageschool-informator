import type { CityId } from '../../types';
import { CITY_CONFIG } from '../../lib/constants';

interface HeaderProps {
  activeCity: CityId;
  onCityChange: (city: CityId) => void;
}

const cities: CityId[] = ['montreal', 'quebec'];

export function Header({ activeCity, onCityChange }: HeaderProps) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      height: '56px',
      borderBottom: 'var(--border-style)',
      backgroundColor: 'var(--color-bg)',
      flexShrink: 0,
    }}>
      <h1 style={{
        fontSize: '18px',
        fontWeight: 'var(--font-weight-bold)' as unknown as number,
        whiteSpace: 'nowrap',
      }}>
        Escuelas de Frances
      </h1>
      <nav style={{ display: 'flex', gap: '0' }}>
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => onCityChange(city)}
            style={{
              padding: '8px 20px',
              fontSize: '14px',
              fontWeight: 'var(--font-weight-bold)' as unknown as number,
              fontFamily: 'var(--font-family)',
              border: 'var(--border-style)',
              borderRadius: 'var(--border-radius)',
              cursor: 'pointer',
              backgroundColor: activeCity === city ? 'var(--color-accent)' : 'var(--color-bg)',
              color: 'var(--color-text)',
              marginLeft: city === 'quebec' ? '-3px' : '0',
              position: 'relative',
              zIndex: activeCity === city ? 1 : 0,
            }}
          >
            {CITY_CONFIG[city].label}
          </button>
        ))}
      </nav>
    </header>
  );
}
