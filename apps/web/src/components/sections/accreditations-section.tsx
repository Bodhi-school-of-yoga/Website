"use client";

// AccreditationsSection — animated logo strip listing Bodhi's certification and accreditation partners.
import * as React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type AccreditationItem = {
  id?: string;
  logoSrc: string;
  logoAlt: string;
  caption: string;
  /** Optional override for the rendered logo height (px). Default 96. */
  logoHeight?: number;
};

export type AccreditationsSectionProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  items: AccreditationItem[];
  /** Columns at the largest breakpoint. Defaults to 4. */
  columns?: 3 | 4;
  className?: string;
};

const headerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const gridStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function AccreditationsSection({
  eyebrow = "A Path to Wellness",
  heading,
  description,
  items,
  columns = 4,
  className,
}: AccreditationsSectionProps) {
  const colsClass =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section
      className={cn(
        "w-full bg-background py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl page-px">
        <motion.header
          variants={headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-14"
        >
          {eyebrow && (
            <motion.p
              variants={headerItem}
              className="text-mini uppercase text-text-brand"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h2
            variants={headerItem}
            className="mt-3 font-heading text-h4 sm:text-h3 lg:text-h2 text-text-secondary"
          >
            {heading}
          </motion.h2>
          {description && (
            <motion.p
              variants={headerItem}
              className="mt-3 text-subtext-1 text-text-tertiary"
            >
              {description}
            </motion.p>
          )}
        </motion.header>

        <motion.div
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className={cn(
            "overflow-hidden rounded-[2rem] border border-border-2 bg-card",
            "shadow-[0_1px_2px_0_rgb(0_0_0_/_0.02)]",
          )}
        >
          <ul
            className={cn(
              "grid grid-cols-1 divide-y divide-border-2",
              colsClass,
              "lg:divide-y-0",
              "[&>li]:border-border-2",
            )}
          >
            {items.map((item, index) => (
              <motion.li
                key={item.id ?? `${item.caption}-${index}`}
                variants={cellVariants}
                className={cn(
                  "group flex flex-col items-center justify-center gap-4 px-6 py-10",
                  "sm:px-8 sm:py-12",
                  "transition-colors duration-300 hover:bg-muted/30",
                  cellBorderClass(index, items.length, columns),
                )}
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
                    className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <p className="text-balance text-center text-body-sm leading-snug text-text-tertiary">
                  {item.caption}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Returns Tailwind classes for cell dividers so we draw hairlines BETWEEN
 * cells (not around the outer edge), matching the Figma design.
 * The wrapper card already provides the outer border.
 */
function cellBorderClass(index: number, total: number, columns: 3 | 4) {
  const lastRowStart = Math.floor((total - 1) / columns) * columns;
  const isLastRow = index >= lastRowStart;
  const isLastCol = (index + 1) % columns === 0;

  const lgClasses = [
    !isLastCol && "lg:border-r",
    !isLastRow && "lg:border-b",
  ]
    .filter(Boolean)
    .join(" ");

  return cn(lgClasses);
}
