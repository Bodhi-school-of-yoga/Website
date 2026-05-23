"use client";

// CountdownWidget — displays a live days/hours/minutes/seconds countdown to a target date.

import * as React from "react";

import { cn } from "@/lib/utils";

export type CountdownWidgetProps = {
  /** Target moment to count down to. Accepts Date, ISO string, or ms timestamp. */
  target: Date | string | number;
  /** Small uppercase label above the timer. */
  eyebrow?: string;
  /**
   * Visual tone.
   * - "light" (default): dark text for light backgrounds (legacy placement).
   * - "dark": white/mint text for use over a dark hero photo.
   */
  tone?: "light" | "dark";
  /** Anchor the eyebrow + numbers row to the start (left) or end (right). */
  align?: "start" | "end";
  className?: string;
};

type Parts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function diffParts(targetMs: number, nowMs: number): Parts {
  const total = Math.max(0, targetMs - nowMs);
  const seconds = Math.floor(total / 1000) % 60;
  const minutes = Math.floor(total / (1000 * 60)) % 60;
  const hours = Math.floor(total / (1000 * 60 * 60)) % 24;
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function CountdownWidget({
  target,
  eyebrow = "Workshop starting in",
  tone = "light",
  align = "end",
  className,
}: CountdownWidgetProps) {
  const targetMs = React.useMemo(() => {
    if (target instanceof Date) return target.getTime();
    if (typeof target === "number") return target;
    return new Date(target).getTime();
  }, [target]);

  const [parts, setParts] = React.useState<Parts>(() =>
    diffParts(targetMs, Date.now())
  );

  React.useEffect(() => {
    const tick = () => setParts(diffParts(targetMs, Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  const cells: { value: string; label: string }[] = [
    { value: pad(parts.days), label: "Days" },
    { value: pad(parts.hours), label: "Hours" },
    { value: pad(parts.minutes), label: "Mins" },
    { value: pad(parts.seconds), label: "Secs" },
  ];

  const isDark = tone === "dark";
  const itemsAlign = align === "start" ? "items-start" : "items-end";
  const rowAlign = align === "start" ? "justify-start" : "justify-end";

  const eyebrowRow = (
    <div className={cn("flex items-center gap-3", rowAlign)}>
      <span
        className={cn(
          "font-heading font-semibold text-mini uppercase",
          isDark ? "text-text-inverse/80" : "text-text-primary/80",
        )}
      >
        {eyebrow}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-12",
          isDark ? "bg-text-inverse/40" : "bg-text-primary/40",
        )}
      />
    </div>
  );

  return (
    <div className={cn("flex flex-col gap-3", itemsAlign, className)}>
      {eyebrowRow}
      <div className={cn("flex items-baseline gap-8 sm:gap-10", rowAlign)}>
        {cells.map((cell, i) => {
          const dim = i === cells.length - 1;
          return (
            <div
              key={cell.label}
              className="flex items-baseline gap-2"
            >
              <span
                className={cn(
                  "font-heading font-semibold leading-none tabular-nums",
                  "text-[2.5rem] sm:text-[2.75rem] lg:text-[3rem]",
                  isDark
                    ? dim
                      ? "text-text-inverse/80"
                      : i === 0
                        ? "text-brand-shade"
                        : "text-text-inverse"
                    : dim
                      ? "text-text-primary/80"
                      : "text-text-primary",
                )}
              >
                {cell.value}
              </span>
              <span
                className={cn(
                  "font-sans font-normal normal-case tracking-normal",
                  "text-body-md",
                  isDark
                    ? dim
                      ? "text-text-inverse/80"
                      : "text-text-inverse"
                    : "text-text-tertiary",
                )}
              >
                {cell.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { CountdownWidget };
