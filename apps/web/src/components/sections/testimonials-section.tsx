"use client";

// TestimonialsSection — 3-column grid of student testimonial cards under an eyebrow + heading.
import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  TestimonialCard,
  type TestimonialCardProps,
} from "@/components/ui/testimonial-card";
import { cn } from "@/lib/utils";

export type TestimonialItem = Omit<
  TestimonialCardProps,
  "showDecorativeQuote" | "priority"
> & {
  id?: string;
};

export type TestimonialsSectionProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  testimonials: TestimonialItem[];
  className?: string;
  /** First-card avatar gets eager loading when above the fold. */
  priorityFirst?: boolean;
};

const HOUSE_EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-80px 0px -80px 0px" } as const;

export function TestimonialsSection({
  eyebrow = "Testimonies",
  heading = "What our clients say",
  description,
  testimonials,
  className,
  priorityFirst = false,
}: TestimonialsSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Reduced-motion: no translate, zero duration.
  const slide = prefersReducedMotion ? 0 : 16;
  const slideSoft = prefersReducedMotion ? 0 : 12;
  const duration = prefersReducedMotion ? 0 : 0.5;

  const headerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const eyebrowVariants: Variants = {
    hidden: { opacity: 0, y: slideSoft },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: HOUSE_EASE },
    },
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: slide },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: HOUSE_EASE },
    },
  };

  const rowVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.16,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: slide },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: HOUSE_EASE },
    },
  };

  return (
    <section
      className={cn(
        "w-full bg-[#FCFCFC] py-12 sm:py-16 md:py-20 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-[1200px] page-px">
        <motion.header
          className="mx-auto mb-8 sm:mb-10 lg:mb-14 max-w-2xl text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {eyebrow && (
            <motion.p
              variants={eyebrowVariants}
              className="text-mini uppercase text-text-brand"
            >
              {eyebrow}
            </motion.p>
          )}
          {heading && (
            <motion.h2
              variants={headingVariants}
              className="mt-3 font-heading text-[clamp(1.375rem,3.5vw+0.25rem,3.25rem)] leading-[1.2] text-text-secondary"
            >
              {heading}
            </motion.h2>
          )}
          {description && (
            <motion.p
              variants={eyebrowVariants}
              className="mt-3 text-subtext-1 text-text-secondary"
            >
              {description}
            </motion.p>
          )}
        </motion.header>

        <motion.div
          className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id ?? `${item.authorName}-${index}`}
              variants={cardVariants}
            >
              <TestimonialCard
                quote={item.quote}
                authorName={item.authorName}
                authorMeta={item.authorMeta}
                avatarSrc={item.avatarSrc}
                avatarAlt={item.avatarAlt}
                showDecorativeQuote
                priority={priorityFirst && index === 0}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
