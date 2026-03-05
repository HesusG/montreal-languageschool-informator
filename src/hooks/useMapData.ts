import { useState, useEffect } from 'react';
import type { School, Accommodation, SafetyZone } from '../types';
import { isValidSchool, isValidAccommodation, isValidSafetyData, isValidSafetyZone, filterValid } from '../lib/validate';

interface MapData {
  schools: School[];
  accommodations: Accommodation[];
  safetyZones: SafetyZone[];
  lastScraped: string | null;
}

interface UseMapDataReturn {
  data: MapData;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

const BASE = import.meta.env.BASE_URL;

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(BASE + path);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.json();
}

function findLastScraped(schools: School[], accommodations: Accommodation[]): string | null {
  let latest: string | null = null;
  for (const item of [...schools, ...accommodations]) {
    if (item.lastScraped && (!latest || item.lastScraped > latest)) {
      latest = item.lastScraped;
    }
  }
  return latest;
}

export function useMapData(): UseMapDataReturn {
  const [data, setData] = useState<MapData>({
    schools: [],
    accommodations: [],
    safetyZones: [],
    lastScraped: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [rawSchools, rawAccom, rawSafety] = await Promise.all([
          fetchJson<unknown[]>('data/schools.json'),
          fetchJson<unknown[]>('data/accommodations.json'),
          fetchJson<unknown>('data/safety.json'),
        ]);

        if (cancelled) return;

        const schools = filterValid(rawSchools, isValidSchool);
        const accommodations = filterValid(rawAccom, isValidAccommodation);

        let safetyZones: SafetyZone[] = [];
        if (isValidSafetyData(rawSafety)) {
          safetyZones = filterValid(rawSafety.zones, isValidSafetyZone);
        }

        setData({
          schools,
          accommodations,
          safetyZones,
          lastScraped: findLastScraped(schools, accommodations),
        });
      } catch (err) {
        if (!cancelled) {
          setError('No se pudieron cargar los datos. Recarga la pagina.');
          console.error(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [retryCount]);

  return { data, loading, error, retry: () => setRetryCount((c) => c + 1) };
}
