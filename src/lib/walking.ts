import { WALKING_SPEEDS } from './constants';

/**
 * Haversine distance in meters between two lat/lng points.
 */
export function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Estimated walking distance in meters (haversine * urban factor).
 */
export function walkingDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  return haversineDistance(lat1, lng1, lat2, lng2) * WALKING_SPEEDS.urbanFactor;
}

/**
 * Estimated walking time in minutes.
 */
export function walkingMinutes(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  return walkingDistance(lat1, lng1, lat2, lng2) / WALKING_SPEEDS.speedMPerMin;
}

/**
 * Walking radius in meters for a given number of minutes.
 * This is the straight-line (haversine) radius that corresponds
 * to the walking minutes after accounting for the urban factor.
 */
export function walkingRadiusMeters(minutes: number): number {
  const walkingDist = minutes * WALKING_SPEEDS.speedMPerMin;
  return walkingDist / WALKING_SPEEDS.urbanFactor;
}
