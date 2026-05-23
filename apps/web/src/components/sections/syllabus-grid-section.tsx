"use client";

// SyllabusGridSection — 3x2 responsive grid of SyllabusCards for a course curriculum.
// Mirrors the inline section-header style of CourseOverviewSection and the
// scroll-into-view stagger reveal pattern of HighlightsSection.
import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { SyllabusCard } from "@/components/ui/syllabus-card";

export type SyllabusModule = {
  n: string;
  title: string;
  body: string;
};

export type SyllabusGridSectionProps = {
  id?: string;
  eyebrow?: string;
  heading?: string;
  modules: SyllabusModule[];
  className?: string;
};

export function SyllabusGridSection({
  id,
  eyebrow = "CURRICULUM",
  heading = "Course Syllabus",
  modules,
  className,
}: SyllabusGridSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Header fade-in-up variants (scroll-into-view).
  const headerVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      };

  // Grid parent — stagger-children with delayChildren:0.15.
  const gridVariants: Variants = prefersReducedMotion
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0.15 },
        },
      };

  // Each card child — fade-in-up.
  const cardVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      };

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 lg:scroll-mt-24 bg-background py-20 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1340px] flex-col gap-8 page-px">
        <motion.div
          className="flex flex-col gap-4"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <p className="text-mini font-heading uppercase tracking-widest text-text-brand">
            {eyebrow}
          </p>
          <h2 className="font-heading text-h2 font-semibold text-text-secondary">
            {heading}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {modules.map((m) => (
            <motion.div key={m.n + m.title} variants={cardVariants}>
              <SyllabusCard n={m.n} title={m.title} body={m.body} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
