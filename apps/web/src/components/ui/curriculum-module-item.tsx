"use client";

// CurriculumModuleItem — a single numbered module tile (number + title +
// one-line description) for the curriculum "Eight pillars of authentic yoga
// mastery" 4x2 grid. Presentational; all copy arrives via props (no hardcoded
// Figma strings — the section supplies the verbatim 01..08 content).
//
// Designed as a fade-in-up stagger child: it consumes the `hidden`/`visible`
// variants defined on its whileInView parent grid (staggerChildren 0.08).
// useReducedMotion drops the translate so the tile appears statically.
// Optional tailwind hover-lift treats the tile as a subtle card.

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type CurriculumModuleItemProps = {
  /** Two-digit ordinal, verbatim — e.g. "01".."08". Rendered as-authored. */
  number: string;
  title: string;
  desc: string;
  className?: string;
};

// Mirrors the house fade-in-up primitive (y:12, HOUSE_EASE, 0.4s). The parent
// grid container owns staggerChildren; this child only exposes the variant.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function CurriculumModuleItem({
  number,
  title,
  desc,
  className,
}: CurriculumModuleItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : itemVariants}
      className={cn(
        "flex flex-col items-start gap-3 rounded-lg border border-[#E2E2E2] px-6 py-3",
        
        className,
      )}
    >
      <span className="font-heading text-h5 leading-none text-text-brand">
        {number}
      </span>
      <h3 className="font-heading text-h6 text-text-primary">{title}</h3>
      <p className="font-sans text-subtext-0 text-text-tertiary">{desc}</p>
    </motion.div>
  );
}

export { CurriculumModuleItem };
