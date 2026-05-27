"use client";

// CourseCard — card displaying course thumbnail, title, instructor, meta, and enroll CTA.

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { CountdownWidget } from "@/components/ui/countdown-widget";
import { CourseMetaChip } from "@/components/ui/course-meta-chip";
import { StatTile } from "@/components/ui/stat-tile";
import { cn } from "@/lib/utils";

export type CourseCardFeature = {
  icon: React.ReactNode;
  label: string;
};

export type CourseCardStat = {
  value: React.ReactNode;
  label: string;
};

export type CourseCardImage = {
  src: string;
  alt: string;
};

type CommonProps = {
  image: CourseCardImage;
  title: string;
  description: string;
  price: string;
  /** Optional original price — shown struck-through above the live price to signal a discount. */
  originalPrice?: string;
  /** Tiny caption shown below the price (e.g. "incl. taxes"). */
  taxNote?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /**
   * When set, the whole card is clickable and navigates here. The inner CTA
   * button still works independently (and may point at a different href, e.g.
   * checkout vs. detail page).
   */
  cardHref?: string;
  className?: string;
  /**
   * Bottom-right slot: if provided, shows a live countdown widget. Takes
   * precedence over `startsCaption`.
   */
  countdownTarget?: Date | string | number;
  countdownEyebrow?: string;
  /** Bottom-right caption shown when no countdown is provided. */
  startsCaption?: string;
};

type CourseVariantProps = CommonProps & {
  variant?: "course";
  features: CourseCardFeature[];
};

type WorkshopVariantProps = CommonProps & {
  variant: "workshop";
  stats: CourseCardStat[];
};

export type CourseCardProps = CourseVariantProps | WorkshopVariantProps;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
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

function CourseCard(props: CourseCardProps) {
  const {
    image,
    title,
    description,
    price,
    originalPrice,
    taxNote,
    ctaLabel,
    ctaHref = "#",
    cardHref,
    className,
  } = props;

  const prefersReducedMotion = useReducedMotion();
  const isWorkshop = props.variant === "workshop";

  const resolvedCtaLabel =
    ctaLabel ?? (isWorkshop ? "Purchase now" : "Book spot now");

  const motionProps = prefersReducedMotion
    ? {
        initial: "visible" as const,
        animate: "visible" as const,
      }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.3 },
      };

  const hasCountdown = props.countdownTarget !== undefined;
  const hasBottomMeta = hasCountdown || Boolean(props.startsCaption);

  const bottomMeta = hasCountdown ? (
    <CountdownWidget
      target={props.countdownTarget!}
      eyebrow={props.countdownEyebrow ?? "Workshop starting in"}
      size="sm"
      align="start"
    />
  ) : props.startsCaption ? (
    <span className="font-heading font-bold text-subtext-2 text-text-primary">
      {props.startsCaption}
    </span>
  ) : null;

  return (
    <motion.article
      variants={prefersReducedMotion ? undefined : containerVariants}
      {...motionProps}
      className={cn(
        "group/card relative flex w-full  min-h-[260px] overflow-hidden rounded-[20px] sm:rounded-[24px]",
        "flex-col sm:flex-row",
        "bg-surface-1 border border-border-3/60",
        "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md",
        cardHref ? "focus-within:shadow-md" : null,
        className
      )}
    >
      {/* Full-card click overlay — sits below interactive children so the
          inner CTA Button still gets its own clicks. */}
      {cardHref ? (
        <Link
          href={cardHref}
          aria-label={`Open ${title}`}
          className="absolute inset-0 z-0 rounded-[35px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-shade/60"
        />
      ) : null}

      {/* Left half: hero photo — self-stretches to match card height */}
      <motion.div
        variants={prefersReducedMotion ? undefined : itemVariants}
        className="relative w-full h-[220px] sm:h-auto sm:w-[340px] shrink-0 self-stretch"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 640px) 288px, 100vw"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Right column: flex column so chips, CTA and timer never collide */}
      <div className="relative z-10 flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-5 lg:px-7 lg:py-6">
        {/* Top row: title + price column */}
        <div className="flex items-start justify-between gap-4">
          <motion.h3
            variants={prefersReducedMotion ? undefined : itemVariants}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 0.4, ease: "easeOut", delay: 0.06 }
            }
            style={{ lineHeight: 1 }}
            className="font-heading font-bold text-[28px] text-text-primary max-w-[520px]"
          >
            {title}
          </motion.h3>
          {bottomMeta}


      
        </div>

        <motion.p
          variants={prefersReducedMotion ? undefined : itemVariants}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.4, ease: "easeOut", delay: 0.12 }
          }
          className=" max-w-[520px] font-sans font-normal text-[15px]  text-text-secondary  mb-3"
        >
          {description}
        </motion.p>

        {/* Chips / stats — variant-specific */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.4, ease: "easeOut", delay: 0.18 }
          }
          className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2"
        >
          {isWorkshop
            ? props.stats.map((stat) => (
                <StatTile
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  size="sm"
                />
              ))
            : props.features.map((feature) => (
                <CourseMetaChip
                  key={feature.label}
                  icon={feature.icon}
                  label={feature.label}
                />
              ))}
        </motion.div>
        

        {/* Pushes the bottom row to the card floor */}
        <div className="flex-1" />
        <div className="flex items-center justify-between gap-4">
            <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 0.4, ease: "easeOut", delay: 0.18 }
            }
            className="flex shrink-0 flex-col items-start gap-0 leading-none mt-6"
          >
            {originalPrice ? (
              <span className="font-sans text-body-md text-text-tertiary line-through">
                {originalPrice}
              </span>
            ) : null}
            <span
              className={cn(
                "font-heading font-extrabold text-[26px] text-text-brand tracking-tight",
                originalPrice ? "mt-0.5" : null,
              )}
            >
              {price}
            </span>
            {/* {taxNote ? (
              <span className="mt-1 font-sans text-mini normal-case tracking-normal text-text-tertiary">
                {taxNote}
              </span>
            ) : null} */}
          </motion.div>
           <Button
            variant="mint"
            size="pill"
            className="h-12 px-12 mt-8 text-base font-semibold"
            render={<Link href={ctaHref} />}
          >
            {resolvedCtaLabel}
          </Button>
          </div>

        {/* Bottom row: CTA on the left, timer/caption on the right */}
        
      </div>
    </motion.article>
  );
}

export { CourseCard };
