"use client";

// FounderQuoteSection — two-column band with founder quote + attribution on the left and portrait image on the right.
import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type FounderQuoteSectionProps = {
  eyebrow?: string;
  quote?: string;
  attribution?: string;
  image?: { src: string; alt: string };
  className?: string;
};

const DEFAULT_IMAGE = {
  src: "/images/founder/acharya-ashok-portrait.jpg",
  alt: "Acharya Ashok, founder of Bodhi School of Yoga",
};

const HOUSE_EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-80px 0px -80px 0px" } as const;

export function FounderQuoteSection({
  eyebrow = "Our practice",
  quote = "When a woman is empowered through yoga, her entire family, community, and future generations benefit.",
  attribution = "Acharya Ashok, Founder",
  image = DEFAULT_IMAGE,
  className,
}: FounderQuoteSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const rootVariants: Variants = {
    hidden: {},
    visible: {
      transition: prefersReducedMotion
        ? {}
        : { staggerChildren: 0.08, delayChildren: 0 },
    },
  };

  const fadeInUpSoft: Variants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: HOUSE_EASE,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: HOUSE_EASE,
      },
    },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: HOUSE_EASE,
      },
    },
  };

  return (
    <section
      className={cn(
        "w-full bg-background py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <motion.div
        variants={rootVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className={cn(
          "mx-auto grid w-full max-w-[1233px] grid-cols-1 items-center gap-12 page-px",
          "lg:grid-cols-2 lg:gap-16",
        )}
      >
        <div className="flex flex-col gap-6">
          <motion.p
            variants={fadeInUpSoft}
            className="text-mini uppercase tracking-wider text-text-brand"
          >
            {eyebrow}
          </motion.p>

          <blockquote className="flex flex-col gap-6">
            <motion.p
              variants={fadeInUp}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: HOUSE_EASE,
                delay: prefersReducedMotion ? 0 : 0.08,
              }}
              className="font-heading text-h4 text-text-primary lg:text-h3"
            >
              {quote}
            </motion.p>

            <motion.cite
              variants={fadeInUpSoft}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: HOUSE_EASE,
                delay: prefersReducedMotion ? 0 : 0.16,
              }}
              className="text-subtext-1 not-italic text-text-tertiary"
            >
              {attribution}
            </motion.cite>
          </blockquote>
        </div>

        <motion.div
          variants={fadeIn}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: HOUSE_EASE,
            delay: prefersReducedMotion ? 0 : 0.1,
          }}
          className="relative mx-auto w-full max-w-[578px] overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 578px, 90vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
