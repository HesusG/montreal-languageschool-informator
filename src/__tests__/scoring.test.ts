import { describe, it, expect } from 'vitest';
import { recommend, type RecommenderInput } from '../lib/scoring';
import type { School, Accommodation, SafetyZone } from '../types';

const makeSchool = (overrides: Partial<School> = {}): School => ({
  id: 'test-school',
  city: 'montreal',
  name: 'Test School',
  type: 'private',
  lat: 45.5017,
  lng: -73.5673,
  pricePerWeekCAD: 300,
  website: 'https://test.com',
  ...overrides,
});

const makeAccom = (overrides: Partial<Accommodation> = {}): Accommodation => ({
  id: 'test-accom',
  city: 'montreal',
  name: 'Test Hostel',
  type: 'hostel',
  lat: 45.5017,
  lng: -73.5673,
  pricePerWeekCAD: 200,
  ...overrides,
});

const makeZone = (overrides: Partial<SafetyZone> = {}): SafetyZone => ({
  city: 'montreal',
  neighborhood: 'Test Zone',
  level: 8,
  center: { lat: 45.5017, lng: -73.5673 },
  radiusMeters: 500,
  ...overrides,
});

describe('recommend', () => {
  it('returns empty when no combos within budget', () => {
    const input: RecommenderInput = {
      schools: [makeSchool({ pricePerWeekCAD: 500 })],
      accommodations: [makeAccom({ pricePerWeekCAD: 600 })],
      safetyZones: [makeZone()],
      budgetPerWeekCAD: 100,
      priority: 'costo',
    };
    expect(recommend(input)).toHaveLength(0);
  });

  it('returns max 3 results', () => {
    const schools = [
      makeSchool({ id: 's1', pricePerWeekCAD: 100 }),
      makeSchool({ id: 's2', pricePerWeekCAD: 150 }),
    ];
    const accoms = [
      makeAccom({ id: 'a1', pricePerWeekCAD: 100 }),
      makeAccom({ id: 'a2', pricePerWeekCAD: 150 }),
      makeAccom({ id: 'a3', pricePerWeekCAD: 200 }),
    ];
    const input: RecommenderInput = {
      schools,
      accommodations: accoms,
      safetyZones: [makeZone()],
      budgetPerWeekCAD: 1000,
      priority: 'costo',
    };
    expect(recommend(input).length).toBeLessThanOrEqual(3);
  });

  it('prefers cheaper combos when priority is costo', () => {
    const input: RecommenderInput = {
      schools: [
        makeSchool({ id: 'cheap', pricePerWeekCAD: 100 }),
        makeSchool({ id: 'expensive', pricePerWeekCAD: 400 }),
      ],
      accommodations: [makeAccom({ pricePerWeekCAD: 100 })],
      safetyZones: [makeZone()],
      budgetPerWeekCAD: 1000,
      priority: 'costo',
    };
    const results = recommend(input);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].school.id).toBe('cheap');
  });

  it('prefers closer combos when priority is distancia', () => {
    const school = makeSchool({ lat: 45.5017, lng: -73.5673 });
    const input: RecommenderInput = {
      schools: [school],
      accommodations: [
        makeAccom({ id: 'near', lat: 45.502, lng: -73.567, pricePerWeekCAD: 200 }),
        makeAccom({ id: 'far', lat: 45.530, lng: -73.600, pricePerWeekCAD: 200 }),
      ],
      safetyZones: [makeZone()],
      budgetPerWeekCAD: 1000,
      priority: 'distancia',
    };
    const results = recommend(input);
    expect(results[0].accommodation.id).toBe('near');
  });

  it('skips schools with null price', () => {
    const input: RecommenderInput = {
      schools: [makeSchool({ pricePerWeekCAD: null })],
      accommodations: [makeAccom()],
      safetyZones: [makeZone()],
      budgetPerWeekCAD: 1000,
      priority: 'costo',
    };
    expect(recommend(input)).toHaveLength(0);
  });

  it('calculates pricePerWeekCAD from pricePerNightCAD if weekly is null', () => {
    const input: RecommenderInput = {
      schools: [makeSchool({ pricePerWeekCAD: 100 })],
      accommodations: [makeAccom({ pricePerWeekCAD: null, pricePerNightCAD: 50 })],
      safetyZones: [makeZone()],
      budgetPerWeekCAD: 500,
      priority: 'costo',
    };
    const results = recommend(input);
    expect(results.length).toBe(1);
    // total = 100 + 50*7 = 450
    expect(results[0].totalWeeklyCAD).toBe(450);
  });

  it('applies correct weights: priority gets 0.6, others 0.2', () => {
    const input: RecommenderInput = {
      schools: [makeSchool({ pricePerWeekCAD: 200 })],
      accommodations: [makeAccom({ pricePerWeekCAD: 200 })],
      safetyZones: [makeZone({ level: 10 })],
      budgetPerWeekCAD: 1000,
      priority: 'seguridad',
    };
    const results = recommend(input);
    expect(results.length).toBe(1);
    // safetyScore = 10/10 = 1.0, weighted 0.6 * 1.0 = 0.6
    // costScore = 1 - 400/1000 = 0.6, weighted 0.2 * 0.6 = 0.12
    // distanceScore = 1 - 0/20 = 1.0, weighted 0.2 * 1.0 = 0.2
    // total = 0.6 + 0.12 + 0.2 = 0.92
    expect(results[0].score).toBeCloseTo(0.92, 2);
  });
});
