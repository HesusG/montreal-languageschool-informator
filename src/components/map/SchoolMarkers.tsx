import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { School } from '../../types';
import { SchoolPopup } from './MarkerPopup';
import { MARKER_COLORS } from '../../lib/constants';

interface SchoolMarkersProps {
  schools: School[];
  onCompare: (school: School) => void;
  onSelect: (school: School) => void;
  compareList: School[];
}

const schoolIcon = L.divIcon({
  className: '',
  html: `<div style="
    width: 28px; height: 28px;
    background: ${MARKER_COLORS.school};
    border: 2px solid #000;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    display: flex; align-items: center; justify-content: center;
  "><span style="transform: rotate(45deg); font-size: 14px;">🎓</span></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

export function SchoolMarkers({ schools, onCompare, onSelect, compareList }: SchoolMarkersProps) {
  return (
    <>
      {schools.map((school) => (
        <Marker key={school.id} position={[school.lat, school.lng]} icon={schoolIcon}>
          <Popup>
            <SchoolPopup
              school={school}
              onCompare={onCompare}
              onSelect={onSelect}
              isInCompare={compareList.some((s) => s.id === school.id)}
            />
          </Popup>
        </Marker>
      ))}
    </>
  );
}
