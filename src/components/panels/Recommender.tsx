import type { School, Accommodation, SafetyZone, CityId } from '../../types';
import { useRecommender } from '../../hooks/useRecommender';
import { formatPrice } from '../../lib/format';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { BUDGET_LIMITS } from '../../lib/constants';

interface RecommenderProps {
  schools: School[];
  accommodations: Accommodation[];
  safetyZones: SafetyZone[];
  activeCity: CityId;
}

export function Recommender({ schools, accommodations, safetyZones, activeCity }: RecommenderProps) {
  const {
    budgetPerWeek,
    setBudgetPerWeek,
    priority,
    setPriority,
    results,
    noResults,
  } = useRecommender(schools, accommodations, safetyZones, activeCity);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '4px' }}>
          Presupuesto semanal (CAD)
        </label>
        <input
          type="number"
          min={BUDGET_LIMITS.min}
          max={BUDGET_LIMITS.max}
          value={budgetPerWeek}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (!isNaN(v) && v >= BUDGET_LIMITS.min && v <= BUDGET_LIMITS.max) {
              setBudgetPerWeek(v);
            }
          }}
          style={{
            width: '100%',
            padding: '8px',
            border: 'var(--border-style)',
            borderRadius: 'var(--border-radius)',
            fontFamily: 'var(--font-family)',
            fontSize: '14px',
          }}
        />
      </div>

      <Select
        label="Prioridad"
        value={priority}
        onChange={setPriority}
        options={[
          { value: 'costo', label: 'Menor costo' },
          { value: 'distancia', label: 'Menor distancia' },
          { value: 'seguridad', label: 'Mayor seguridad' },
        ]}
      />

      <hr style={{ border: 'none', borderTop: '2px solid var(--color-border)' }} />

      {noResults ? (
        <div style={{
          padding: '16px',
          border: 'var(--border-style)',
          backgroundColor: '#fff3cd',
          fontSize: '14px',
        }}>
          No hay combinaciones dentro de tu presupuesto. Intenta aumentarlo.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase' }}>Top 3 Recomendaciones</h3>
          {results.map((combo, i) => (
            <div key={`${combo.school.id}-${combo.accommodation.id}`} style={{
              border: 'var(--border-style)',
              boxShadow: 'var(--shadow-default)',
              padding: '12px',
              backgroundColor: 'var(--color-bg)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <Badge color="var(--color-accent)">#{i + 1}</Badge>
                <span style={{ fontSize: '12px', fontWeight: 500 }}>
                  Score: {(combo.score * 100).toFixed(0)}%
                </span>
              </div>
              <p style={{ fontSize: '13px', fontWeight: 700 }}>{combo.school.name}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>Escuela: {formatPrice(combo.school.pricePerWeekCAD)}/semana</p>
              <p style={{ fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>{combo.accommodation.name}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>Alojamiento: {formatPrice(combo.accommodation.pricePerWeekCAD)}/semana</p>
              <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>Total: <strong>{formatPrice(combo.totalWeeklyCAD)}/sem</strong></span>
                <span>{combo.walkingMin.toFixed(0)} min caminando</span>
              </div>
              <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                Seguridad zona: {combo.safetyLevel.toFixed(1)}/10
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
