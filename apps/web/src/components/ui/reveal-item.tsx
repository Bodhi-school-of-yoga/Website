"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  /** Vertical translate distance in px (default 48). */
  y?: number;
  /** IntersectionObserver root margin (default reveals slightly before fully in view). */
  rootMargin?: string;
  as?: "div" | "li" | "article" | "section";
};

export function RevealItem({
  children,
  className,
  y = 100,
  rootMargin = "0px 0px -10% 0px",
  as = "div",
}: RevealItemProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.7,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: rootMargin }}
      variants={variants}
    >
      {children}
    </Tag>
  );
}
