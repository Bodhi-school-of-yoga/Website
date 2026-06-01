// CountdownWidget (presentational) — a static 4-unit countdown display.
//
// NOTE: This is intentionally NOT the live, target-date-driven widget at
// ./countdown-widget.tsx (which is a shared component used by course-card,
// workshop-detail-hero and recorded-classes-hero). This presentational variant
// renders the EXACT Figma values by default and requires no date wiring.

import * as React from "react";

import { cn } from "@/lib/utils";

type CountdownTone = "dark" | "light";

interface CountdownUnit {
  value: string;
  unit: string;
}

interface CountdownWidgetProps {
  /** Small uppercase label above the timer. */
  label?: string;
  /** Four value+unit pairs. Defaults to the exact Figma values. */
  units?: CountdownUnit[];
  /** Visual tone — "dark" (default) for use over the dark hero card. */
  tone?: CountdownTone;
  className?: string;
}

const DEFAULT_UNITS: CountdownUnit[] = [
  { value: "02", unit: "Days" },
  { value: "18", unit: "Hours" },
  { value: "38", unit: "Mins" },
  { value: "19", unit: "Secs" },
];

const toneStyles: Record<
  CountdownTone,
  { label: string; value: string; unit: string; divider: string }
> = {
  dark: {
    label: "text-text-inverse/70",
    value: "text-text-inverse",
    unit: "text-text-inverse/65",
    divider: "bg-text-inverse/40",
  },
  light: {
    label: "text-text-primary/70",
    value: "text-text-primary",
    unit: "text-text-tertiary",
    divider: "bg-text-primary/40",
  },
};

function CountdownWidget({
  label = "offer expires in",
  units = DEFAULT_UNITS,
  tone = "dark",
  className,
}: CountdownWidgetProps) {
  const styles = toneStyles[tone];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span
        className={cn(
          "font-heading font-semibold uppercase text-mini",
          styles.label,
        )}
      >
        {label}
      </span>
      <div className="flex items-baseline gap-4 sm:gap-5">
        {units.map((u, i) => (
          <React.Fragment key={u.unit}>
            {i > 0 && (
              <span
                aria-hidden="true"
                className={cn("h-6 w-px self-center", styles.divider)}
              />
            )}
            <div className="flex flex-col items-center gap-0.5">
              <span
                className={cn(
                  "font-heading font-bold leading-none tabular-nums",
                  "text-h4",
                  i === 0 ? "text-brand-shade" : styles.value,
                )}
              >
                {u.value}
              </span>
              <span
                className={cn(
                  "font-sans font-normal normal-case text-mini",
                  styles.unit,
                )}
              >
                {u.unit}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export { CountdownWidget };
export type { CountdownWidgetProps, CountdownUnit, CountdownTone };
