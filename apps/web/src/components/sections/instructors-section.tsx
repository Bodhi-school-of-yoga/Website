"use client";

// InstructorsSection — instructor profile cards on a course or program page.
// Supports two layouts: 'scroller' (default, horizontal scroll + next button) and 'grid' (2-col responsive grid).
import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { InstructorCard } from "@/components/ui/instructor-card";
import { ScrollNextButton } from "@/components/ui/scroll-next-button";

export type Instructor = {
  name: string;
  role: string;
  avatar: string;
  slug?: string;
};

export type InstructorsSectionProps = {
  eyebrow: string;
  heading: string;
  instructors: Instructor[];
  nextHref?: string;
  layout?: "scroller" | "grid";
  className?: string;
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function InstructorsSection({
  eyebrow,
  heading,
  instructors,
  nextHref,
  layout = "scroller",
  className,
}: InstructorsSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const motionInit = prefersReducedMotion
    ? { initial: "visible" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
      };

  const isGrid = layout === "grid";

  const listClassName = isGrid
    ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
    : "flex gap-4 sm:gap-6";

  const list = (
    <motion.ul
      className={listClassName}
      variants={prefersReducedMotion ? undefined : listVariants}
      {...motionInit}
    >
      {instructors.map((instructor) => {
        const card = (
          <InstructorCard
            name={instructor.name}
            role={instructor.role}
            avatar={instructor.avatar}
            className={isGrid ? "w-full" : undefined}
          />
        );

        return (
          <motion.li
            key={instructor.name}
            variants={prefersReducedMotion ? undefined : itemVariants}
            className={cn(
              isGrid ? "w-full" : "shrink-0",
              "rounded-[19px] motion-safe:transition motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md",
            )}
          >
            {instructor.slug ? (
              <Link
                href={`/trainers/${instructor.slug}`}
                className="block rounded-[19px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand"
              >
                {card}
              </Link>
            ) : (
              card
            )}
          </motion.li>
        );
      })}
    </motion.ul>
  );

  return (
    <section
      className={cn("w-full bg-surface-1 py-20 sm:py-24 lg:py-28", className)}
    >
      <div className="mx-auto flex max-w-[1340px] flex-col gap-10 page-px lg:gap-12">
        <motion.header
          className="flex flex-col gap-3"
          variants={prefersReducedMotion ? undefined : headerVariants}
          {...motionInit}
        >
          <p className="text-mini uppercase text-text-brand">{eyebrow}</p>
          <h2 className="font-heading text-h2 text-text-secondary">{heading}</h2>
        </motion.header>

        {isGrid ? (
          list
        ) : (
          <div className="flex items-end justify-between gap-4">
            <div className="overflow-x-auto">{list}</div>

            {nextHref ? (
              <ScrollNextButton
                href={nextHref}
                ariaLabel="Next instructor"
                className="shrink-0"
              />
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
