"use client";

// AccreditationsSection — trust band: eyebrow + heading, then a single rounded
// surface card containing 6 captioned logos in a 3-col grid with RYS-300 +
// RYS-200 rendered as larger circular badges pinned to the right edge of the
// card without captions (Figma 1:129).
import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type AccreditationItem = {
  id?: string;
  logoSrc: string;
  logoAlt: string;
  caption: string;
  /** Optional override for the rendered logo height (px). Default 96 (caption) / 128 (badge). */
  logoHeight?: number;
  /** When 'badge', renders as a larger circular badge pinned to the right edge of the card without a caption. */
  variant?: "caption" | "badge";
  /** Convenience flag: hides the caption (defaults to true for variant='badge'). */
  omitCaption?: boolean;
};

export type AccreditationsSectionProps = {
  eyebrow?: string;
  heading?: string;
  /** Legacy: rendered under the heading when provided. */
  description?: string;
  items: AccreditationItem[];
  /** Columns at the largest breakpoint for captioned items. Defaults to 3 per Figma. */
  columns?: 3 | 4;
  className?: string;
};

const HOUSE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const gridStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.24 } },
};

export function AccreditationsSection({
  eyebrow = "A Path to Wellness",
  heading = "We are recognised across the world",
  description,
  items,
  columns = 3,
  className,
}: AccreditationsSectionProps) {
  const reduce = useReducedMotion();

  // Reduced-motion-aware variants. Translates collapse to 0 and durations to 0
  // when prefers-reduced-motion is set.
  const eyebrowVariants: Variants = {
    hidden: { opacity: 0.001, y: reduce ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: HOUSE_EASE, delay: 0 },
    },
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0.001, y: reduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: HOUSE_EASE, delay: 0.08 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0.001, y: reduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: HOUSE_EASE, delay: 0.16 },
    },
  };

  // Logos fade only — no translate. Spec: "logos shouldn't move".
  const logoItemVariants: Variants = {
    hidden: { opacity: 0.001 },
    visible: {
      opacity: 1,
      transition: { duration: reduce ? 0 : 0.5, ease: HOUSE_EASE },
    },
  };

  // Partition items into captioned grid cells vs. pinned badges. Either
  // `variant: 'badge'` or `omitCaption: true` opts an item into the badge rail.
  const isBadge = (item: AccreditationItem) =>
    item.variant === "badge" || item.omitCaption === true;
  const captionItems = items.filter((item) => !isBadge(item));
  const badgeItems = items.filter(isBadge);

  const captionColsClass =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      className={cn("w-full bg-background py-20 sm:py-24 lg:py-28", className)}
    >
      <div className="mx-auto max-w-6xl page-px">
        <motion.header
          variants={headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-14"
        >
          {eyebrow && (
            <motion.p
              variants={eyebrowVariants}
              className="text-mini uppercase tracking-wider text-text-brand"
            >
              {eyebrow}
            </motion.p>
          )}
          {heading && (
            <motion.h2
              variants={headingVariants}
              className="mt-3 font-heading text-h4 sm:text-h3 lg:text-h2 text-text-primary"
            >
              {heading}
            </motion.h2>
          )}
          {description && (
            <motion.p
              variants={headingVariants}
              className="mt-3 subtext-1 text-text-secondary"
            >
              {description}
            </motion.p>
          )}
        </motion.header>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
          className={cn(
            "relative rounded-[2rem] border border-border-2 bg-card",
            "px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14",
            // Reserve space on the right for the pinned badges on lg+ when present.
            badgeItems.length > 0 && "lg:pr-[200px]",
          )}
        >
          <motion.ul
            variants={gridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            className={cn(
              "grid grid-cols-1 gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12",
              captionColsClass,
            )}
          >
            {captionItems.map((item, index) => (
              <motion.li
                key={item.id ?? `${item.caption}-${index}`}
                variants={logoItemVariants}
                className="flex flex-col items-center justify-start gap-4"
              >
                <div
                  className="relative flex w-full items-center justify-center"
                  style={{ height: item.logoHeight ?? 96 }}
                >
                  <Image
                    src={item.logoSrc}
                    alt={item.logoAlt}
                    fill
                    sizes="(min-width: 1024px) 200px, (min-width: 640px) 240px, 70vw"
                    className="object-contain"
                  />
                </div>
                <p className="text-balance text-center subtext-1 text-text-secondary">
                  {item.caption}
                </p>
              </motion.li>
            ))}
          </motion.ul>

          {badgeItems.length > 0 && (
            <motion.ul
              variants={gridStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
              className={cn(
                // Mobile / tablet: stack badges below the grid in a centered row.
                "mt-10 flex items-center justify-center gap-6",
                // Desktop: pin to the right edge of the card, vertically centered.
                "lg:absolute lg:right-6 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:flex-col lg:gap-8",
              )}
            >
              {badgeItems.map((item, index) => (
                <motion.li
                  key={item.id ?? `badge-${item.caption}-${index}`}
                  variants={logoItemVariants}
                  className={cn(
                    "relative flex items-center justify-center",
                    "rounded-full border border-border-2 bg-card",
                    "shadow-[0_1px_2px_0_rgb(0_0_0_/_0.04)]",
                  )}
                  style={{
                    width: item.logoHeight ?? 128,
                    height: item.logoHeight ?? 128,
                  }}
                >
                  <div className="relative h-[78%] w-[78%]">
                    <Image
                      src={item.logoSrc}
                      alt={item.logoAlt}
                      fill
                      sizes="128px"
                      className="object-contain"
                    />
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      </div>
    </section>
  );
}
