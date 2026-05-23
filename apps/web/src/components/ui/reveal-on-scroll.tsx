"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  /** Vertical translate distance in px (default 24). */
  y?: number;
  /** Custom margin for the in-view trigger. */
  rootMargin?: string;
  as?: "div" | "section" | "li" | "ul" | "article" | "header";
};

export const revealChildVariants: Variants = {
  hidden: { opacity: 0.001, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Subtle reveal-on-scroll wrapper. Content stays visible during SSR and first
 * paint (opacity is never zero) so screenshots, JS-off clients, and slow
 * hydrations never see a blank section. After hydration framer-motion plays a
 * gentle slide-up the first time the element scrolls into view.
 */
export function RevealOnScroll({
  children,
  className,
  id,
  delay = 0,
  y = 24,
  rootMargin = "-80px 0px -80px 0px",
  as = "div",
}: RevealOnScrollProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0.001, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  };

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      id={id}
      className={cn(className)}
      // SSR-safe: render visible by default. JS may briefly nudge content
      // during reveal but never hides it completely.
      initial="visible"
      whileInView="visible"
      viewport={{ once: true, margin: rootMargin }}
      variants={variants}
    >
      {children}
    </Tag>
  );
}
