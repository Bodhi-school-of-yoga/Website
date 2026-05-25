"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

import { BODHI_CENTERS, type Center } from "./centers-data";

const CentersMap = dynamic(() => import("./centers-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] w-full items-center justify-center bg-surface-2 text-text-tertiary">
      Loading map…
    </div>
  ),
});

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
  pincodePlaceholder = "Enter your pincode to find nearby centers",
  pincodeCtaLabel = "Search",
  cityLabel = "Alwal, Secunderabad, Hyderabad",
  centers = BODHI_CENTERS,
  className,
}: CentersSectionProps) {
  const [pincode, setPincode] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(
    centers[0]?.id ?? null,
  );
  const [searchError, setSearchError] = React.useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = pincode.trim();
    if (!query) {
      setSearchError(null);
      return;
    }
    const match = centers.find((c) => c.pincode === query);
    if (match) {
      setSelectedId(match.id);
      setSearchError(null);
    } else {
      setSearchError(`No Bodhi center found for pincode ${query}.`);
    }
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
            "mb-2",
            "flex h-[64px] items-center gap-4 rounded-[18px] border border-border-2 bg-surface-1/85 px-6 backdrop-blur-[30px]",
            "lg:h-[72px]",
          )}
        >
          <Search aria-hidden className="h-5 w-5 text-text-tertiary" />
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={pincode}
            onChange={(event) => {
              setPincode(event.target.value);
              if (searchError) setSearchError(null);
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
        <div className="mb-6 min-h-[20px] lg:mb-8">
          {searchError ? (
            <p role="alert" className="text-mini text-text-tertiary">
              {searchError}
            </p>
          ) : null}
        </div>

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
              {centers.map((center, index) => {
                const isSelected = center.id === selectedId;
                return (
                  <li key={center.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(center.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        "w-full py-3 text-left text-subtext-2",
                        "transition-colors duration-150",
                        isSelected
                          ? "text-text-brand"
                          : "text-text-secondary hover:text-text-brand",
                        index < centers.length - 1
                          ? "border-b border-sage-divider-soft"
                          : "",
                      )}
                    >
                      {center.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative min-h-[320px] bg-surface-2 lg:min-h-full">
            <CentersMap
              centers={centers}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
