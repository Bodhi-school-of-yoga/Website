"use client";

// YogaDayCurriculumSection — curriculum overview for the International Yoga Day
// 2026 campaign page (Figma node 691:1308). Renders a dot+text eyebrow label,
// the "Eight pillars of authentic yoga mastery." heading, an intro paragraph,
// four audience-tag pills, then an 8-item numbered module grid (4 cols x 2 rows)
// in numeric order 01..08.
//
// All copy is verbatim from 01_figma_context.json / 02_decomposition.json.
// Motion mirrors the house convention (see instructors-section.tsx):
// whileInView once:true header reveal + parent stagger container driving each
// CurriculumModuleItem as a fade-in-up child. useReducedMotion drops translate.

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { CurriculumModuleItem } from "@/components/ui/curriculum-module-item";

export type CurriculumModule = {
  number: string;
  title: string;
  desc: string;
};

export type YogaDayCurriculumSectionProps = {
  label?: string;
  title?: string;
  intro?: string;
  audienceTags?: string[];
  items?: CurriculumModule[];
  className?: string;
};

// House fade-in-up primitive (y:12, HOUSE_EASE [0.22,1,0.36,1], 0.4s).
const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// Parent stagger container — staggerChildren 0.08, delayChildren 0.15 (house).
const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const DEFAULT_LABEL = "The Curriculum";
const DEFAULT_TITLE = "Eight pillars of authentic yoga mastery.";
const DEFAULT_INTRO =
  "Master authentic yoga practices, philosophy, breathing techniques, alignment, meditation, and teaching methodology — guided by mentors with decades of devoted practice.";
const DEFAULT_AUDIENCE_TAGS = [
  "Aspiring Teachers",
  "Wellness Enthusiasts",
  "Fitness Trainers",
  "Deep Beginners",
];
const DEFAULT_ITEMS: CurriculumModule[] = [
  {
    number: "01",
    title: "Asanas & Alignment",
    desc: "Posture, breath, body — taught with anatomical precision.",
  },
  {
    number: "02",
    title: "Pranayama",
    desc: "Breath techniques that calm, energize, and focus.",
  },
  {
    number: "03",
    title: "Meditation",
    desc: "Cultivate stillness and disciplined awareness.",
  },
  {
    number: "04",
    title: "Yoga Philosophy",
    desc: "The Yoga Sutras, the eight limbs, the lineage.",
  },
  {
    number: "05",
    title: "Anatomy Basics",
    desc: "How the body moves, holds, and heals.",
  },
  {
    number: "06",
    title: "Teaching Method",
    desc: "Sequencing, cueing, holding a room with presence.",
  },
  {
    number: "07",
    title: "Personal Practice",
    desc: "Your sadhana — the foundation of every teacher.",
  },
  {
    number: "08",
    title: "Certification",
    desc: "Guided pathway to your 200-hr credential.",
  },
];

export function YogaDayCurriculumSection({
  label = DEFAULT_LABEL,
  title = DEFAULT_TITLE,
  intro = DEFAULT_INTRO,
  audienceTags = DEFAULT_AUDIENCE_TAGS,
  items = DEFAULT_ITEMS,
  className,
}: YogaDayCurriculumSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const motionInit = prefersReducedMotion
    ? { initial: "visible" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section className={cn("w-full py-20 sm:py-24 lg:py-28 bg-[#FCFCFC]", className)}>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 page-px lg:gap-12">
        {/* Header group — eyebrow label + heading + intro + audience pills */}
        <motion.header
          className="flex max-w-3xl flex-col gap-4"
          variants={prefersReducedMotion ? undefined : staggerVariants}
          {...motionInit}
        >
          <motion.span
            className="inline-flex items-center gap-2 text-mini uppercase tracking-wider text-text-brand"
            variants={prefersReducedMotion ? undefined : headerItemVariants}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-brand-shade"
            />
            {label}
          </motion.span>

          <motion.h2
            className="font-heading text-h2 text-text-primary"
            variants={prefersReducedMotion ? undefined : headerItemVariants}
          >
            {title}
          </motion.h2>

          <motion.p
            className="font-sans text-body text-text-tertiary"
            variants={prefersReducedMotion ? undefined : headerItemVariants}
          >
            {intro}
          </motion.p>

          <motion.ul
            className="mt-1 flex flex-wrap gap-2"
            variants={prefersReducedMotion ? undefined : headerItemVariants}
          >
            {audienceTags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border-1 px-4 py-1.5 text-text-secondary"
              >
                {tag}
              </li>
            ))}
          </motion.ul>
        </motion.header>

        {/* Module grid — 4 cols x 2 rows, numeric order 01..08, staggered */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          variants={prefersReducedMotion ? undefined : staggerVariants}
          {...motionInit}
        >
          {items.map((item) => (
            <CurriculumModuleItem
              key={item.number}
              number={item.number}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
