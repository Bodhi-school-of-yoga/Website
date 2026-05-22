"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type CountdownWidgetProps = {
  /** Target moment to count down to. Accepts Date, ISO string, or ms timestamp. */
  target: Date | string | number;
  /** Small uppercase label above the timer. */
  eyebrow?: string;
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

  return (
    <div className={cn("flex flex-col items-end gap-2", className)}>
      <div className="flex flex-col items-end">
        <span className="font-sans font-semibold text-[9px] uppercase tracking-[0.55em] text-text-primary/80">
          {eyebrow}
        </span>
        <div className="mt-1 h-px w-8 bg-text-primary/40" />
      </div>
      <div className="flex items-baseline gap-4">
        {cells.map((cell, i) => (
          <div key={cell.label} className="flex flex-col items-center">
            <span
              className={cn(
                "font-sans font-semibold text-[30px] leading-none tabular-nums",
                i === cells.length - 1
                  ? "text-text-primary/80"
                  : "text-text-primary"
              )}
            >
              {cell.value}
            </span>
            <span className="mt-1 font-sans font-normal text-[11px] leading-none text-text-tertiary">
              {cell.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CountdownWidget };
