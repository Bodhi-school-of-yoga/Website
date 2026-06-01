"use client";

// YogaDayWhyBodhiSection — International Yoga Day campaign value-props block
// (Figma node 691:1362). Dot+text eyebrow label + single combined heading,
// then a 3-col x 2-row grid of six ValuePropItem cells.
//
// DISTINCT from sections/why-bodhi-section.tsx (the homepage photo+bullet
// layout) — this is the yoga-day-prefixed campaign variant; do not unify them.
//
// Motion mirrors the house convention (instructors/testimonials sections):
// header fade-in-up + grid staggerChildren 0.08, whileInView once:true,
// useReducedMotion drops the translate.
import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { ValuePropItem } from "@/components/ui/value-prop-item";

export type YogaDayWhyBodhiItem = {
  title: string;
  desc: string;
};

export type YogaDayWhyBodhiSectionProps = {
  label?: string;
  title?: string;
  items?: YogaDayWhyBodhiItem[];
  className?: string;
};

// Verbatim Figma copy (691:1362 / 02_decomposition.json why-bodhi). Title
// splits across two text nodes in Figma — rendered here as one heading.
const DEFAULT_ITEMS: YogaDayWhyBodhiItem[] = [
  {
    title: "Authentic Foundation",
    desc: "Traditional teachings guided with modern structure.",
  },
  {
    title: "Experienced Mentors",
    desc: "Learn from passionate yoga practitioners and teachers.",
  },
  {
    title: "Beginner Friendly",
    desc: "Designed for complete beginners to advanced learners.",
  },
  {
    title: "Holistic Wellness",
    desc: "Physical health, emotional balance, and mental clarity.",
  },
  {
    title: "Structured Curriculum",
    desc: "Step-by-step guidance with practical application.",
  },
  {
    title: "Supportive Community",
    desc: "Grow alongside like-minded learners.",
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

// Parent grid container owns the stagger; each ValuePropItem exposes its own
// hidden/visible fade-in-up variant as a child.
const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

export function YogaDayWhyBodhiSection({
  label = "Why Bodhi",
  title = "Why our students choose Bodhi.",
  items = DEFAULT_ITEMS,
  className,
}: YogaDayWhyBodhiSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const motionInit = prefersReducedMotion
    ? { initial: "visible" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section
      className={cn("w-full bg-surface-0 py-20 sm:py-24 lg:py-28", className)}
    >
      <div className="mx-auto flex max-w-[1340px] flex-col gap-10 page-px lg:gap-12">
        <motion.header
          className="flex flex-col gap-3"
          variants={prefersReducedMotion ? undefined : headerVariants}
          {...motionInit}
        >
          <span className="inline-flex items-center gap-2 text-mini uppercase text-text-brand">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-brand-primary"
            />
            {label}
          </span>
          <h2 className="font-heading text-h2 text-text-secondary">{title}</h2>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          variants={prefersReducedMotion ? undefined : gridVariants}
          {...motionInit}
        >
          {items.map((item) => (
            <ValuePropItem
              key={item.title}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
