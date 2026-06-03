// AboutStatsBar — animated statistics strip on the About page showing key impact numbers.
import * as React from "react";

import { AnimatedCount } from "@/components/ui/animated-count";
import { cn } from "@/lib/utils";

export type StatItem = {
  value: number;
  suffix?: string;
  label: string;
};

export type AboutStatsBarProps = {
  stats?: StatItem[];
  className?: string;
};

const DEFAULT_STATS: StatItem[] = [
  { value: 12000, suffix: "", label: "Students Trained" },
  { value: 20, suffix: "+", label: "Master Trainers" },
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 100, suffix: "K+", label: "Active Practitioners" },
];

export function AboutStatsBar({
  stats = DEFAULT_STATS,
  className,
}: AboutStatsBarProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-white py-16 sm:py-20 lg:py-24",
        className,
      )}
    >
      <div className="mx-auto max-w-[1200px] page-px">
        <ul
          className={cn(
            "grid grid-cols-1 gap-10 text-center",
            "sm:grid-cols-2 sm:gap-12",
            "lg:grid-cols-4 lg:gap-8",
          )}
        >
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center gap-3"
            >
              <AnimatedCount
                value={stat.value}
                suffix={stat.suffix}
                className="font-sans font-semibold leading-none text-text-brand text-h3 sm:text-h4 lg:text-h3 2xl:text-h2"
              />
              <span className="text-sm tracking-wide text-text-primary/70">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
