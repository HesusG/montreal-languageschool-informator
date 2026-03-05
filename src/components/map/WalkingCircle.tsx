import { Circle } from 'react-leaflet';
import type { School, WalkingMinutes } from '../../types';
import { walkingRadiusMeters } from '../../lib/walking';
import { MARKER_COLORS } from '../../lib/constants';

interface WalkingCircleProps {
  school: School;
  walkingMinutes: WalkingMinutes;
}

export function WalkingCircle({ school, walkingMinutes }: WalkingCircleProps) {
  const radius = walkingRadiusMeters(walkingMinutes);

  return (
    <Circle
      center={[school.lat, school.lng]}
      radius={radius}
      pathOptions={{
        color: MARKER_COLORS.walking,
        weight: 2,
        dashArray: '8 4',
        fillColor: MARKER_COLORS.walking,
        fillOpacity: 0.08,
      }}
    />
  );
}
