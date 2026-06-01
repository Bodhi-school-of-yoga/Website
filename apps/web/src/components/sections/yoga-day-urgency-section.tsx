// YogaDayUrgencySection — dark urgency band for the International Yoga Day campaign.
// Label + headline + sub-copy, a 3-up price-compare row, a seats-taken progress
// bar, and two CTAs. Does NOT include the course-cards block (that is T13).
"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/progress-bar";

const HOUSE_EASE = [0.22, 1, 0.36, 1] as const;

export type UrgencyPriceItem = {
  label: string;
  price: string;
};

export type UrgencyProgress = {
  label: string;
  value: string;
  pct: number;
};

export type YogaDayUrgencySectionProps = {
  label?: string;
  title?: string;
  subCopy?: string;
  priceCompare?: UrgencyPriceItem[];
  progress?: UrgencyProgress;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  className?: string;
};

const DEFAULT_PRICE_COMPARE: UrgencyPriceItem[] = [
  { label: "This Week · 70% OFF", price: "₹12,570" },
  { label: "Next Week · 50% OFF", price: "₹20,950" },
  { label: "You Lose", price: "₹8,380" },
];

const DEFAULT_PROGRESS: UrgencyProgress = {
  label: "Week 1 seats taken",
  value: "33 of 50",
  pct: 66,
};

export function YogaDayUrgencySection({
  label = "Only 50 Seats This Week",
  title = "70% ends when the 50th seat goes.",
  subCopy = "When these seats are gone, this week's price closes. Next week, you save ₹8,380 less. Do not wait until International Yoga Day to begin.",
  priceCompare = DEFAULT_PRICE_COMPARE,
  progress = DEFAULT_PROGRESS,
  ctaPrimaryLabel = "Claim My Seat",
  ctaPrimaryHref = "#",
  ctaSecondaryLabel = "Talk To Our Team",
  ctaSecondaryHref = "#",
  className,
}: YogaDayUrgencySectionProps) {
  const reduced = useReducedMotion();

  const duration = reduced ? 0 : 0.4;
  const y = reduced ? 0 : 12;

  const rootVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.08,
        delayChildren: 0,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration, ease: HOUSE_EASE } },
  };

  const rowVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.08,
        delayChildren: reduced ? 0 : 0.1,
      },
    },
  };

  return (
    <motion.section
      className={cn(
        "relative w-full overflow-hidden bg-brand-dark text-text-inverse",
        "py-14 sm:py-16 lg:py-20",
        className,
      )}
      variants={rootVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-[1200px] page-px">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            variants={fadeInUp}
            className="text-mini font-semibold uppercase tracking-[0.16em] text-brand-shade"
          >
            {label}
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="mt-4 font-heading text-h2 font-normal leading-[1.1] tracking-tight text-text-inverse"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-2xl text-balance text-body-md leading-snug text-text-inverse/65"
          >
            {subCopy}
          </motion.p>
        </div>

        {/* Price-compare row */}
        <motion.ul
          variants={rowVariants}
          className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3"
        >
          {priceCompare.map((item) => (
            <motion.li
              key={item.label}
              variants={fadeInUp}
              className={cn(
                "flex flex-col items-center justify-center gap-2 rounded-2xl px-6 py-6 text-center",
                "border border-text-inverse/[0.12] bg-text-inverse/[0.06] backdrop-blur-sm",
              )}
            >
              <span className="text-mini font-medium uppercase tracking-[0.12em] text-text-inverse/65">
                {item.label}
              </span>
              <span className="font-heading text-h4 font-normal text-brand-shade">
                {item.price}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Seats progress bar */}
        <motion.div variants={fadeInUp} className="mx-auto mt-10 max-w-xl">
          <div className="mb-2 flex items-center justify-between text-mini font-medium text-text-inverse/65">
            <span>{progress.label}</span>
            <span>{progress.value}</span>
          </div>
          <ProgressBar value={progress.pct} tone="dark" animateOnView />
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href={ctaPrimaryHref}
            className={cn(
              "inline-flex items-center justify-center rounded-full px-[23px] py-[15px]",
              "text-[14px] font-semibold tracking-[0.28px]",
              "bg-brand-shade text-brand-dark",
              "transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] hover:brightness-105",
              "hover:shadow-[0_12px_36px_-12px_rgba(142,224,206,0.55)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-shade focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark",
            )}
          >
            {ctaPrimaryLabel}
          </Link>

          <Link
            href={ctaSecondaryHref}
            className={cn(
              "inline-flex items-center justify-center rounded-full px-[23px] py-[15px]",
              "text-[14px] font-semibold tracking-[0.28px]",
              "border border-text-inverse/25 bg-text-inverse/[0.06] text-text-inverse",
              "transition-transform duration-150 active:scale-[0.98] hover:bg-text-inverse/[0.12]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-inverse/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark",
            )}
          >
            {ctaSecondaryLabel}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
