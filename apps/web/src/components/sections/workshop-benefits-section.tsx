"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type WorkshopBenefit = {
  number: string;
  title: string;
  body: string;
};

export type WorkshopBenefitsSectionProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  benefits: WorkshopBenefit[];
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

export function WorkshopBenefitsSection({
  eyebrow = "Benefits",
  title,
  subtitle,
  benefits,
  className,
}: WorkshopBenefitsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const motionInit = prefersReducedMotion
    ? { initial: "visible" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.15 },
      };

  return (
    <section
      className={cn(
        "w-full bg-surface-2 py-20 lg:py-24",
        className,
      )}
    >
      <motion.div
        className="mx-auto flex w-full max-w-[1520px] flex-col items-center gap-12 px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-[140px]"
        variants={prefersReducedMotion ? undefined : containerVariants}
        {...motionInit}
      >
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="flex flex-col items-center gap-4 text-center"
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
          <p className="max-w-[640px] text-body-md text-text-tertiary sm:text-[1.25rem] sm:leading-[1.5]">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <motion.article
              key={benefit.number}
              variants={prefersReducedMotion ? undefined : itemVariants}
              className={cn(
                "flex h-full flex-col gap-3 rounded-[22px]",
                "border border-black/[0.08] bg-surface-1",
                "px-8 py-9",
                "shadow-[0_4px_8.2px_0_rgba(226,226,226,0.25)]",
                "transition-transform duration-200 hover:-translate-y-1",
              )}
            >
              <span className="font-heading font-normal text-text-brand text-[2.5rem] leading-none">
                {benefit.number}
              </span>
              <h3 className="font-heading font-semibold text-text-secondary text-[1.375rem] leading-snug">
                {benefit.title}
              </h3>
              <p className="text-body-md text-text-tertiary">{benefit.body}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
