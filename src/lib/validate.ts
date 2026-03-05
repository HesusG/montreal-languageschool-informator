import type { School, Accommodation, SafetyZone, SafetyData } from '../types';

function isString(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0;
}

function isNumber(v: unknown): v is number {
  return typeof v === 'number' && !isNaN(v);
}

export function isValidSchool(obj: unknown): obj is School {
  if (!obj || typeof obj !== 'object') return false;
  const o = obj as Record<string, unknown>;
  return (
    isString(o.id) &&
    (o.city === 'montreal' || o.city === 'quebec') &&
    isString(o.name) &&
    isNumber(o.lat) &&
    isNumber(o.lng) &&
    (o.type === 'private' || o.type === 'university') &&
    (o.pricePerWeekCAD === null || isNumber(o.pricePerWeekCAD)) &&
    isString(o.website)
  );
}

export function isValidAccommodation(obj: unknown): obj is Accommodation {
  if (!obj || typeof obj !== 'object') return false;
  const o = obj as Record<string, unknown>;
  return (
    isString(o.id) &&
    (o.city === 'montreal' || o.city === 'quebec') &&
    isString(o.name) &&
    isNumber(o.lat) &&
    isNumber(o.lng) &&
    (o.type === 'university' || o.type === 'hostel' || o.type === 'residence' || o.type === 'hotel')
  );
}

export function isValidSafetyData(obj: unknown): obj is SafetyData {
  if (!obj || typeof obj !== 'object') return false;
  const o = obj as Record<string, unknown>;
  if (!o.metadata || !Array.isArray(o.zones)) return false;
  return true;
}

export function isValidSafetyZone(obj: unknown): obj is SafetyZone {
  if (!obj || typeof obj !== 'object') return false;
  const o = obj as Record<string, unknown>;
  const center = o.center as Record<string, unknown> | undefined;
  return (
    (o.city === 'montreal' || o.city === 'quebec') &&
    isString(o.neighborhood) &&
    isNumber(o.level) &&
    !!center &&
    isNumber(center.lat) &&
    isNumber(center.lng) &&
    isNumber(o.radiusMeters)
  );
}

export function filterValid<T>(items: unknown[], guard: (item: unknown) => item is T): T[] {
  return items.filter((item) => {
    const valid = guard(item);
    if (!valid) console.warn('Skipping invalid entry:', item);
    return valid;
  }) as T[];
}
