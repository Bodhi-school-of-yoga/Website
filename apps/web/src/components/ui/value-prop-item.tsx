"use client";

// ValuePropItem — icon + title + one-line description cell for the
// "Why Bodhi" 3x2 value-props grid. Presentational only (no hover/link).
// Designed as a fade-in-up stagger child: it consumes the `hidden`/`visible`
// variants defined on its whileInView parent. useReducedMotion drops the
// translate so the cell appears statically.

import * as React from "react";
import { Leaf } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type ValuePropItemProps = {
  /** Generic placeholder icon — icons are not enumerated in Figma. */
  icon?: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
};

// Mirrors the house fade-in-up primitive (y:12, HOUSE_EASE, 0.4s). The parent
// grid container owns staggerChildren; this child just exposes the variant.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function ValuePropItem({ icon, title, desc, className }: ValuePropItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : itemVariants}
      className={cn("flex flex-col items-start gap-3", className)}
    >
      <span className="text-text-brand [&_svg]:h-6 [&_svg]:w-6">
        {icon ?? <Leaf aria-hidden className="h-6 w-6" />}
      </span>
      <h3 className="font-heading text-h5 text-text-primary">{title}</h3>
      <p className="font-sans text-body-md text-text-secondary">{desc}</p>
    </motion.div>
  );
}

export { ValuePropItem };
