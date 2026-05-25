"use client";

// WhyBodhiSection — value-proposition section: lifestyle photo left, heading + intro +
// "What We Stand For" pillars + "Learn More" text link right. Matches Figma node 607:8414.
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type WhyBodhiSectionProps = {
  image?: { src: string; alt: string };
  heading?: string;
  intro?: string;
  pillarsTitle?: string;
  pillars?: string[];
  cta?: { label: string; href: string };
  className?: string;
};

const DEFAULT_PILLARS = [
  "Making yoga accessible, inclusive, and empowering for every woman",
  "Offering internationally aligned teacher training programs designed with women's unique journeys in mind",
  "Creating a safe and supportive space for healing, leadership, and sisterhood",
  "Helping women grow personally, professionally, and spiritually",
  "Building a global community of empowered yoginis spreading holistic well-being",
];

const DEFAULT_IMAGE = {
  src: "/images/why-bodhi/yoga-in-the-park.jpg",
  alt: "Woman practicing yoga in a sunlit studio",
};

const EASE = [0.22, 1, 0.36, 1] as const;

const rootStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const fadeInUpSoft: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const rightStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const pillarsStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.24 } },
};

const pillarItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

export function WhyBodhiSection({
  image = DEFAULT_IMAGE,
  heading = "Why Bodhi School of Yoga?",
  intro = "Founded in 2014 by Acharya Ashok, Bodhi School of Yoga was created with a simple yet powerful vision: to help people reconnect with themselves through yoga, wellness, and conscious living.",
  pillarsTitle = "What We Stand For",
  pillars = DEFAULT_PILLARS,
  cta = { label: "Learn More", href: "/about" },
  className,
}: WhyBodhiSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Honor reduced motion: zero out translates and durations.
  const variantsFor = (v: Variants): Variants =>
    prefersReducedMotion
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0 } },
        }
      : v;

  return (
    <section
      className={cn("w-full bg-background py-20 sm:py-24 lg:py-28", className)}
    >
      <motion.div
        variants={rootStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className={cn(
          "mx-auto grid max-w-[1202px] gap-10 page-px",
          "lg:grid-cols-[534px_minmax(0,1fr)] lg:items-center lg:gap-[57px]",
        )}
      >
        <motion.div
          variants={variantsFor(fadeIn)}
          className="relative aspect-[4/5] overflow-hidden rounded-[20px]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 534px, 100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          variants={rightStagger}
          className="flex flex-col gap-7 lg:gap-8"
        >
          <motion.h2
            variants={variantsFor(fadeInUp)}
            className="font-heading text-h3 text-text-secondary"
          >
            {heading}
          </motion.h2>

          <motion.p
            variants={variantsFor(fadeInUpSoft)}
            className="text-subtext-1 text-text-secondary"
          >
            {intro}
          </motion.p>

          <div className="flex flex-col gap-4">
            <motion.h3
              variants={variantsFor(fadeInUpSoft)}
              className="font-heading text-h5 text-text-secondary"
            >
              {pillarsTitle}
            </motion.h3>

            <motion.ul
              variants={pillarsStagger}
              className="flex flex-col divide-y divide-sage-divider-soft"
            >
              {pillars.map((pillar) => (
                <motion.li
                  key={pillar}
                  variants={variantsFor(pillarItem)}
                  className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-brand-primary"
                  />
                  <span className="text-body-sm text-text-secondary">
                    {pillar}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div variants={variantsFor(fadeInUpSoft)}>
            <Link
              href={cta.href}
              className={cn(
                "group inline-flex items-center gap-2 text-subtext-1 font-medium text-text-brand",
                "relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0",
                "after:bg-current after:transition-all after:duration-300 hover:after:w-full",
                "[&_svg]:transition-transform [&_svg]:duration-200",
                "group-hover:[&_svg]:translate-x-0.5",
              )}
            >
              <span>{cta.label}</span>
              <svg
                aria-hidden
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  d="M3.333 8h9.334M8.667 3.333 13.333 8 8.667 12.667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
