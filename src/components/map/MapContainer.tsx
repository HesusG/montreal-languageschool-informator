import { useEffect, useRef } from 'react';
import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet';
import type { CityId } from '../../types';
import { CITY_CONFIG, MAP_CONFIG } from '../../lib/constants';

interface MapViewProps {
  activeCity: CityId;
  children: React.ReactNode;
}

function CityFlyer({ activeCity }: { activeCity: CityId }) {
  const map = useMap();
  const prevCity = useRef(activeCity);

  useEffect(() => {
    if (prevCity.current !== activeCity) {
      const config = CITY_CONFIG[activeCity];
      map.flyTo(config.center, config.zoom, { duration: 1.5 });
      prevCity.current = activeCity;
    }
  }, [activeCity, map]);

  return null;
}

function SafetyPanes() {
  const map = useMap();

  useEffect(() => {
    if (!map.getPane('safetyGreen')) {
      const green = map.createPane('safetyGreen');
      green.style.zIndex = '400';
    }
    if (!map.getPane('safetyYellow')) {
      const yellow = map.createPane('safetyYellow');
      yellow.style.zIndex = '401';
    }
    if (!map.getPane('safetyRed')) {
      const red = map.createPane('safetyRed');
      red.style.zIndex = '402';
    }
  }, [map]);

  return null;
}

export function MapView({ activeCity, children }: MapViewProps) {
  const config = CITY_CONFIG[activeCity];

  return (
    <LeafletMap
      center={config.center}
      zoom={config.zoom}
      minZoom={MAP_CONFIG.minZoom}
      maxZoom={MAP_CONFIG.maxZoom}
      style={{ height: '100%', width: '100%' }}
      maxBounds={[
        [45.30, -73.85],
        [46.95, -71.00],
      ]}
    >
      <TileLayer url={MAP_CONFIG.tileUrl} attribution={MAP_CONFIG.attribution} />
      <CityFlyer activeCity={activeCity} />
      <SafetyPanes />
      {children}
    </LeafletMap>
  );
}
