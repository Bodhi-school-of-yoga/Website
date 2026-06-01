"use client";

// ProgressBar — shared horizontal seats/progress bar used by HeroBookingCard,
// WeekPriceCard and UrgencyBanner. Purely presentational (no text). Single
// source so the three callers stay visually consistent.

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const HOUSE_EASE = [0.22, 1, 0.36, 1] as const;

export type ProgressBarProps = {
  /** 0–100 percent fill. Clamped to [0, 100]. */
  value: number;
  /** Track tone: 'light' for white cards, 'dark' for the dark urgency band. */
  tone?: "light" | "dark";
  /** When true, the fill scales 0 -> value on first scroll into view. */
  animateOnView?: boolean;
  className?: string;
};

export function ProgressBar({
  value,
  tone = "light",
  animateOnView = false,
  className,
}: ProgressBarProps) {
  const reduce = useReducedMotion();
  const pct = Math.min(100, Math.max(0, value));

  // Figma fidelity: light cards fill brand-primary (#009877) on a surface-2
  // track; the dark band fills brand-shade (#8ee0ce) on a translucent track.
  const trackClass = tone === "dark" ? "bg-text-inverse/15" : "bg-surface-2";
  const fillClass = tone === "dark" ? "bg-brand-shade" : "bg-brand-primary";

  const fillStyle = { width: `${pct}%` } as const;

  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-1.5 w-full overflow-hidden rounded-full", trackClass, className)}
    >
      {animateOnView && !reduce ? (
        <motion.div
          className={cn("h-full origin-left rounded-full", fillClass)}
          style={fillStyle}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: HOUSE_EASE }}
        />
      ) : (
        <div className={cn("h-full rounded-full", fillClass)} style={fillStyle} />
      )}
    </div>
  );
}
