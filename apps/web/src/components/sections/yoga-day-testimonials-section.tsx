"use client";

// YogaDayTestimonialsSection — eyebrow + heading + 3-up grid reusing the existing
// ui/testimonial-card.tsx primitive. Static section (3 fixed cards) -> framer whileInView.
// Mirrors the motion of sections/testimonials-section.tsx (HOUSE_EASE, whileInView once).

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  TestimonialCard,
  type TestimonialCardProps,
} from "@/components/ui/testimonial-card";
import { cn } from "@/lib/utils";

export type YogaDayTestimonialItem = Pick<
  TestimonialCardProps,
  "quote" | "authorName" | "authorMeta" | "avatarSrc" | "avatarAlt"
> & {
  id?: string;
};

export type YogaDayTestimonialsSectionProps = {
  eyebrow?: string;
  title?: string;
  items?: YogaDayTestimonialItem[];
  className?: string;
};

const HOUSE_EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-80px 0px -80px 0px" } as const;

// Verbatim Figma copy (decomposition node 691:1392). Cite split into name + meta.
// Avatars reuse existing placeholder portraits in /public/images/testimonials.
const DEFAULT_ITEMS: YogaDayTestimonialItem[] = [
  {
    quote:
      "I came in to lose weight. I left able to teach a class — and a calmer person at home. The training is honest, and that's rare.",
    authorName: "Aanya",
    authorMeta: "TTC Cohort 11. Now teaching in Goa.",
    avatarSrc: "/images/testimonials/aanya.jpg",
  },
  {
    quote:
      "The back pain workshop did more in two days than two years of physiotherapy. I've recommended Bodhi to everyone I know.",
    authorName: "Ravi",
    authorMeta: "workshop participant",
    avatarSrc: "/images/testimonials/ravi.jpg",
  },
  {
    quote:
      "I practice with Bodhi online from Berlin. Six in the morning, India time. It's the most consistent thing in my week.",
    authorName: "Lena",
    authorMeta: "online student, 2 years",
    avatarSrc: "/images/testimonials/lena.jpg",
  },
];

export function YogaDayTestimonialsSection({
  eyebrow = "A Path to Wellness",
  title = "What our clients say",
  items = DEFAULT_ITEMS,
  className,
}: YogaDayTestimonialsSectionProps) {
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
    <section className={cn("w-full bg-surface-1 py-20 sm:py-24 lg:py-28", className)}>
      <div className="mx-auto max-w-[1340px] page-px">
        <motion.header
          className="mx-auto mb-14 max-w-2xl text-center"
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
          {title && (
            <motion.h2
              variants={headingVariants}
              className="mt-3 font-heading text-h4 sm:text-h3 lg:text-h2 text-text-secondary"
            >
              {title}
            </motion.h2>
          )}
        </motion.header>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {items.map((item, index) => (
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
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
