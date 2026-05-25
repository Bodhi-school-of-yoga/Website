"use client";

// WorkshopFacilitatorSection — animated facilitator bio with portrait and credentials on a workshop detail page.
import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type WorkshopFacilitatorSectionProps = {
  eyebrow?: string;
  title: string;
  body: string;
  avatar: { src: string; alt: string };
  chips: string[];
  className?: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function WorkshopFacilitatorSection({
  eyebrow = "Your Guide",
  title,
  body,
  avatar,
  chips,
  className,
}: WorkshopFacilitatorSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const motionInit = prefersReducedMotion
    ? { initial: "visible" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section className={cn("w-full bg-surface-1 py-16 lg:py-20", className)}>
      <motion.div
        className="mx-auto w-full max-w-[1520px] px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-[140px]"
        variants={prefersReducedMotion ? undefined : containerVariants}
        {...motionInit}
      >
        <motion.article
          variants={prefersReducedMotion ? undefined : itemVariants}
          className={cn(
            "relative w-full overflow-hidden rounded-[39px]",
            "border border-black/[0.07] bg-surface-1",
            "shadow-[0_24px_60px_0_rgba(205,205,205,0.35)]",
            "flex flex-col lg:flex-row lg:items-center",
          )}
        >
          {/* dark teal left panel + avatar */}
          <div
            className={cn(
              "relative shrink-0",
              "bg-brand-teal-deep",
              "px-8 py-10 lg:px-12 lg:py-14",
              "flex items-center justify-center lg:w-[340px]",
            )}
          >
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full bg-surface-teal-pale lg:h-[269px] lg:w-[269px]">
              <Image
                src={avatar.src}
                alt={avatar.alt}
                fill
                sizes="(min-width: 1024px) 269px, 200px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 px-6 py-8 sm:px-10 sm:py-12 lg:px-14">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-sans font-semibold text-mini uppercase tracking-[2px] text-text-brand">
                  {eyebrow}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-text-brand/40"
                />
              </div>
              <h2 className="font-heading font-bold text-text-secondary text-[2rem] leading-[1.2] sm:text-[2.25rem] lg:text-[2.5rem]">
                {title}
              </h2>
              <p className="max-w-[760px] text-body-md text-text-tertiary sm:leading-[1.75]">
                {body}
              </p>
            </div>

            <ul className="flex flex-wrap gap-2.5">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className={cn(
                    "inline-flex h-9 items-center rounded-full px-4",
                    "border border-black/10 bg-surface-1",
                    "text-body-sm font-medium text-text-secondary",
                  )}
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      </motion.div>
    </section>
  );
}
