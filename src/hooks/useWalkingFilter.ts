import { useMemo } from 'react';
import type { School, Accommodation, WalkingMinutes } from '../types';
import { haversineDistance, walkingRadiusMeters } from '../lib/walking';

export function useWalkingFilter(
  accommodations: Accommodation[],
  selectedSchool: School | null,
  walkingMin: WalkingMinutes,
): Accommodation[] {
  return useMemo(() => {
    if (!selectedSchool) return accommodations;
    const radiusM = walkingRadiusMeters(walkingMin);
    return accommodations.filter((a) => {
      const dist = haversineDistance(selectedSchool.lat, selectedSchool.lng, a.lat, a.lng);
      return dist <= radiusM;
    });
  }, [accommodations, selectedSchool, walkingMin]);
}
