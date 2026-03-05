import { useState, useEffect, useCallback, useMemo } from 'react';
import type { CityId, WalkingMinutes, Layers, PanelMode, School } from './types';
import { useMapData } from './hooks/useMapData';
import { useWalkingFilter } from './hooks/useWalkingFilter';
import { useIsMobile } from './hooks/useMediaQuery';
import { Header } from './components/layout/Header';
import { SlidePanel } from './components/layout/SlidePanel';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { MapView } from './components/map/MapContainer';
import { SchoolMarkers } from './components/map/SchoolMarkers';
import { AccommodationMarkers } from './components/map/AccommodationMarkers';
import { SafetyHeatmap } from './components/map/SafetyHeatmap';
import { WalkingCircle } from './components/map/WalkingCircle';
import { Comparator } from './components/panels/Comparator';
import { Recommender } from './components/panels/Recommender';
import { Button } from './components/ui/Button';
import { Toggle } from './components/ui/Toggle';
import { Slider } from './components/ui/Slider';
import { MARKER_COLORS } from './lib/constants';

function parseCityFromHash(): CityId {
  const hash = window.location.hash;
  if (hash.startsWith('#/quebec')) return 'quebec';
  return 'montreal';
}

export default function App() {
  const { data, loading, error, retry } = useMapData();
  const isMobile = useIsMobile();

  const [activeCity, setActiveCity] = useState<CityId>(parseCityFromHash);
  const [layers, setLayers] = useState<Layers>({ schools: true, accommodations: true, safety: false });
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [walkingMin, setWalkingMin] = useState<WalkingMinutes>(10);
  const [compareList, setCompareList] = useState<School[]>([]);
  const [panelMode, setPanelMode] = useState<PanelMode>('closed');
  const [toast, setToast] = useState<string | null>(null);

  // Hash routing
  useEffect(() => {
    const handler = () => setActiveCity(parseCityFromHash());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  useEffect(() => {
    window.location.hash = `#/${activeCity}`;
  }, [activeCity]);

  // City switch resets
  const handleCityChange = useCallback((city: CityId) => {
    setActiveCity(city);
    setSelectedSchool(null);
    setCompareList([]);
    setPanelMode('closed');
  }, []);

  // Layer toggle
  const handleToggleLayer = useCallback((layer: keyof Layers) => {
    setLayers((prev) => {
      const next = { ...prev, [layer]: !prev[layer] };
      if (layer === 'schools' && !next.schools) {
        setSelectedSchool(null);
      }
      return next;
    });
  }, []);

  // Select school
  const handleSelectSchool = useCallback((school: School) => {
    setSelectedSchool(school);
  }, []);

  // Compare
  const handleCompare = useCallback((school: School) => {
    setCompareList((prev) => {
      if (prev.some((s) => s.id === school.id)) {
        return prev.filter((s) => s.id !== school.id);
      }
      if (prev.length >= 3) {
        setToast('Maximo 3 escuelas para comparar');
        return prev;
      }
      return [...prev, school];
    });
  }, []);

  const handleRemoveCompare = useCallback((id: string) => {
    setCompareList((prev) => {
      const next = prev.filter((s) => s.id !== id);
      if (next.length === 0) setPanelMode('closed');
      return next;
    });
  }, []);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Filter data by city
  const citySchools = useMemo(() => data.schools.filter((s) => s.city === activeCity), [data.schools, activeCity]);
  const cityAccommodations = useMemo(() => data.accommodations.filter((a) => a.city === activeCity), [data.accommodations, activeCity]);
  const cityZones = useMemo(() => data.safetyZones.filter((z) => z.city === activeCity), [data.safetyZones, activeCity]);

  // Walking filter
  const filteredAccommodations = useWalkingFilter(cityAccommodations, selectedSchool, walkingMin);

  // Panel title
  const panelTitle = panelMode === 'comparator' ? 'Comparar Escuelas' : panelMode === 'recommender' ? 'Recomendador' : '';

  // Sidebar content (shared between desktop sidebar and mobile drawer)
  const sidebarContent = (
    <>
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Capas
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Toggle label="Escuelas" checked={layers.schools} onChange={() => handleToggleLayer('schools')} color={MARKER_COLORS.school} />
          <Toggle label="Alojamiento" checked={layers.accommodations} onChange={() => handleToggleLayer('accommodations')} color={MARKER_COLORS.accommodation} />
          <Toggle label="Seguridad" checked={layers.safety} onChange={() => handleToggleLayer('safety')} />
          {layers.safety && (
            <p style={{ fontSize: '11px', color: '#666', fontStyle: 'italic', marginLeft: '28px', marginTop: '-4px' }}>
              Datos aproximados basados en reportes policiales. No garantizan seguridad absoluta. Usa tu criterio.
            </p>
          )}
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '2px solid var(--color-border)', margin: '8px 0' }} />

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Distancia caminando
        </h3>
        <Slider value={walkingMin} onChange={setWalkingMin} disabled={!selectedSchool} />
        {!selectedSchool && (
          <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            Selecciona una escuela en el mapa para activar.
          </p>
        )}
      </section>

      <hr style={{ border: 'none', borderTop: '2px solid var(--color-border)', margin: '8px 0' }} />

      <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Button variant="secondary" onClick={() => setPanelMode('comparator')} disabled={compareList.length === 0}>
          Comparar ({compareList.length})
        </Button>
        <Button variant="primary" onClick={() => setPanelMode('recommender')}>
          Recomendador
        </Button>
      </section>

      {data.lastScraped && (
        <p style={{ fontSize: '11px', color: '#999', marginTop: '12px' }}>
          Datos actualizados: {data.lastScraped}
        </p>
      )}
    </>
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'var(--font-family)' }}>
        <p style={{ fontSize: '18px', fontWeight: 700 }}>Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '16px', fontFamily: 'var(--font-family)' }}>
        <p style={{ fontSize: '16px' }}>{error}</p>
        <Button variant="primary" onClick={retry}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="app">
      <Header activeCity={activeCity} onCityChange={handleCityChange} />
      <div className="app-body">
        {!isMobile && (
          <aside className="sidebar" style={{
            width: '280px',
            borderRight: 'var(--border-style)',
            backgroundColor: 'var(--color-bg)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            overflowY: 'auto',
            flexShrink: 0,
          }}>
            {sidebarContent}
          </aside>
        )}

        <div className="map-wrapper">
          <MapView activeCity={activeCity}>
            {layers.schools && (
              <SchoolMarkers
                schools={citySchools}
                onCompare={handleCompare}
                onSelect={handleSelectSchool}
                compareList={compareList}
              />
            )}
            {layers.accommodations && (
              <AccommodationMarkers accommodations={selectedSchool ? filteredAccommodations : cityAccommodations} />
            )}
            {layers.safety && <SafetyHeatmap zones={cityZones} />}
            {selectedSchool && layers.schools && (
              <WalkingCircle school={selectedSchool} walkingMinutes={walkingMin} />
            )}
          </MapView>

          <SlidePanel
            open={panelMode !== 'closed'}
            onClose={() => setPanelMode('closed')}
            title={panelTitle}
          >
            {panelMode === 'comparator' && (
              <Comparator schools={compareList} onRemove={handleRemoveCompare} />
            )}
            {panelMode === 'recommender' && (
              <Recommender
                schools={data.schools}
                accommodations={data.accommodations}
                safetyZones={data.safetyZones}
                activeCity={activeCity}
              />
            )}
          </SlidePanel>
        </div>

        {isMobile && (
          <MobileDrawer>
            {sidebarContent}
          </MobileDrawer>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
