"use client";

// CountdownWidget — the hero booking-card countdown.
//
// NOTE: This is intentionally NOT the other live widget at ./countdown-widget.tsx
// (a shared component used by course-card and recorded-classes-hero). This
// variant is tuned for the Yoga Day hero: a live
// countdown to International Yoga Day (June 21) with the Figma "Days/Hours/Mins/
// Secs" labels and the white-card visual treatment.
//
// SSR-safe: the server (and first client paint) renders the static fallback
// values so there is no hydration mismatch; the live tick starts in useEffect.
// If `endsAt` is omitted it defaults to 48 hours from page load.

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
  /**
   * Target date the timer counts down to. Defaults to the next upcoming
   * June 21 (International Yoga Day). Pass `null` to render static defaults
   * (no live tick).
   */
  endsAt?: Date | string | null;
  /** Static fallback / first-paint values. Defaults to the exact Figma values. */
  units?: CountdownUnit[];
  /** Visual tone — "light" (default) inside the white hero card. */
  tone?: CountdownTone;
  className?: string;
}

const DEFAULT_UNITS: CountdownUnit[] = [
  { value: "02", unit: "Days" },
  { value: "00", unit: "Hours" },
  { value: "00", unit: "Mins" },
  { value: "00", unit: "Secs" },
];

const toneStyles: Record<
  CountdownTone,
  { label: string; value: string; unit: string; divider: string }
> = {
  dark: {
    label: "text-text-inverse/70",
    value: "text-text-inverse",
    unit: "text-text-inverse/65",
    divider: "bg-text-inverse/30",
  },
  light: {
    label: "text-text-tertiary",
    value: "text-text-primary",
    unit: "text-text-tertiary",
    divider: "bg-border-1",
  },
};

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

const STORAGE_KEY = "bodhi_countdown_target";

/** 48-hour countdown persisted in localStorage so it survives refreshes. */
function defaultTarget(): Date {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const ts = Number(stored);
      if (ts > Date.now()) return new Date(ts);
    }
  } catch {}
  const target = new Date(Date.now() + 48 * 60 * 60 * 1000);
  try { localStorage.setItem(STORAGE_KEY, String(target.getTime())); } catch {}
  return target;
}

function unitsUntil(target: Date): CountdownUnit[] {
  const diff = target.getTime() - Date.now();
  const clamped = Math.max(0, diff);
  const days = Math.floor(clamped / 86_400_000);
  const hours = Math.floor((clamped % 86_400_000) / 3_600_000);
  const mins = Math.floor((clamped % 3_600_000) / 60_000);
  const secs = Math.floor((clamped % 60_000) / 1000);
  return [
    { value: pad(days), unit: "Days" },
    { value: pad(hours), unit: "Hours" },
    { value: pad(mins), unit: "Mins" },
    { value: pad(secs), unit: "Secs" },
  ];
}

function CountdownWidget({
  label = "offer expires in",
  endsAt,
  units = DEFAULT_UNITS,
  tone = "light",
  className,
}: CountdownWidgetProps) {
  const styles = toneStyles[tone];

  // Resolve the target once on the client. `null` disables the live tick.
  const target = React.useMemo<Date | null>(() => {
    if (endsAt === null) return null;
    if (endsAt instanceof Date) return endsAt;
    if (typeof endsAt === "string") return new Date(endsAt);
    return defaultTarget();
  }, [endsAt]);

  // Render static Figma values on the server and first client paint.
  const [display, setDisplay] = React.useState<CountdownUnit[]>(units);

  React.useEffect(() => {
    if (!target) return;
    const update = () => setDisplay(unitsUntil(target));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <span
        className={cn(
          "font-heading font-semibold uppercase text-mini tracking-[0.18em]",
          styles.label,
        )}
      >
        {label}
      </span>
      <div className="flex items-start justify-center gap-4 sm:gap-6">
        {display.map((u, i) => (
          <React.Fragment key={u.unit}>
            {i > 0 && (
              <span
                aria-hidden="true"
                className={cn("mt-1 h-8 w-px self-start", styles.divider)}
              />
            )}
            <div className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  "font-heading font-bold leading-none tabular-nums text-h3",
                  i === 0 ? "text-text-brand" : styles.value,
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
