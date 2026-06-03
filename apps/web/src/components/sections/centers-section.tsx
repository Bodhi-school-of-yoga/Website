"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Search, Navigation, MapPin, LocateFixed, X, Map } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePromoBanner } from "@/components/ui/use-promo-banner";

import { BODHI_CENTERS, type Center } from "./centers-data";

const CentersMap = dynamic(() => import("./centers-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] w-full items-center justify-center bg-surface-2 text-text-tertiary">
      Loading map…
    </div>
  ),
});

/** Haversine distance in km between two lat/lng points. */
function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export type CentersSectionProps = {
  heading?: string;
  subtitle?: string;
  pincodePlaceholder?: string;
  pincodeCtaLabel?: string;
  cityLabel?: string;
  centers?: Center[];
  className?: string;
};

export function CentersSection({
  heading = "Our Centers",
  subtitle = "Every woman holds the power to heal, rise, and lead — and yoga is the path that makes this transformation real.",
  pincodePlaceholder = "Search by location name or pincode",
  pincodeCtaLabel = "Search",
  cityLabel = "Alwal, Secunderabad, Hyderabad",
  centers = BODHI_CENTERS,
  className,
}: CentersSectionProps) {
  const { visible: bannerVisible } = usePromoBanner();
  const [pincode, setPincode] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(
    centers[0]?.id ?? null,
  );
  const [searchMessage, setSearchMessage] = React.useState<{
    type: "error" | "suggestion";
    text: string;
    nearestId?: string;
  } | null>(null);
  const [userLocation, setUserLocation] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locating, setLocating] = React.useState(false);
  const [locationError, setLocationError] = React.useState<string | null>(null);
  const [userAddress, setUserAddress] = React.useState<string | null>(null);
  const [showDirections, setShowDirections] = React.useState(false);

  const selectedCenter = centers.find((c) => c.id === selectedId) ?? null;

  // Distances from user to each center
  const distances = React.useMemo(() => {
    if (!userLocation) return null;
    const map: Record<string, number> = {};
    for (const c of centers) {
      map[c.id] = getDistanceKm(
        userLocation.lat,
        userLocation.lng,
        c.lat,
        c.lng,
      );
    }
    return map;
  }, [userLocation, centers]);

  // Sort centers by distance when user location is available
  const sortedCenters = React.useMemo(() => {
    if (!distances) return centers;
    return [...centers].sort(
      (a, b) => (distances[a.id] ?? 0) - (distances[b.id] ?? 0),
    );
  }, [centers, distances]);

  // Reverse geocode user location to get address
  const reverseGeocode = React.useCallback(
    async (lat: number, lng: number) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
          { headers: { "Accept-Language": "en" } },
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.display_name) {
          // Shorten the address: take the first 3-4 meaningful parts
          const parts = data.display_name.split(", ");
          setUserAddress(parts.slice(0, 4).join(", "));
        }
      } catch {
        // Silently fail — address is not critical
      }
    },
    [],
  );

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(coords);
        setLocating(false);
        reverseGeocode(coords.lat, coords.lng);
      },
      () => {
        setLocationError(
          "Unable to get your location. Please allow location access.",
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const findNearestCenter = (): { center: Center; distance: number } | null => {
    if (!distances) return null;
    let nearest: Center | null = null;
    let minDist = Infinity;
    for (const c of centers) {
      const d = distances[c.id];
      if (d < minDist) {
        minDist = d;
        nearest = c;
      }
    }
    return nearest ? { center: nearest, distance: minDist } : null;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = pincode.trim().toLowerCase();
    if (!query) {
      setSearchMessage(null);
      return;
    }

    // Match by pincode OR location/center name
    const match = centers.find(
      (c) =>
        c.pincode === query ||
        c.name.toLowerCase().includes(query) ||
        c.address.toLowerCase().includes(query),
    );

    if (match) {
      setSelectedId(match.id);
      setSearchMessage(null);
    } else {
      // No match — suggest nearest center if user location is available
      const nearest = findNearestCenter();
      if (nearest) {
        setSearchMessage({
          type: "suggestion",
          text: `No center found in this area. The nearest center to you is ${nearest.center.name}, ${formatDistance(nearest.distance)} away.`,
          nearestId: nearest.center.id,
        });
      } else {
        setSearchMessage({
          type: "error",
          text: `No center found for "${pincode.trim()}". Try enabling your location to find the nearest center.`,
        });
      }
    }
  };

  const getDirectionsEmbedUrl = (center: Center) => {
    if (userLocation) {
      return `https://www.google.com/maps?saddr=${userLocation.lat},${userLocation.lng}&daddr=${center.lat},${center.lng}&output=embed`;
    }
    return `https://www.google.com/maps?q=${center.lat},${center.lng}&output=embed`;
  };

  const getDirectionsLinkUrl = (center: Center) => {
    if (userLocation) {
      return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${center.lat},${center.lng}`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
  };

  return (
    <section
      className={cn(
        "w-full bg-[linear-gradient(180deg,var(--color-surface-0),var(--color-surface-1))]",
        bannerVisible ? "pt-44 pb-20" : "pt-32 pb-20",
        className,
      )}
    >
      <div className="mx-auto max-w-[1200px] page-px">
        <header className="mb-8 lg:mb-10">
          <h1
            className={cn(
              "font-heading text-text-primary",
              "text-h4 sm:text-h3 lg:text-h2 2xl:text-h1",
            )}
          >
            {heading}
          </h1>
          {subtitle ? (
            <p className="mt-3 max-w-3xl text-subtext-1 text-text-tertiary">
              {subtitle}
            </p>
          ) : null}
        </header>

        {/* Search + Locate row */}
        <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <form
            onSubmit={handleSubmit}
            className={cn(
              "flex flex-1 h-[64px] items-center gap-4 rounded-[18px] border border-border-2 bg-surface-1/85 px-6 backdrop-blur-[30px]",
              "lg:h-[72px]",
            )}
          >
            <Search aria-hidden className="h-5 w-5 text-text-tertiary" />
            <input
              type="text"
              value={pincode}
              onChange={(event) => {
                setPincode(event.target.value);
                if (searchMessage) setSearchMessage(null);
              }}
              placeholder={pincodePlaceholder}
              className={cn(
                "w-full bg-transparent text-subtext-1 text-text-primary outline-none",
                "placeholder:text-text-tertiary/70",
              )}
            />
            <button
              type="submit"
              className={cn(
                "rounded-full bg-brand-primary px-5 py-2.5 text-body-sm font-semibold text-text-inverse",
                "transition-all duration-200 hover:brightness-105",
              )}
            >
              {pincodeCtaLabel}
            </button>
          </form>

          <button
            type="button"
            onClick={handleLocate}
            disabled={locating}
            className={cn(
              "flex h-[64px] items-center gap-2 rounded-[18px] border border-border-2 bg-surface-1/85 px-6 backdrop-blur-[30px]",
              "text-body-sm font-medium text-text-secondary transition-all duration-200 hover:text-text-brand",
              "lg:h-[72px]",
              locating && "opacity-60 cursor-not-allowed",
            )}
          >
            <LocateFixed className="h-5 w-5" />
            {locating
              ? "Locating…"
              : userLocation
                ? "Location found"
                : "Use my location"}
          </button>
        </div>

        {/* User location address */}
        {userAddress && (
          <div className="mt-2 mb-1 flex items-center gap-2 text-body-sm text-text-secondary">
            <LocateFixed className="h-4 w-4 shrink-0 text-text-brand" />
            <span>
              You are located at —{" "}
              <span className="font-medium text-text-primary">
                {userAddress}
              </span>
            </span>
          </div>
        )}

        <div className="mb-6 min-h-[20px] lg:mb-8">
          {searchMessage ? (
            <div role="alert">
              <p className="text-mini text-text-tertiary">
                {searchMessage.text}
              </p>
              {searchMessage.nearestId && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(searchMessage.nearestId!);
                    setSearchMessage(null);
                  }}
                  className="mt-1 text-mini font-medium text-text-brand underline underline-offset-2 hover:text-text-brand/80"
                >
                  View this center
                </button>
              )}
            </div>
          ) : null}
          {locationError ? (
            <p role="alert" className="text-mini text-text-tertiary">
              {locationError}
            </p>
          ) : null}
        </div>

        <div
          className={cn(
            "grid min-h-[560px] grid-cols-1 overflow-hidden rounded-[36px] border border-border-2 bg-surface-1/85 backdrop-blur-[30px]",
            "lg:min-h-[640px] lg:grid-cols-[2fr_3fr]",
          )}
        >
          {/* Side panel – center list */}
          <div className="flex flex-col p-6 sm:p-8 lg:border-r lg:border-border-2">
            <p className="text-body-sm text-text-tertiary">
              {cityLabel}
            </p>
            <ul className="mt-4 flex-1 overflow-y-auto">
              {sortedCenters.map((center, index) => {
                const isSelected = center.id === selectedId;
                const dist = distances?.[center.id];
                return (
                  <li key={center.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(center.id);
                        setShowDirections(false);
                      }}
                      aria-pressed={isSelected}
                      className={cn(
                        "w-full py-3 text-left",
                        "transition-colors duration-150",
                        isSelected
                          ? "text-text-brand"
                          : "text-text-secondary hover:text-text-brand",
                        index < sortedCenters.length - 1
                          ? "border-b border-sage-divider-soft"
                          : "",
                      )}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-subtext-2">
                          <MapPin className="h-4 w-4 shrink-0" />
                          {center.name}
                        </span>
                        {dist != null && (
                          <span className="shrink-0 text-xs text-text-tertiary">
                            {formatDistance(dist)}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Selected center info + actions */}
            {selectedCenter && (
              <div className="mt-4 rounded-2xl border border-border-2 bg-surface-0/60 p-4">
                <p className="text-body-sm font-semibold text-text-primary">
                  {selectedCenter.name}
                </p>
                <p className="mt-1 text-xs text-text-tertiary">
                  {selectedCenter.address} — {selectedCenter.pincode}
                </p>
                {distances?.[selectedCenter.id] != null && (
                  <p className="mt-1 text-xs font-medium text-text-brand">
                    {formatDistance(distances[selectedCenter.id])} away
                  </p>
                )}
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDirections((prev) => !prev)}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5",
                      "text-body-sm font-semibold transition-all duration-200",
                      showDirections
                        ? "bg-surface-2 text-text-secondary hover:bg-surface-2/80"
                        : "bg-brand-primary text-text-inverse hover:brightness-105",
                    )}
                  >
                    {showDirections ? (
                      <>
                        <Map className="h-4 w-4" />
                        Show Map
                      </>
                    ) : (
                      <>
                        <Navigation className="h-4 w-4" />
                        Get Directions
                      </>
                    )}
                  </button>
                  {showDirections && (
                    <a
                      href={getDirectionsLinkUrl(selectedCenter)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-full bg-brand-primary px-4 py-2.5",
                        "text-body-sm font-semibold text-text-inverse",
                        "transition-all duration-200 hover:brightness-105",
                      )}
                    >
                      Open in Google Maps
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Map / Directions panel */}
          <div className="relative min-h-[320px] bg-surface-2 lg:min-h-full">
            {showDirections && selectedCenter ? (
              <div className="relative h-full w-full">
                <button
                  type="button"
                  onClick={() => setShowDirections(false)}
                  className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
                  aria-label="Close directions"
                >
                  <X className="h-4 w-4" />
                </button>
                <iframe
                  title={`Directions to ${selectedCenter.name}`}
                  src={getDirectionsEmbedUrl(selectedCenter)}
                  className="h-full w-full border-0"
                  style={{ minHeight: "320px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <CentersMap
                centers={centers}
                selectedId={selectedId}
                onSelect={(id) => {
                  setSelectedId(id);
                  setShowDirections(false);
                }}
                userLocation={userLocation}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
