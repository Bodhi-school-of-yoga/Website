"use client";

// AnimatedCount — counts up from 0 to `value` on scroll-into-view with eased animation.

import * as React from "react";

export type AnimatedCountProps = {
  value: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

export function AnimatedCount({
  value,
  suffix = "",
  durationMs = 1800,
  className,
}: AnimatedCountProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [animatedDisplay, setAnimatedDisplay] = React.useState(0);
  const startedRef = React.useRef(false);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // When reduced motion is preferred, render value directly — no effect needed.
  const display = prefersReduced ? value : animatedDisplay;

  React.useEffect(() => {
    if (prefersReduced) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || startedRef.current) return;
        startedRef.current = true;

        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setAnimatedDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, durationMs, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
