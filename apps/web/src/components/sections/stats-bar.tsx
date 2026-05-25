// StatsBar — horizontal band of animated numeric counters showcasing Bodhi's reach and impact on the homepage.
import * as React from "react";
import Image from "next/image";

import { AnimatedCount } from "@/components/ui/animated-count";
import { cn } from "@/lib/utils";

export type StatItem = {
  value: number;
  suffix?: string;
  label: string;
};

export type StatsBarProps = {
  headlineLead?: string;
  headlineAccent?: string;
  stats?: StatItem[];
  leftPhotoSrc?: string;
  leftPhotoAlt?: string;
  rightPhotoSrc?: string;
  rightPhotoAlt?: string;
  className?: string;
};

const DEFAULT_STATS: StatItem[] = [
  { value: 5000, suffix: "+", label: "Students Trained" },
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 40, suffix: "+", label: "Countries Reached" },
];

export function StatsBar({
  headlineLead = "experience the ultimate harmony of peace of creativity with our ",
  headlineAccent = "yoga courses designed for everyone",
  stats = DEFAULT_STATS,
  leftPhotoSrc = "/images/stats/polaroid-left.jpg",
  leftPhotoAlt = "Student in a forward fold posture.",
  rightPhotoSrc = "/images/stats/polaroid-right.jpg",
  rightPhotoAlt = "Student meditating on a teal sofa.",
  className,
}: StatsBarProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-brand-lite py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <Polaroid
        src={leftPhotoSrc}
        alt={leftPhotoAlt}
        position="left"
        rotate={-6.8}
      />
      <Polaroid
        src={rightPhotoSrc}
        alt={rightPhotoAlt}
        position="right"
        rotate={6.5}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-10 page-px text-center lg:gap-14">
        <h2 className="font-heading text-h5 sm:text-h4 lg:text-h3 2xl:text-h2 text-text-primary">
          <span>{headlineLead}</span>
          <span className="text-text-brand">{headlineAccent}</span>
        </h2>

        <ul
          className={cn(
            "flex flex-col items-center justify-center gap-10",
            "sm:flex-row sm:items-start sm:gap-16 lg:gap-24",
          )}
        >
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <AnimatedCount
                value={stat.value}
                suffix={stat.suffix}
                className="font-sans text-h5 leading-none text-text-brand sm:text-h4 lg:text-h3 2xl:text-h2"
              />
              <span className="text-body-sm text-text-tertiary">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Polaroid({
  src,
  alt,
  position,
  rotate,
}: {
  src: string;
  alt: string;
  position: "left" | "right";
  rotate: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute hidden h-[120px] w-[180px] overflow-hidden rounded-[16px]",
        "shadow-[0_20px_44px_-12px_rgba(0,40,44,0.22)] ring-1 ring-white/50",
        "md:block lg:h-[150px] lg:w-[225px] 2xl:h-[180px] 2xl:w-[270px]",
        position === "left"
          ? "left-[-46px] top-1/2 lg:left-[-40px] 2xl:left-[60px]"
          : "right-[-46px] top-1/2 lg:right-[-40px] 2xl:right-[60px]",
      )}
      style={{ transform: `translateY(-50%) rotate(${rotate}deg)` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1536px) 540px, (min-width: 1024px) 450px, 360px"
        className="object-cover"
      />
    </div>
  );
}
