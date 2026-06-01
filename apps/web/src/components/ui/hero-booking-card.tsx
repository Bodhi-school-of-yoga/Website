// HeroBookingCard — the hero's right-column booking card. Dark brand-green
// glass card stacking: a countdown row (CountdownWidget), the
// "17 / 50 seats left" line, a seats ProgressBar, and the primary
// "Reserve My Seat Now" CTA.
//
// Composition only — it reuses the presentational CountdownWidget (NOT the
// live-timer ./countdown-widget) and the shared ProgressBar. All visible copy
// matches the Figma frame verbatim; tokens only, no inline hex.
//
// Motion: the CTA carries the house `cta-press-lift` primitive (hover lift +
// active press) via Tailwind, mirroring closing-cta-section.tsx. The
// `motion-safe:` variants are the reduced-motion guard — they no-op when the
// user prefers reduced motion. The progress-bar reveal is delegated to
// ProgressBar's own animateOnView.

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  CountdownWidget,
  type CountdownUnit,
} from "@/components/ui/countdown-display";
import { ProgressBar } from "@/components/ui/progress-bar";

export type HeroBookingCardProps = {
  /** Uppercase label above the countdown. Verbatim Figma copy. */
  countdownLabel?: string;
  /** Four value+unit pairs. Defaults to the exact Figma values. */
  countdownUnits?: CountdownUnit[];
  /** Seats line — EXACT slash form, e.g. "17 / 50 seats left". */
  seatsText?: string;
  /** 0–100 fill for the seats bar. 17/50 = 34. */
  progressPct?: number;
  /** Primary CTA label. Verbatim Figma copy. */
  ctaLabel?: string;
  /** CTA destination. "#" until a real route is supplied (no query params). */
  ctaHref?: string;
  /** When true, the progress fill scales 0 -> value on scroll into view. */
  animateProgressOnView?: boolean;
  className?: string;
};

function HeroBookingCard({
  countdownLabel = "offer expires in",
  countdownUnits,
  seatsText = "17 / 50 seats left",
  progressPct = 34,
  ctaLabel = "Reserve My Seat Now",
  ctaHref = "#",
  animateProgressOnView = false,
  className,
}: HeroBookingCardProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6 rounded-2xl border border-border-1/15 bg-brand-green-deep p-6 sm:p-8 shadow-lg",
        className,
      )}
    >
      <CountdownWidget
        label={countdownLabel}
        units={countdownUnits}
        tone="dark"
      />

      <div className="flex flex-col gap-2">
        <p className="font-heading font-semibold text-mini text-brand-shade">
          {seatsText}
        </p>
        <ProgressBar
          value={progressPct}
          tone="dark"
          animateOnView={animateProgressOnView}
        />
      </div>

      <Link
        href={ctaHref}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-lg bg-brand-primary px-6 py-4",
          "font-heading font-bold text-mini text-text-inverse",
          // cta-press-lift (house primitive) — motion-safe is the reduced-motion guard
          "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out",
          "motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] hover:brightness-105",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-shade focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green-deep",
        )}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

export { HeroBookingCard };
