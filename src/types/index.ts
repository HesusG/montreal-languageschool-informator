export interface School {
  id: string;
  city: 'montreal' | 'quebec';
  name: string;
  type: 'private' | 'university';
  address?: string;
  neighborhood?: string;
  lat: number;
  lng: number;
  levels?: string[];
  modalities?: string[];
  intensity?: 'intensivo' | 'semi-intensivo' | 'regular';
  hoursPerWeek?: number;
  durationWeeks?: number[];
  pricePerWeekCAD: number | null;
  website: string;
  notes?: string;
  lastScraped?: string;
}

export interface Accommodation {
  id: string;
  city: 'montreal' | 'quebec';
  name: string;
  type: 'university' | 'hostel' | 'residence' | 'hotel';
  address?: string;
  neighborhood?: string;
  lat: number;
  lng: number;
  pricePerNightCAD?: number;
  pricePerWeekCAD: number | null;
  amenities?: string[];
  minStayNights?: number;
  bookingUrl?: string;
  summerOnly?: boolean;
  notes?: string;
  lastScraped?: string;
}

export interface SafetyZone {
  city: 'montreal' | 'quebec';
  neighborhood: string;
  level: number;
  center: { lat: number; lng: number };
  radiusMeters: number;
  notes?: string;
}

export interface SafetyData {
  metadata: { source: string; generatedAt: string };
  zones: SafetyZone[];
}

export type CityId = 'montreal' | 'quebec';
export type WalkingMinutes = 5 | 10 | 15 | 20;
export type PanelMode = 'closed' | 'comparator' | 'recommender';

export interface Layers {
  schools: boolean;
  accommodations: boolean;
  safety: boolean;
}
