"use client";

// RecordedCoursesHero — hero banner for the recorded courses index page with headline and browse CTA.
import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { usePromoBanner } from "@/components/ui/use-promo-banner";

export type RecordedCoursesHeroProps = {
  backgroundImage: string;
  backgroundAlt?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  className?: string;
};

export function RecordedCoursesHero({
  backgroundImage,
  backgroundAlt = "",
  eyebrow,
  title,
  subtitle,
  className,
}: RecordedCoursesHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const { visible: bannerVisible } = usePromoBanner();

  const container: Variants = {
    hidden: {},
    show: {
      transition: prefersReducedMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  };

  const item = (y: number, duration: number): Variants => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.15 : duration, ease: "easeOut" },
    },
  });

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden text-text-inverse",
        "min-h-[460px] sm:min-h-[500px] lg:min-h-[565px]",
        "flex items-start page-px",
        bannerVisible ? "pt-40 pb-32 sm:pt-44 sm:pb-36 lg:pt-[226px] lg:pb-40" : "pt-28 pb-32 sm:pt-32 sm:pb-36 lg:pt-[178px] lg:pb-40",
        className,
      )}
    >
      <Image
        src={backgroundImage}
        alt={backgroundAlt}
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/60"
      />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-start"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item(8, 0.28)}
          className="text-mini uppercase tracking-[0.2em] text-text-inverse"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          variants={item(14, 0.36)}
          className="mt-3 max-w-3xl font-heading font-bold text-h2 lg:text-h1 leading-[1.05] tracking-tight text-text-inverse"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={item(10, 0.32)}
          className="mt-4 max-w-2xl text-body-md text-text-inverse/70"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}
