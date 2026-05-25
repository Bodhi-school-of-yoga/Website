"use client";

import * as React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import type { Center } from "./centers-data";

// Fix Leaflet's default icon paths — assets live in /public/leaflet/.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

type CentersMapProps = {
  centers: Center[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

function FlyToSelected({
  centers,
  selectedId,
}: {
  centers: Center[];
  selectedId: string | null;
}) {
  const map = useMap();
  React.useEffect(() => {
    if (!selectedId) return;
    const center = centers.find((c) => c.id === selectedId);
    if (!center) return;
    map.flyTo([center.lat, center.lng], 14, { duration: 0.8 });
  }, [selectedId, centers, map]);
  return null;
}

const HYDERABAD_CENTER: [number, number] = [17.45, 78.45];

export default function CentersMap({
  centers,
  selectedId,
  onSelect,
}: CentersMapProps) {
  const markerRefs = React.useRef<Record<string, L.Marker | null>>({});

  React.useEffect(() => {
    if (!selectedId) return;
    const marker = markerRefs.current[selectedId];
    if (marker) {
      marker.openPopup();
    }
  }, [selectedId]);

  return (
    <MapContainer
      center={HYDERABAD_CENTER}
      zoom={10}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ minHeight: "320px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToSelected centers={centers} selectedId={selectedId} />
      {centers.map((c) => (
        <Marker
          key={c.id}
          position={[c.lat, c.lng]}
          ref={(ref) => {
            markerRefs.current[c.id] = ref;
          }}
          eventHandlers={{
            click: () => onSelect(c.id),
          }}
        >
          <Popup>
            <div className="font-sans">
              <div className="text-sm font-semibold">{c.name}</div>
              <div className="mt-1 text-xs text-gray-600">{c.address}</div>
              <div className="mt-1 text-xs text-gray-500">PIN {c.pincode}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
