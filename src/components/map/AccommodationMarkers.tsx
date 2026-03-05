import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Accommodation } from '../../types';
import { AccommodationPopup } from './MarkerPopup';
import { MARKER_COLORS } from '../../lib/constants';

interface AccommodationMarkersProps {
  accommodations: Accommodation[];
}

const accomIcon = L.divIcon({
  className: '',
  html: `<div style="
    width: 28px; height: 28px;
    background: ${MARKER_COLORS.accommodation};
    border: 2px solid #000;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    display: flex; align-items: center; justify-content: center;
  "><span style="transform: rotate(45deg); font-size: 14px;">🏠</span></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

export function AccommodationMarkers({ accommodations }: AccommodationMarkersProps) {
  return (
    <>
      {accommodations.map((a) => (
        <Marker key={a.id} position={[a.lat, a.lng]} icon={accomIcon}>
          <Popup>
            <AccommodationPopup accommodation={a} />
          </Popup>
        </Marker>
      ))}
    </>
  );
}
