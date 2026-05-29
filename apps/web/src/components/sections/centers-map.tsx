"use client";

import * as React from "react";
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  type MapRef,
} from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import { Layers } from "lucide-react";

import "maplibre-gl/dist/maplibre-gl.css";

import { cn } from "@/lib/utils";

import type { Center } from "./centers-data";

export type MapStyleMode = "standard" | "satellite";

type CentersMapProps = {
  centers: Center[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  userLocation: { lat: number; lng: number } | null;
};

const HYDERABAD_CENTER = { latitude: 17.45, longitude: 78.45 };

// Free tile styles — no API key required
const STANDARD_STYLE = "https://tiles.openfreemap.org/styles/liberty";

const SATELLITE_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "Esri, Maxar, Earthstar Geographics",
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "satellite-tiles",
      type: "raster",
      source: "satellite",
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

export default function CentersMap({
  centers,
  selectedId,
  onSelect,
  userLocation,
}: CentersMapProps) {
  const mapRef = React.useRef<MapRef>(null);
  const [popupId, setPopupId] = React.useState<string | null>(null);
  const [styleMode, setStyleMode] = React.useState<MapStyleMode>("standard");

  // Fly to selected center with 3D tilt
  React.useEffect(() => {
    if (!selectedId || !mapRef.current) return;
    const center = centers.find((c) => c.id === selectedId);
    if (!center) return;
    mapRef.current.flyTo({
      center: [center.lng, center.lat],
      zoom: 15,
      pitch: 55,
      bearing: -15,
      duration: 1200,
    });
    setPopupId(selectedId);
  }, [selectedId, centers]);

  // Add 3D buildings layer once the standard style loads
  const handleStyleLoad = React.useCallback(() => {
    if (styleMode !== "standard") return;
    const map = mapRef.current?.getMap();
    if (!map) return;

    const style = map.getStyle();
    if (!style?.sources) return;
    if (map.getLayer("3d-buildings")) return;

    const buildingSource = Object.keys(style.sources).find(
      (s) =>
        s === "openmaptiles" || s === "maptiler_planet" || s === "composite",
    );
    if (!buildingSource) return;

    const layers = style.layers ?? [];
    let labelLayerId: string | undefined;
    for (const layer of layers) {
      if (
        "layout" in layer &&
        layer.layout &&
        "text-field" in layer.layout
      ) {
        labelLayerId = layer.id;
        break;
      }
    }

    map.addLayer(
      {
        id: "3d-buildings",
        source: buildingSource,
        "source-layer": "building",
        type: "fill-extrusion",
        minzoom: 13,
        paint: {
          "fill-extrusion-color": "#d4c9b8",
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            13,
            0,
            15.05,
            ["coalesce", ["get", "render_height"], 12],
          ],
          "fill-extrusion-base": [
            "coalesce",
            ["get", "render_min_height"],
            0,
          ],
          "fill-extrusion-opacity": 0.7,
        },
      },
      labelLayerId,
    );
  }, [styleMode]);

  const currentStyle =
    styleMode === "satellite" ? SATELLITE_STYLE : STANDARD_STYLE;

  return (
    <div className="relative h-full w-full" style={{ minHeight: "320px" }}>
      <MapGL
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={{
          ...HYDERABAD_CENTER,
          zoom: 10,
          pitch: 40,
          bearing: 0,
        }}
        style={{ width: "100%", height: "100%", minHeight: "320px" }}
        mapStyle={currentStyle}
        maxPitch={70}
        onLoad={handleStyleLoad}
        attributionControl={{ compact: true }}
      >
        <NavigationControl position="top-right" visualizePitch />

        {/* Center markers */}
        {centers.map((c) => {
          const isSelected = c.id === selectedId;
          return (
            <React.Fragment key={c.id}>
              <Marker
                latitude={c.lat}
                longitude={c.lng}
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  onSelect(c.id);
                  setPopupId(c.id);
                }}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-lg transition-transform duration-200 ${
                    isSelected
                      ? "scale-125 border-white bg-brand-primary"
                      : "border-white bg-red-500 hover:scale-110"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 3.827 3.024ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Marker>

              {popupId === c.id && (
                <Popup
                  latitude={c.lat}
                  longitude={c.lng}
                  anchor="bottom"
                  offset={35}
                  closeOnClick={false}
                  onClose={() => setPopupId(null)}
                  className="[&_.maplibregl-popup-content]:rounded-xl [&_.maplibregl-popup-content]:px-4 [&_.maplibregl-popup-content]:py-3 [&_.maplibregl-popup-content]:shadow-xl"
                >
                  <div className="font-sans">
                    <div className="text-sm font-semibold">{c.name}</div>
                    <div className="mt-1 text-xs text-gray-600">
                      {c.address}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      PIN {c.pincode}
                    </div>
                  </div>
                </Popup>
              )}
            </React.Fragment>
          );
        })}

        {/* User location blue pulse */}
        {userLocation && (
          <Marker
            latitude={userLocation.lat}
            longitude={userLocation.lng}
            anchor="center"
          >
            <div className="relative">
              <div className="absolute -inset-2 animate-ping rounded-full bg-blue-400/40" />
              <div className="h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" />
            </div>
          </Marker>
        )}
      </MapGL>

      {/* Map style toggle */}
      <div className="absolute bottom-4 left-4 z-10">
        <button
          type="button"
          onClick={() =>
            setStyleMode((m) => (m === "standard" ? "satellite" : "standard"))
          }
          className={cn(
            "flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-sm transition-all duration-200",
            styleMode === "satellite"
              ? "bg-white/90 text-gray-800 hover:bg-white"
              : "bg-gray-800/80 text-white hover:bg-gray-800/90",
          )}
        >
          <Layers className="h-4 w-4" />
          {styleMode === "satellite" ? "Standard" : "Satellite"}
        </button>
      </div>
    </div>
  );
}
