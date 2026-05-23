"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type ListingHeroProps = {
  backgroundImage: string;
  backgroundAlt?: string;
  eyebrow?: string;
  breadcrumb: BreadcrumbItem[];
  headline: string;
  headlineAccent?: string;
  /**
   * Where the accent word sits relative to the main headline.
   * - "start" (default): accent word renders before the headline,
   *   matching earlier listing heroes (e.g., "Online Yoga Courses"
   *   where "Online" is the accent).
   * - "end": accent renders after the headline. Used to match the
   *   Figma "Online Yoga Courses" listing-hero design at node 1:3138
   *   where the final word "Courses" carries the accent color.
   */
  accentPosition?: "start" | "end";
  subtitle: string;
  resultCount?: string;
  /**
   * Color treatment for the result-count caption. "accent" (default)
   * preserves the green brand-shade used by earlier listing pages.
   * "inverse" matches the Figma node 1:3138 listing hero where the
   * caption is white at 100% opacity.
   */
  resultCountTone?: "accent" | "inverse";
  className?: string;
  /**
   * Where to anchor the heading content inside the hero band.
   * - "bottom" (default): content sits near the bottom of the band, matching the
   *   Online Advanced Certifications / Pre-recorded Courses listing hero.
   * - "top": content sits near the top of the band, leaving room for content
   *   that overlaps the bottom of the hero (e.g., workshop cards on 1:3968).
   * - "center": content is vertically centered in the band, matching the
   *   Online Yoga Courses listing hero (Figma node 1:3138).
   */
  contentAlign?: "top" | "bottom" | "center";
  /**
   * Pixel height of the band. The default mirrors the existing Bodhi listing
   * hero. Use a larger value (e.g., 565) when downstream content overlaps the
   * hero band to keep heading and overlapping content from colliding.
   */
  minHeightClassName?: string;
};

export function ListingHero({
  backgroundImage,
  backgroundAlt = "",
  eyebrow,
  breadcrumb,
  headline,
  headlineAccent,
  accentPosition = "start",
  subtitle,
  resultCount,
  resultCountTone = "accent",
  className,
  contentAlign = "bottom",
  minHeightClassName,
}: ListingHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: prefersReducedMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.07, delayChildren: 0.05 },
    },
  };

  const makeItemVariants = (y: number, duration: number): Variants => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.12 : duration,
        ease: "easeOut",
      },
    },
  });

  const breadcrumbVariants = makeItemVariants(8, 0.28);
  const headlineVariants = makeItemVariants(12, 0.32);
  const subtitleVariants = makeItemVariants(10, 0.28);
  const resultCountVariants = makeItemVariants(6, 0.24);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden flex",
        minHeightClassName ?? "min-h-[420px] sm:min-h-[460px] lg:min-h-[500px]",
        contentAlign === "top" && "items-start",
        contentAlign === "center" && "items-center",
        contentAlign !== "top" && contentAlign !== "center" && "items-end",
        contentAlign === "top" &&
          "pt-28 pb-28 sm:pt-32 sm:pb-32 lg:pt-[120px] lg:pb-[150px]",
        contentAlign === "center" && "pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24",
        contentAlign !== "top" && contentAlign !== "center" &&
          "pt-32 pb-12 sm:pt-36 sm:pb-14 lg:pt-40 lg:pb-16",
        className,
      )}
    >
      <Image
        src={backgroundImage}
        alt={backgroundAlt}
        fill
        sizes="100vw"
        className="object-cover object-bottom"
        priority
      />

      <div aria-hidden="true" className="absolute inset-0 bg-black/80" />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1340px] flex-col items-start page-px text-left"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.nav
          aria-label="Breadcrumb"
          variants={breadcrumbVariants}
          className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-body-sm text-text-inverse/80"
        >
          {breadcrumb.map((item, index) => {
            const isLast = index === breadcrumb.length - 1;
            return (
              <React.Fragment key={`${item.label}-${index}`}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-text-inverse/80 transition-colors hover:text-text-inverse"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="text-text-inverse"
                  >
                    {item.label}
                  </span>
                )}
                <span aria-hidden="true" className="text-text-inverse/50">/</span>
              </React.Fragment>
            );
          })}
        </motion.nav>

        {eyebrow ? (
          <motion.p
            variants={breadcrumbVariants}
            className="mt-4 text-mini uppercase tracking-widest text-text-inverse/80"
          >
            {eyebrow}
          </motion.p>
        ) : null}

        <motion.h1
          variants={headlineVariants}
          className="mt-3 font-heading text-h2 lg:text-h1 text-text-inverse max-w-4xl"
        >
          {headlineAccent && accentPosition === "start" ? (
            <>
              <span className="text-brand-shade">{headlineAccent}</span>{" "}
            </>
          ) : null}
          {headline}
          {headlineAccent && accentPosition === "end" ? (
            <>
              {" "}
              <span className="text-brand-shade">{headlineAccent}</span>
            </>
          ) : null}
        </motion.h1>

        <motion.p
          variants={subtitleVariants}
          className="mt-4 max-w-[892px] text-body-md text-text-inverse/[0.67]"
        >
          {subtitle}
        </motion.p>

        {resultCount ? (
          <motion.p
            variants={resultCountVariants}
            className={cn(
              "mt-4 text-mini uppercase tracking-widest",
              resultCountTone === "inverse"
                ? "text-text-inverse"
                : "text-brand-shade",
            )}
          >
            {resultCount}
          </motion.p>
        ) : null}
      </motion.div>
    </section>
  );
}
