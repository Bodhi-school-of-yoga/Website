// SanskritMarqueeStrip — horizontal marquee strip listing the 8 limbs of yoga.
// Sits between the hero and the founder quote on the home page (Figma node 1:53).
import * as React from "react";

import { cn } from "@/lib/utils";

export type SanskritMarqueeStripProps = {
  terms?: string[];
  loop?: boolean;
  direction?: "left" | "right";
  className?: string;
};

const DEFAULT_TERMS = [
  "Yama",
  "Niyama",
  "Asana",
  "Pranayama",
  "Pratyahara",
  "Dharana",
  "Dhyana",
  "Samadhi",
];

export function SanskritMarqueeStrip({
  terms = DEFAULT_TERMS,
  loop = true,
  direction = "left",
  className,
}: SanskritMarqueeStripProps) {
  // Render the array twice for a seamless wrap (track translates -50% over the loop).
  const track = [...terms, ...terms];

  const animationClass = loop
    ? "animate-[marquee_45s_linear_infinite] motion-reduce:animate-none"
    : "";

  return (
    <section
      aria-hidden="true"
      className={cn(
        "relative w-full overflow-hidden border-y border-border-2 bg-surface-cream",
        "[&:hover_.track]:[animation-play-state:paused]",
        className,
      )}
    >
      <div
        className={cn(
          "track flex w-max items-center gap-24 px-8 py-5",
          animationClass,
        )}
        style={
          direction === "right" ? { animationDirection: "reverse" } : undefined
        }
      >
        {track.map((term, i) => (
          <span
            key={`${term}-${i}`}
            lang="sa"
            className="shrink-0 font-heading italic text-mini text-text-tertiary"
          >
            {term}
          </span>
        ))}
      </div>
    </section>
  );
}
