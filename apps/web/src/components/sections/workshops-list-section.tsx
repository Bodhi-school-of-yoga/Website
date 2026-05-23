"use client";

// WorkshopsListSection — animated grid of upcoming workshop cards on the Workshops listing page.
import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  CourseCard,
  type CourseCardFeature,
  type CourseCardImage,
} from "@/components/ui/course-card";
import { cn } from "@/lib/utils";

export type WorkshopListItem = {
  id: string;
  image: CourseCardImage;
  title: string;
  description: string;
  price: string;
  features: CourseCardFeature[];
  startsCaption: string;
  ctaLabel?: string;
  ctaHref?: string;
  cardHref?: string;
};

export type WorkshopsListSectionProps = {
  workshops: WorkshopListItem[];
  className?: string;
  /**
   * When true, the list pulls up to overlap the bottom of the preceding hero
   * band (matches Figma 1:3968 where the list container starts at y=435 inside
   * a 565-tall hero — a 130px overlap). The section becomes `relative` and
   * sits on top of the hero via z-index.
   */
  overlapHero?: boolean;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function WorkshopsListSection({
  workshops,
  className,
  overlapHero = false,
}: WorkshopsListSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerMotionProps = prefersReducedMotion
    ? { initial: "visible" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.15 },
      };

  return (
    <section
      className={cn(
        "w-full pb-12",
        overlapHero
          ? "relative z-10 -mt-20 sm:-mt-24 lg:-mt-[130px] bg-transparent"
          : "bg-surface-1 pt-12",
        className,
      )}
    >
      <motion.div
        variants={prefersReducedMotion ? undefined : containerVariants}
        {...containerMotionProps}
        className="mx-auto flex w-full max-w-[1340px] flex-col gap-[30px] page-px"
      >
        {workshops.map((workshop) => (
          <motion.div
            key={workshop.id}
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            <CourseCard
              variant="course"
              image={workshop.image}
              title={workshop.title}
              description={workshop.description}
              price={workshop.price}
              features={workshop.features}
              startsCaption={workshop.startsCaption}
              ctaLabel={workshop.ctaLabel ?? "Book spot now"}
              ctaHref={workshop.ctaHref}
              cardHref={workshop.cardHref}
              className="w-full max-w-[1308px] mx-auto h-auto min-h-[362px]"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
