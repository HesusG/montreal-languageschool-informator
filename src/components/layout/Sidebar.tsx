import type { Layers, WalkingMinutes, School } from '../../types';
import { Toggle } from '../ui/Toggle';
import { Slider } from '../ui/Slider';
import { Button } from '../ui/Button';
import { MARKER_COLORS } from '../../lib/constants';

interface SidebarProps {
  layers: Layers;
  onToggleLayer: (layer: keyof Layers) => void;
  walkingMinutes: WalkingMinutes;
  onWalkingChange: (value: WalkingMinutes) => void;
  selectedSchool: School | null;
  onOpenComparator: () => void;
  onOpenRecommender: () => void;
  compareCount: number;
  lastScraped: string | null;
}

export function Sidebar({
  layers,
  onToggleLayer,
  walkingMinutes,
  onWalkingChange,
  selectedSchool,
  onOpenComparator,
  onOpenRecommender,
  compareCount,
  lastScraped,
}: SidebarProps) {
  return (
    <aside className="sidebar" style={{
      width: '280px',
      borderRight: 'var(--border-style)',
      backgroundColor: 'var(--color-bg)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      overflowY: 'auto',
      flexShrink: 0,
    }}>
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Capas
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Toggle label="Escuelas" checked={layers.schools} onChange={() => onToggleLayer('schools')} color={MARKER_COLORS.school} />
          <Toggle label="Alojamiento" checked={layers.accommodations} onChange={() => onToggleLayer('accommodations')} color={MARKER_COLORS.accommodation} />
          <Toggle label="Seguridad" checked={layers.safety} onChange={() => onToggleLayer('safety')} />
          {layers.safety && (
            <p style={{ fontSize: '11px', color: '#666', fontStyle: 'italic', marginLeft: '28px', marginTop: '-4px' }}>
              Datos aproximados basados en reportes policiales. No garantizan seguridad absoluta. Usa tu criterio.
            </p>
          )}
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '2px solid var(--color-border)' }} />

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Distancia caminando
        </h3>
        <Slider value={walkingMinutes} onChange={onWalkingChange} disabled={!selectedSchool} />
        {!selectedSchool && (
          <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            Selecciona una escuela en el mapa para activar.
          </p>
        )}
      </section>

      <hr style={{ border: 'none', borderTop: '2px solid var(--color-border)' }} />

      <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Herramientas
        </h3>
        <Button variant="secondary" onClick={onOpenComparator} disabled={compareCount === 0}>
          Comparar ({compareCount})
        </Button>
        <Button variant="primary" onClick={onOpenRecommender}>
          Recomendador
        </Button>
      </section>

      <div style={{ marginTop: 'auto', fontSize: '11px', color: '#999' }}>
        {lastScraped && <p>Datos actualizados: {lastScraped}</p>}
      </div>
    </aside>
  );
}
