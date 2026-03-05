import type { CityId } from '../types';

export const CITY_CONFIG: Record<CityId, {
  label: string;
  center: [number, number];
  zoom: number;
  bounds: [[number, number], [number, number]];
}> = {
  montreal: {
    label: 'Montreal',
    center: [45.5017, -73.5673],
    zoom: 13,
    bounds: [[45.40, -73.75], [45.62, -73.47]],
  },
  quebec: {
    label: 'Quebec',
    center: [46.8139, -71.2080],
    zoom: 13,
    bounds: [[46.74, -71.35], [46.89, -71.10]],
  },
};

export const MAP_CONFIG = {
  minZoom: 10,
  maxZoom: 18,
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

export const MARKER_COLORS = {
  school: '#1E88E5',
  accommodation: '#8E24AA',
  walking: '#FE4A49',
};

export const SAFETY_COLORS = {
  green: '#4CAF50',
  yellow: '#FFC107',
  red: '#F44336',
  opacity: 0.25,
};

export const WALKING_SPEEDS = {
  urbanFactor: 1.3,
  speedKmH: 5,
  speedMPerMin: 83.33,
};

export const BUDGET_LIMITS = {
  min: 100,
  max: 10000,
};
