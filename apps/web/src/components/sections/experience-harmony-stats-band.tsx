"use client";

// ExperienceHarmonyStatsBand — animated stats-and-image band on the homepage showcasing Bodhi's experience metrics.
import * as React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import { AnimatedCount } from "@/components/ui/animated-count";
import { cn } from "@/lib/utils";

export type HarmonyStat = {
  value: string;
  label: string;
};

export type HarmonyPhoto = {
  src: string;
  alt: string;
};

export type ExperienceHarmonyStatsBandProps = {
  headlineLead?: string;
  headlineAccent?: string;
  headlineTrail?: string;
  stats?: HarmonyStat[];
  photoTopRight?: HarmonyPhoto;
  photoBottomLeft?: HarmonyPhoto;
  className?: string;
};

const DEFAULT_STATS: HarmonyStat[] = [
  { value: "15000+", label: "Vision: Certified Trainers by 2030" },
  { value: "20", label: "Centers across India" },
  { value: "20 yrs", label: "Years of Teaching" },
  { value: "1Lakh+", label: "Students Transformed" },
];

const DEFAULT_PHOTO_TOP_RIGHT: HarmonyPhoto = {
  src: "/images/stats/top-right.png",
  alt: "A student in seated meditation pose",
};

const DEFAULT_PHOTO_BOTTOM_LEFT: HarmonyPhoto = {
  src: "/images/stats/bottom-left.png",
  alt: "A student in a forward-fold posture",
};

const tiltInRight: Variants = {
  hidden: { opacity: 0, x: 12, rotate: -10 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: -6,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const tiltInLeft: Variants = {
  hidden: { opacity: 0, x: -12, rotate: 10 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 6,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function splitStatValue(raw: string): { value: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { value: 0, suffix: raw };
  return { value: Number(match[1]), suffix: match[2] ?? "" };
}

export function ExperienceHarmonyStatsBand({
  headlineLead = "We envision a powerful global network of",
  headlineAccent = " internationally certified women yoga trainers",
  headlineTrail = "",
  stats = DEFAULT_STATS,
  photoTopRight = DEFAULT_PHOTO_TOP_RIGHT,
  photoBottomLeft = DEFAULT_PHOTO_BOTTOM_LEFT,
  className,
}: ExperienceHarmonyStatsBandProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-brand-lite py-0",
        className,
      )}
    >
      {/* <TiltedOverflowPhoto
        src={photoBottomLeft.src}
        alt={photoBottomLeft.alt}
        position="bottom-left"
        width={300}
        height={360}
      />
      <TiltedOverflowPhoto
        src={photoTopRight.src}
        alt={photoTopRight.alt}
        position="top-right"
        width={290}
        height={420}
        objectPosition="99%"
        className="md:mt-8"
      /> */}

      <div className="relative z-10 mx-auto flex max-w-[1140px] flex-col items-center gap-8 sm:gap-10 lg:gap-16 page-px text-center mt-12 sm:mt-16 md:mt-20 lg:mt-28 mb-10 sm:mb-12 lg:mb-16">
        <h2 className="font-heading text-[clamp(1.25rem,3vw+0.25rem,2.625rem)] leading-[1.3] text-text-primary">
          <span>{headlineLead}</span>
          <span className="text-text-brand">{headlineAccent}</span>
          {headlineTrail ? <span>{headlineTrail}</span> : null}
        </h2>

        <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-8 text-center sm:grid-cols-4 sm:gap-x-6 lg:gap-x-10">
          {stats.map((stat) => {
            const { value, suffix } = splitStatValue(stat.value);
            return (
              <li
                key={stat.label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="font-normal text-[clamp(1.75rem,4vw+0.5rem,3.25rem)] leading-none text-text-brand">
                  <AnimatedCount value={value} suffix={suffix} />
                </span>
                <span className="text-[13px] sm:text-body-sm text-text-tertiary leading-snug">
                  {stat.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

type TiltedOverflowPhotoProps = {
  src: string;
  alt: string;
  position: "top-right" | "bottom-left";
  width: number;
  height: number;
  objectPosition?: string;
  className?:string
};

function TiltedOverflowPhoto({
  src,
  alt,
  position,
  width,
  height,
  objectPosition,
  className
}: TiltedOverflowPhotoProps) {
  const isTopRight = position === "top-right";

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-0 hidden overflow-hidden rounded-[18px] shadow-[0_24px_56px_-16px_rgba(0,40,44,0.28)] ring-1 ring-white/60 lg:block",
        isTopRight
          ? "top-[-44px] right-[2%] xl:right-[-1%]"
          : "bottom-[-64px] left-[2%] xl:left-[3%]",
      )}
      style={{ width, height }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={isTopRight ? tiltInRight : tiltInLeft}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("h-full w-full object-cover ", className)}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </motion.div>
  );
}
