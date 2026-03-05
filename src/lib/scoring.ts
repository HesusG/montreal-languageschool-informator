import type { School, Accommodation, SafetyZone } from '../types';
import { walkingMinutes } from './walking';

export interface RecommenderInput {
  schools: School[];
  accommodations: Accommodation[];
  safetyZones: SafetyZone[];
  budgetPerWeekCAD: number;
  priority: 'costo' | 'distancia' | 'seguridad';
}

export interface ScoredCombo {
  school: School;
  accommodation: Accommodation;
  totalWeeklyCAD: number;
  walkingMin: number;
  safetyLevel: number;
  score: number;
}

function getAccommodationWeeklyPrice(a: Accommodation): number | null {
  if (a.pricePerWeekCAD != null) return a.pricePerWeekCAD;
  if (a.pricePerNightCAD != null) return a.pricePerNightCAD * 7;
  return null;
}

function getSafetyLevel(lat: number, lng: number, zones: SafetyZone[]): number {
  let closest: SafetyZone | null = null;
  let closestDist = Infinity;
  for (const zone of zones) {
    const dlat = zone.center.lat - lat;
    const dlng = zone.center.lng - lng;
    const dist = Math.sqrt(dlat * dlat + dlng * dlng);
    if (dist < closestDist) {
      closestDist = dist;
      closest = zone;
    }
  }
  return closest ? closest.level : 5;
}

export function recommend(input: RecommenderInput): ScoredCombo[] {
  const { schools, accommodations, safetyZones, budgetPerWeekCAD, priority } = input;

  const combos: ScoredCombo[] = [];

  for (const school of schools) {
    if (school.pricePerWeekCAD == null) continue;

    for (const accom of accommodations) {
      const accomPrice = getAccommodationWeeklyPrice(accom);
      if (accomPrice == null) continue;

      const totalWeeklyCAD = school.pricePerWeekCAD + accomPrice;
      if (totalWeeklyCAD > budgetPerWeekCAD) continue;

      const walkingMin = walkingMinutes(school.lat, school.lng, accom.lat, accom.lng);
      const safetyLevel = getSafetyLevel(accom.lat, accom.lng, safetyZones);

      const costScore = 1 - totalWeeklyCAD / budgetPerWeekCAD;
      const distanceScore = Math.max(0, 1 - walkingMin / 20);
      const safetyScore = safetyLevel / 10;

      const weights = { costo: 0.2, distancia: 0.2, seguridad: 0.2 };
      weights[priority] = 0.6;

      const score =
        weights.costo * costScore +
        weights.distancia * distanceScore +
        weights.seguridad * safetyScore;

      combos.push({
        school,
        accommodation: accom,
        totalWeeklyCAD,
        walkingMin,
        safetyLevel,
        score,
      });
    }
  }

  combos.sort((a, b) => b.score - a.score);
  return combos.slice(0, 3);
}
