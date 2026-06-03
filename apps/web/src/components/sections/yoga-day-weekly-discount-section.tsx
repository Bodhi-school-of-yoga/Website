"use client";

// YogaDayWeeklyDiscountSection — the "Weekly Discount Drop" tiered-pricing
// explainer for the International Yoga Day 2026 campaign page.
//
// Layout: dot+text eyebrow label + heading + sub-copy, a 4-up WeekPriceCard
// grid (70 / 50 / 30 / 10% OFF, Week 1 highlighted with a "Live" badge), then a
// savings callout + footnote below.
//
// All visible strings arrive verbatim from Figma (01_figma_context.json) — no
// normalization. Motion mirrors the house convention (testimonials/instructors):
// header fade-in-up + card grid stagger-cards (0.1) + savings callout fade-in-up,
// all whileInView once:true, guarded by useReducedMotion.

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  WeekPriceCard,
  type WeekPriceCardProps,
} from "@/components/ui/week-price-card";

export type YogaDayWeeklyDiscountSectionProps = {
  label?: string;
  title?: string;
  /** Continuation copy after the seats note. */
  subCopy?: string;
  /** Lead-in line that precedes the sub-copy. */
  seatsNote?: string;
  savingsCallout?: string;
  footnote?: string;
  weeks?: WeekPriceCardProps[];
  className?: string;
};

// Verbatim Figma copy — the 4 pricing cards in left-to-right order Week 1..Week 4.
const DEFAULT_WEEKS: WeekPriceCardProps[] = [
  {
    week: "Week 1",
    discount: "70%",
    price: "₹12,570",
    originalPrice: "₹41,900",
    status: "17 / 50 seats left",
    badge: "Live",
    highlighted: true,
    progressPct: 66,
  },
  {
    week: "Week 2",
    discount: "50%",
    price: "₹20,950",
    originalPrice: "₹41,900",
    status: "50 seats unlock",
  },
  {
    week: "Week 3",
    discount: "30%",
    price: "₹29,330",
    originalPrice: "₹41,900",
    status: "50 seats unlock",
  },
  {
    week: "Week 4 · Final",
    discount: "10%",
    price: "₹37,710",
    originalPrice: "₹41,900",
    status: "Closes June 21",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// Parent for the 4-card grid — owns the stagger-cards cadence (0.1).
const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.16 } },
};

const calloutVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

export function YogaDayWeeklyDiscountSection({
  label = "Weekly Discount Drop",
  title = "The earlier you join, the more you save.",
  subCopy = "at that week's price. When they're gone, the discount drops to the next tier — automatically, no exceptions.",
  seatsNote = "Each week we open 50 seats",
  savingsCallout = "Save ₹29,330 today · the largest difference of the entire campaign.",
  footnote = "Your future self will thank you for starting today.",
  weeks = DEFAULT_WEEKS,
  className,
}: YogaDayWeeklyDiscountSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const motionInit = prefersReducedMotion
    ? { initial: "visible" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section className={cn("w-full bg-surface-0 py-20 sm:py-24 lg:py-28", className)}>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 page-px">
        <motion.header
          className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
          variants={prefersReducedMotion ? undefined : headerVariants}
          {...motionInit}
        >
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-text-brand">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-brand-primary"
            />
            {label}
          </span>
          <h2 className="font-heading text-h2 text-text-primary">{title}</h2>
          <p className="text-body text-text-secondary">{subCopy}</p>
          <p className="text-body text-text-secondary">
            {seatsNote?.replace("50 seats", "") ?? "Each week we open "}
            <span className="font-semibold text-text-primary">50 seats</span>
          </p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={prefersReducedMotion ? undefined : gridVariants}
          {...motionInit}
        >
          {weeks.map((week) => (
            <WeekPriceCard key={week.week} {...week} />
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          variants={prefersReducedMotion ? undefined : calloutVariants}
          {...motionInit}
        >
          <span className="inline-block rounded-full bg-[#EEF8F3] border border-[#D4F0E6] px-6 py-2.5 text-sm font-medium text-brand-dark">
            {savingsCallout}
          </span>
          <p className="font-heading text-h5 text-text-primary font-normal">{footnote}</p>
        </motion.div>
      </div>
    </section>
  );
}
