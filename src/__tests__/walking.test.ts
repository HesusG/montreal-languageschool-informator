import { describe, it, expect } from 'vitest';
import { haversineDistance, walkingDistance, walkingMinutes, walkingRadiusMeters } from '../lib/walking';

describe('haversineDistance', () => {
  it('returns 0 for same point', () => {
    expect(haversineDistance(45.5, -73.5, 45.5, -73.5)).toBe(0);
  });

  it('calculates distance between two Montreal points', () => {
    // Centre-Ville to Plateau (~2km)
    const dist = haversineDistance(45.5017, -73.5673, 45.5225, -73.5700);
    expect(dist).toBeGreaterThan(2000);
    expect(dist).toBeLessThan(2500);
  });

  it('calculates distance between Montreal and Quebec', () => {
    const dist = haversineDistance(45.5017, -73.5673, 46.8139, -71.2080);
    // ~233 km
    expect(dist).toBeGreaterThan(220000);
    expect(dist).toBeLessThan(250000);
  });
});

describe('walkingDistance', () => {
  it('is haversine * 1.3 (urban factor)', () => {
    const hav = haversineDistance(45.5017, -73.5673, 45.5225, -73.5700);
    const walk = walkingDistance(45.5017, -73.5673, 45.5225, -73.5700);
    expect(walk).toBeCloseTo(hav * 1.3, 0);
  });
});

describe('walkingMinutes', () => {
  it('returns reasonable walking time for ~2km distance', () => {
    // Centre-Ville to Plateau
    const mins = walkingMinutes(45.5017, -73.5673, 45.5225, -73.5700);
    // ~2.3km haversine * 1.3 = ~3km walking / 83.33 m/min ≈ 36 min
    expect(mins).toBeGreaterThan(25);
    expect(mins).toBeLessThan(45);
  });

  it('returns 0 for same point', () => {
    expect(walkingMinutes(45.5, -73.5, 45.5, -73.5)).toBe(0);
  });
});

describe('walkingRadiusMeters', () => {
  it('returns correct radius for 10 minutes', () => {
    // 10 min * 83.33 m/min = 833.3m walking / 1.3 = ~641m straight line
    const radius = walkingRadiusMeters(10);
    expect(radius).toBeCloseTo(641, 0);
  });

  it('returns 0 for 0 minutes', () => {
    expect(walkingRadiusMeters(0)).toBe(0);
  });

  it('scales linearly', () => {
    const r5 = walkingRadiusMeters(5);
    const r10 = walkingRadiusMeters(10);
    const r20 = walkingRadiusMeters(20);
    expect(r10).toBeCloseTo(r5 * 2, 0);
    expect(r20).toBeCloseTo(r10 * 2, 0);
  });
});
