"use client";

import * as React from "react";
import Image from "next/image";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

export type CentersSectionProps = {
  heading?: string;
  subtitle?: string;
  pincodePlaceholder?: string;
  pincodeCtaLabel?: string;
  cityLabel?: string;
  locations?: string[];
  mapImageSrc?: string;
  mapImageAlt?: string;
  className?: string;
};

const DEFAULT_LOCATIONS = [
  "Alwal Hills",
  "Bachupally",
  "Bandlaguda",
  "Beeramguda",
  "ESI Erragadda",
  "HSR Layout",
  "Indiranagar",
  "Khairatabad Hyderabad",
  "Raghavendra Nagar Kondapur",
  "KPHB Hyderabad",
];

export function CentersSection({
  heading = "Our Centers",
  subtitle = "Every woman holds the power to heal, rise, and lead — and yoga is the path that makes this transformation real.",
  pincodePlaceholder = "Enter your pincode to find nearby centers",
  pincodeCtaLabel = "Search",
  cityLabel = "Alwal, Secunderabad, Hyderabad",
  locations = DEFAULT_LOCATIONS,
  mapImageSrc = "/images/centers/map-placeholder.jpg",
  mapImageAlt = "Map of Bodhi centers in Hyderabad",
  className,
}: CentersSectionProps) {
  const [pincode, setPincode] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Pincode submitted:", pincode);
  };

  return (
    <section
      className={cn(
        "w-full bg-[linear-gradient(180deg,var(--color-surface-0),var(--color-surface-1))]",
        "pt-32 pb-20",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl page-px">
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

        <form
          onSubmit={handleSubmit}
          className={cn(
            "mb-6 lg:mb-8",
            "flex h-[64px] items-center gap-4 rounded-[18px] border border-border-2 bg-surface-1/85 px-6 backdrop-blur-[30px]",
            "lg:h-[72px]",
          )}
        >
          <Search aria-hidden className="h-5 w-5 text-text-tertiary" />
          <input
            type="text"
            value={pincode}
            onChange={(event) => setPincode(event.target.value)}
            placeholder={pincodePlaceholder}
            className={cn(
              "w-full bg-transparent text-subtext-1 text-text-tertiary outline-none",
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

        <div
          className={cn(
            "grid min-h-[560px] grid-cols-1 overflow-hidden rounded-[36px] border border-border-2 bg-surface-1/85 backdrop-blur-[30px]",
            "lg:min-h-[640px] lg:grid-cols-[2fr_3fr]",
          )}
        >
          <div className="flex flex-col p-6 sm:p-8 lg:border-r lg:border-border-2">
            <p className="text-mini uppercase tracking-wide text-text-tertiary">
              {cityLabel}
            </p>
            <ul className="mt-4 flex-1 overflow-y-auto">
              {locations.map((location, index) => (
                <li key={location}>
                  <button
                    type="button"
                    onClick={() => console.log("Location selected:", location)}
                    className={cn(
                      "w-full py-3 text-left text-subtext-2 text-text-secondary",
                      "transition-colors duration-150 hover:text-text-brand",
                      index < locations.length - 1
                        ? "border-b border-sage-divider-soft"
                        : "",
                    )}
                  >
                    {location}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[320px] bg-surface-2 lg:min-h-full">
            <Image
              src={mapImageSrc}
              alt={mapImageAlt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
