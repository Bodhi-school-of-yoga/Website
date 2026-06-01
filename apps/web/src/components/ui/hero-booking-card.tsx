// HeroBookingCard — the hero's right-column booking widget.
//
// Matches the Figma frame: TWO stacked white cards on the light hero
// background — (1) a countdown card ("offer expires in" + live timer to
// June 21), and (2) a seats card ("17 of 50 seats" + caption + green progress
// bar + the primary "Reserve My Seat Now" CTA).
//
// Composition only — reuses the live CountdownWidget (./countdown-display, NOT
// the shared ./countdown-widget) and the shared ProgressBar. All visible copy
// is verbatim Figma; tokens only, no inline hex.
//
// Motion: the CTA carries the house `cta-press-lift` pattern via Tailwind
// (hover lift + active press); `motion-safe:` is the reduced-motion guard. The
// progress reveal is delegated to ProgressBar's animateOnView.

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
  /** Target date for the live countdown. Defaults to next June 21. */
  countdownEndsAt?: Date | string | null;
  /** First-paint / fallback countdown values. */
  countdownUnits?: CountdownUnit[];
  /** Seats headline — verbatim Figma copy. */
  seatsText?: string;
  /** Seats sub-caption under the headline. */
  seatsCaption?: string;
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
  countdownEndsAt,
  countdownUnits,
  seatsText = "17 of 50 seats",
  seatsCaption = "left for this week's enrollment window.",
  progressPct = 34,
  ctaLabel = "Reserve My Seat Now",
  ctaHref = "#",
  animateProgressOnView = true,
  className,
}: HeroBookingCardProps) {
  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {/* Card 1 — countdown */}
      <div className="rounded-3xl border border-border-1 bg-surface-0 px-6 py-6 shadow-sm sm:px-8">
        <CountdownWidget
          label={countdownLabel}
          endsAt={countdownEndsAt}
          units={countdownUnits}
          tone="light"
        />
      </div>

      {/* Card 2 — seats + CTA */}
      <div className="flex flex-col gap-5 rounded-3xl border border-border-1 bg-surface-0 px-6 py-6 shadow-sm sm:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <p className="font-heading font-bold text-h5 text-text-brand">
              {seatsText}
            </p>
            <p className="text-mini text-text-tertiary">{seatsCaption}</p>
          </div>
          <ProgressBar
            value={progressPct}
            tone="light"
            animateOnView={animateProgressOnView}
          />
        </div>

        <Link
          href={ctaHref}
          className={cn(
            "inline-flex w-full items-center justify-center rounded-xl bg-brand-primary px-6 py-4",
            "font-heading font-semibold text-mini text-text-inverse",
            // cta-press-lift (house primitive) — motion-safe is the reduced-motion guard
            "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out",
            "motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] hover:brightness-105",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}

export { HeroBookingCard };
