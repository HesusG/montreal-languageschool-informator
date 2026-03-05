import { Circle } from 'react-leaflet';
import type { SafetyZone } from '../../types';
import { SAFETY_COLORS } from '../../lib/constants';

interface SafetyHeatmapProps {
  zones: SafetyZone[];
}

function getColorAndPane(level: number): { color: string; pane: string } {
  if (level >= 7) return { color: SAFETY_COLORS.green, pane: 'safetyGreen' };
  if (level >= 4) return { color: SAFETY_COLORS.yellow, pane: 'safetyYellow' };
  return { color: SAFETY_COLORS.red, pane: 'safetyRed' };
}

export function SafetyHeatmap({ zones }: SafetyHeatmapProps) {
  return (
    <>
      {zones.map((zone, i) => {
        const { color, pane } = getColorAndPane(zone.level);
        return (
          <Circle
            key={`${zone.city}-${zone.neighborhood}-${i}`}
            center={[zone.center.lat, zone.center.lng]}
            radius={zone.radiusMeters}
            pathOptions={{
              fillColor: color,
              fillOpacity: SAFETY_COLORS.opacity,
              stroke: false,
            }}
            pane={pane}
          />
        );
      })}
    </>
  );
}
