"use client";

import * as React from "react";
import { Search, MapPin, LocateFixed, Navigation } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { BODHI_CENTERS, type Center } from "./centers-data";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Extract city name from the address (last segment after the last comma). */
function getCity(center: Center): string {
  const parts = center.address.split(",").map((s) => s.trim());
  const last = parts[parts.length - 1];
  if (last === "Bengaluru") return "Bangalore";
  return last;
}

/** Build city → center-names map from the full list. */
function groupByCity(centers: Center[]) {
  const map = new Map<string, Center[]>();
  for (const c of centers) {
    const city = getCity(c);
    if (!map.has(city)) map.set(city, []);
    map.get(city)!.push(c);
  }
  return map;
}

/** Haversine distance in km. */
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

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface LocationFilterBarProps {
  centers?: Center[];
  onCityChange?: (city: string) => void;
  onCenterChange?: (centerId: string) => void;
  onPincodeSearch?: (pincode: string) => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function LocationFilterBar({
  centers = BODHI_CENTERS,
  onCityChange,
  onCenterChange,
  onPincodeSearch,
  className,
}: LocationFilterBarProps) {
  const cityMap = React.useMemo(() => groupByCity(centers), [centers]);
  const cities = React.useMemo(() => Array.from(cityMap.keys()), [cityMap]);

  const [activeCity, setActiveCity] = React.useState(cities[0] ?? "");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<{
    type: "match" | "nearest" | "error";
    center?: Center;
    distance?: number;
  } | null>(null);
  const [userLocation, setUserLocation] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [userAddress, setUserAddress] = React.useState<string | null>(null);
  const [locating, setLocating] = React.useState(false);

  const centersForCity = cityMap.get(activeCity) ?? [];

  const handleCityClick = (city: string) => {
    setActiveCity(city);
    setSearchResult(null);
    onCityChange?.(city);
  };

  // Reverse geocode
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
          const parts = data.display_name.split(", ");
          setUserAddress(parts.slice(0, 4).join(", "));
        }
      } catch {
        // silently fail
      }
    },
    [],
  );

  const handleLocate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
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
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const findNearestCenter = (
    loc: { lat: number; lng: number } | null,
  ): { center: Center; distance: number } | null => {
    if (!loc) return null;
    let nearest: Center | null = null;
    let minDist = Infinity;
    for (const c of centers) {
      const d = getDistanceKm(loc.lat, loc.lng, c.lat, c.lng);
      if (d < minDist) {
        minDist = d;
        nearest = c;
      }
    }
    return nearest ? { center: nearest, distance: minDist } : null;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSearchResult(null);
      return;
    }

    onPincodeSearch?.(query);

    // Match by pincode, name, or address
    const match = centers.find(
      (c) =>
        c.pincode === query ||
        c.name.toLowerCase().includes(query) ||
        c.address.toLowerCase().includes(query),
    );

    if (match) {
      setSearchResult({ type: "match", center: match });
      // Switch city to the matched center's city
      const matchCity = getCity(match);
      if (matchCity !== activeCity) {
        setActiveCity(matchCity);
        onCityChange?.(matchCity);
      }
      onCenterChange?.(match.id);
    } else {
      // No match — find nearest
      const nearest = findNearestCenter(userLocation);
      if (nearest) {
        setSearchResult({
          type: "nearest",
          center: nearest.center,
          distance: nearest.distance,
        });
      } else {
        setSearchResult({ type: "error" });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Label */}
      <p className="text-body-sm font-medium uppercase tracking-wide text-text-secondary">
        Sort courses according to location
      </p>

      {/* Filter row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
        {/* City pills */}
        <div className="flex items-center gap-2">
          {cities.map((city) => {
            const isActive = city === activeCity;
            return (
              <button
                key={city}
                type="button"
                onClick={() => handleCityClick(city)}
                className={cn(
                  "rounded-xl px-6 py-2.5 text-body-md font-medium transition-colors",
                  isActive
                    ? "bg-brand-primary text-text-inverse"
                    : "bg-surface-2 text-text-primary hover:bg-border-2",
                )}
              >
                {city}
              </button>
            );
          })}
        </div>

        {/* OR separator */}
        <span className="hidden text-body-md text-text-tertiary lg:block">
          OR
        </span>

        {/* Area / center dropdown */}
        <Select
          key={activeCity}
          defaultValue={centersForCity[0]?.name}
          onValueChange={(v) => {
            if (v) onCenterChange?.(v);
          }}
        >
          <SelectTrigger className="h-auto rounded-xl border-border-3 bg-surface-1 px-5 w-auto py-2.5 text-body-md text-text-primary shadow-none hover:border-brand-primary focus-visible:border-brand-primary focus-visible:ring-brand-primary/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            alignItemWithTrigger={false}
            className="w-auto min-w-[260px] rounded-xl p-1.5"
          >
            {centersForCity.map((center) => (
              <SelectItem
                key={center.id}
                value={center.name}
                className="rounded-lg py-2.5 pr-10 pl-3 text-body-md"
              >
                {center.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search + Locate */}
        <div className="flex items-center gap-2 lg:ml-auto">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search by location or pincode"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (searchResult) setSearchResult(null);
              }}
              className="w-full rounded-xl border border-border-3 bg-surface-1 py-2.5 pl-5 pr-12 text-body-md text-text-primary placeholder:text-text-tertiary outline-none transition-colors hover:border-brand-primary focus:border-brand-primary focus:ring-1 focus:ring-brand-primary lg:w-[340px]"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-2 text-brand-primary transition-colors hover:bg-brand-lite"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
          </form>

          <button
            type="button"
            onClick={handleLocate}
            disabled={locating}
            className={cn(
              "flex items-center gap-1.5 rounded-xl border border-border-3 bg-surface-1 px-4 py-2.5 text-body-sm font-medium text-text-secondary transition-colors hover:border-brand-primary hover:text-text-brand",
              locating && "opacity-60 cursor-not-allowed",
            )}
            title="Detect my location"
          >
            <LocateFixed className="h-4 w-4" />
            <span className="hidden sm:inline">
              {locating ? "Locating…" : userLocation ? "Located" : "My location"}
            </span>
          </button>
        </div>
      </div>

      {/* User location address */}
      {userAddress && (
        <div className="flex items-center gap-2 text-body-sm text-text-secondary">
          <LocateFixed className="h-3.5 w-3.5 shrink-0 text-text-brand" />
          <span>
            You are located at —{" "}
            <span className="font-medium text-text-primary">{userAddress}</span>
          </span>
        </div>
      )}

      {/* Search result feedback */}
      {searchResult && (
        <div className="rounded-2xl border border-border-2 bg-surface-0/60 p-4">
          {searchResult.type === "match" && searchResult.center && (
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-text-brand" />
              <div className="flex-1">
                <p className="text-body-sm font-semibold text-text-primary">
                  {searchResult.center.name}
                </p>
                <p className="mt-0.5 text-xs text-text-tertiary">
                  {searchResult.center.address} — {searchResult.center.pincode}
                </p>
                {userLocation && (
                  <p className="mt-1 text-xs font-medium text-text-brand">
                    {formatDistance(
                      getDistanceKm(
                        userLocation.lat,
                        userLocation.lng,
                        searchResult.center.lat,
                        searchResult.center.lng,
                      ),
                    )}{" "}
                    from your location
                  </p>
                )}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${searchResult.center.lat},${searchResult.center.lng}${userLocation ? `&origin=${userLocation.lat},${userLocation.lng}` : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-text-brand hover:underline"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Get directions
                </a>
              </div>
            </div>
          )}

          {searchResult.type === "nearest" && searchResult.center && (
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <div className="flex-1">
                <p className="text-body-sm text-text-secondary">
                  No center found in this area. The nearest center to you is:
                </p>
                <p className="mt-1.5 text-body-sm font-semibold text-text-primary">
                  {searchResult.center.name}
                </p>
                <p className="mt-0.5 text-xs text-text-tertiary">
                  {searchResult.center.address} — {searchResult.center.pincode}
                </p>
                {searchResult.distance != null && (
                  <p className="mt-1 text-xs font-medium text-text-brand">
                    {formatDistance(searchResult.distance)} from your location
                  </p>
                )}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${searchResult.center.lat},${searchResult.center.lng}${userLocation ? `&origin=${userLocation.lat},${userLocation.lng}` : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-text-brand hover:underline"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Get directions
                </a>
              </div>
            </div>
          )}

          {searchResult.type === "error" && (
            <p className="text-body-sm text-text-tertiary">
              No center found for &quot;{searchQuery.trim()}&quot;. Enable your
              location to find the nearest center.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
