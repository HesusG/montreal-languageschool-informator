import { useState, useMemo } from 'react';
import type { School, Accommodation, SafetyZone, CityId } from '../types';
import { recommend, type ScoredCombo } from '../lib/scoring';

interface UseRecommenderReturn {
  budgetPerWeek: number;
  setBudgetPerWeek: (v: number) => void;
  priority: 'costo' | 'distancia' | 'seguridad';
  setPriority: (v: 'costo' | 'distancia' | 'seguridad') => void;
  results: ScoredCombo[];
  noResults: boolean;
}

export function useRecommender(
  schools: School[],
  accommodations: Accommodation[],
  safetyZones: SafetyZone[],
  activeCity: CityId,
): UseRecommenderReturn {
  const [budgetPerWeek, setBudgetPerWeek] = useState(500);
  const [priority, setPriority] = useState<'costo' | 'distancia' | 'seguridad'>('costo');

  const citySchools = useMemo(() => schools.filter((s) => s.city === activeCity), [schools, activeCity]);
  const cityAccom = useMemo(() => accommodations.filter((a) => a.city === activeCity), [accommodations, activeCity]);
  const cityZones = useMemo(() => safetyZones.filter((z) => z.city === activeCity), [safetyZones, activeCity]);

  const results = useMemo(
    () => recommend({ schools: citySchools, accommodations: cityAccom, safetyZones: cityZones, budgetPerWeekCAD: budgetPerWeek, priority }),
    [citySchools, cityAccom, cityZones, budgetPerWeek, priority],
  );

  return {
    budgetPerWeek,
    setBudgetPerWeek,
    priority,
    setPriority,
    results,
    noResults: results.length === 0,
  };
}
