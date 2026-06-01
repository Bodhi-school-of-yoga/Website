"use client";

// WorkshopScheduleSection — date-and-time schedule table with session breakdown on a workshop detail page.
import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type WorkshopScheduleItem = {
  time: string;
  title: string;
  body: string;
};

export type WorkshopScheduleSectionProps = {
  eyebrow?: string;
  title: string;
  items: WorkshopScheduleItem[];
  sideImage: { src: string; alt: string };
  className?: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } },
};

export function WorkshopScheduleSection({
  eyebrow = "Workshop Day",
  title,
  items,
  sideImage,
  className,
}: WorkshopScheduleSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const motionInit = prefersReducedMotion
    ? { initial: "visible" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.15 },
      };

  return (
    <section className={cn("w-full bg-surface-1 py-20 lg:py-24", className)}>
      <motion.div
        className="mx-auto flex w-full max-w-[1340px] flex-col gap-12 lg:flex-row lg:items-start lg:gap-16 page-px"
        variants={prefersReducedMotion ? undefined : containerVariants}
        {...motionInit}
      >
        <div className="flex w-full flex-col gap-8 lg:flex-1">
          <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="font-sans font-semibold text-mini uppercase tracking-[2px] text-text-brand">
                {eyebrow}
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-text-brand/40" />
            </div>
            <h2 className="font-heading font-bold text-text-secondary text-[2rem] leading-[1.2] sm:text-[2.25rem] lg:text-[2.75rem]">
              {title}
            </h2>
          </motion.div>

          <ul className="flex flex-col">
            {items.map((item, idx) => {
              const isLast = idx === items.length - 1;
              return (
                <motion.li
                  key={item.time + item.title}
                  variants={prefersReducedMotion ? undefined : itemVariants}
                  className={cn(
                    "flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:gap-6",
                    !isLast && "border-b border-border-2",
                  )}
                >
                  <span className="font-heading font-semibold text-mini uppercase tracking-[1px] text-text-brand sm:min-w-[90px] sm:pt-1">
                    {item.time}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-heading font-bold text-text-secondary text-[1.25rem] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-body-md text-text-tertiary">
                      {item.body}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="relative w-full shrink-0 overflow-hidden rounded-[24px] lg:w-[500px] lg:self-end"
        >
          <div className="relative aspect-[500/541] w-full">
            <Image
              src={sideImage.src}
              alt={sideImage.alt}
              fill
              sizes="(min-width: 1024px) 500px, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
