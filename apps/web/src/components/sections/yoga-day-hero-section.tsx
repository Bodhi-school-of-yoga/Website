"use client";

// YogaDayHeroSection — International Yoga Day 2026 campaign hero.
//
// Left column: eyebrow + headline + "70%" scholarship stat block + supporting
// paragraph + decorative "Max Discount" badge. Right column: the reusable
// HeroBookingCard (countdown + 17/50 seats + Reserve My Seat Now CTA — NOT
// rebuilt here). Full-width soft-green background.
//
// Background: the Figma frame references a full-bleed background image
// (node 691:1198) plus decorative blobs (691:1199, 691:1204). Those assets
// live behind a localhost:3845 MCP URL that does not resolve, so we render a
// token-based soft-green gradient fallback (brand-lite -> surface-1) instead.
// The decorative blobs are NOT rendered as content per the decomposition.
// TODO(figma-asset): wire real hero background (Figma node 691:1198) when the
//   exported asset is available under /public.
//
// Motion: this hero is above the fold, so entrance is a MOUNT animation
// (initial/animate via a parent stagger container) — NOT whileInView. Left
// copy children stagger eyebrow/title/stat/body, and the booking card eases in
// alongside (delay ~0.35). useReducedMotion drops the translate and zeroes the
// duration. House ease [0.22, 1, 0.36, 1].

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { HeroBookingCard } from "@/components/ui/hero-booking-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const HOUSE_EASE = [0.22, 1, 0.36, 1] as const;

export type YogaDayHeroSectionProps = {
  eyebrow?: string;
  title?: string;
  statNumber?: string;
  statUnit?: string;
  statLine1?: string;
  statLine2?: string;
  body?: string;
  maxDiscountBadge?: string;
  className?: string;
};

export function YogaDayHeroSection({
  eyebrow = "INTERNATIONAL YOGA DAY 2026",
  title = "Your biggest chance to join bodhi is right now",
  statNumber = "70",
  statUnit = "%",
  statLine1 = "fee scholarship",
  statLine2 = "to all courses",
  body = "First 100 spots get up to 70% off every Bodhi course. Once they're gone, the price rises — no exceptions, no extensions.",
  maxDiscountBadge = "Max Discount",
  className,
}: YogaDayHeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const slide = prefersReducedMotion ? 0 : 12;
  const duration = prefersReducedMotion ? 0 : 0.4;

  // Parent stagger container — children animate on MOUNT (animate="visible").
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: slide },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: HOUSE_EASE },
    },
  };

  // Booking card eases in alongside the copy (delay ~0.35).
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: slide },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: HOUSE_EASE, delay: 0.35 },
    },
  };

  return (
    <section
      className={cn(
        // Figma node 691:1198: bg-gradient-to-b from #f0fff8 (brand-lite) to white.
        "relative w-full overflow-hidden bg-gradient-to-b from-brand-lite to-white",
        className,
      )}
    >
      <div className="relative mx-auto max-w-[1200px] page-px py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column — copy + stat */}
          <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={itemVariants}
              className="font-heading font-semibold uppercase text-mini text-text-brand"
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="max-w-xl font-heading font-bold text-h2 text-text-primary"
            >
              {title}
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-end gap-x-5 gap-y-2"
            >
              {/* Big stat + "Max Discount" pill overlapping the number bottom */}
              <span className="relative inline-flex items-start pb-3 font-heading font-bold leading-none text-text-brand">
                <span className="text-h1 leading-[0.85]">{statNumber}</span>
                <span className="mt-2 text-h2">{statUnit}</span>
                {/* Figma "Max Discount" pill is mint-green (brand-shade) with
                    dark text — override the shared Badge for this instance
                    only, leaving the shared discount variant untouched. */}
                <Badge className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-shade font-semibold text-brand-dark">
                  {maxDiscountBadge}
                </Badge>
              </span>
              <span className="pb-3 font-heading font-semibold text-h4 leading-tight text-text-primary">
                {statLine1}
                <br />
                {statLine2}
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="max-w-xl text-subtext-2 text-text-secondary"
            >
              {body}
            </motion.p>
          </motion.div>

          {/* Right column — reusable booking card */}
          <motion.div
            className="flex w-full justify-center lg:justify-end"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-full max-w-md">
              <HeroBookingCard />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
