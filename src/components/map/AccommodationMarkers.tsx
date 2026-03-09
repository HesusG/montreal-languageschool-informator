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
    width: 22px; height: 22px;
    background: ${MARKER_COLORS.accommodation};
    border: 2px solid #000;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 1px 1px 0 #000;
  "><span style="transform: rotate(45deg); font-size: 11px; color: #fff; font-weight: bold;">H</span></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
  popupAnchor: [0, -22],
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
