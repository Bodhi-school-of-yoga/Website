"use client";

// SanskritMarqueeStrip — continuously scrolling ticker strip displaying Sanskrit mantras or brand phrases.
import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export type SanskritMarqueeStripProps = {
  terms?: string[];
  className?: string;
};

const DEFAULT_TERMS = [
  "Yama",
  "Niyama",
  "Āsana",
  "Prāṇāyāma",
  "Pratyāhāra",
  "Dhāraṇā",
  "Dhyāna",
  "Samādhi",
];

export function SanskritMarqueeStrip({
  terms = DEFAULT_TERMS,
  className,
}: SanskritMarqueeStripProps) {
  const track = [...terms, ...terms];

  return (
    <motion.section
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "relative w-full overflow-hidden border-y border-border-2 bg-surface-cream",
        "[&:hover_.track]:[animation-play-state:paused]",
        className,
      )}
    >
      <div className="track flex w-max animate-hero-marquee items-center gap-24 px-8 py-5">
        {track.map((term, i) => (
          <span
            key={`${term}-${i}`}
            lang="sa"
            className="shrink-0 font-heading text-mini italic text-text-tertiary"
            style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
          >
            {term}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
