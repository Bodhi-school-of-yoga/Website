"use client";

// WorkshopAboutSection — animated two-column about block on a workshop detail page with image and description.
import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type WorkshopAboutFeature = {
  emoji: string;
  title: string;
  body: string;
};

export type WorkshopAboutSectionProps = {
  eyebrow?: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  image: { src: string; alt: string };
  features: WorkshopAboutFeature[];
  className?: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function WorkshopAboutSection({
  eyebrow = "About This Workshop",
  titleLead,
  titleAccent,
  body,
  image,
  features,
  className,
}: WorkshopAboutSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const motionInit = prefersReducedMotion
    ? { initial: "visible" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section className={cn("w-full bg-surface-1 py-20 lg:py-24", className)}>
      <motion.div
        className="mx-auto flex w-full max-w-[1340px] flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-[88px] page-px"
        variants={prefersReducedMotion ? undefined : containerVariants}
        {...motionInit}
      >
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="w-full shrink-0 lg:w-[500px]"
        >
          <div className="relative aspect-[500/516] w-full overflow-hidden rounded-[18px]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 500px, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        <div className="flex w-full flex-col gap-6 lg:max-w-[680px]">
          <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="flex items-center gap-3"
          >
            <span className="font-sans font-semibold text-mini uppercase tracking-[2px] text-text-brand">
              {eyebrow}
            </span>
            <span aria-hidden="true" className="h-px w-10 bg-text-brand/40" />
          </motion.div>

          <motion.h2
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="font-heading font-bold text-text-secondary text-[2rem] leading-[1.2] sm:text-[2.25rem] lg:text-[2.75rem]"
          >
            {titleLead}{" "}
            <span className="text-text-brand">{titleAccent}</span>
          </motion.h2>

          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="max-w-[680px] text-body-md text-text-tertiary sm:text-[1.25rem] sm:leading-[1.5]"
          >
            {body}
          </motion.p>

          <motion.ul
            variants={prefersReducedMotion ? undefined : containerVariants}
            className="mt-2 flex flex-col gap-4"
          >
            {features.map((feature) => (
              <motion.li
                key={feature.title}
                variants={prefersReducedMotion ? undefined : itemVariants}
                className={cn(
                  "flex items-start gap-4 rounded-[18px]",
                  "border border-border-1 bg-surface-1",
                  "px-6 py-5",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-[42px] w-[42px] shrink-0 items-center justify-center",
                    "rounded-[10px] border border-border-2 bg-surface-1",
                    "text-[20px] leading-none",
                  )}
                >
                  {feature.emoji}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-sans font-medium text-text-secondary text-[1.1875rem] leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-body-sm text-text-tertiary">
                    {feature.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}
