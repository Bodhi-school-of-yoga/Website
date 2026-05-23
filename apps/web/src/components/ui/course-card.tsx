"use client";

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
  ctaLabel?: string;
  ctaHref?: string;
  /**
   * When set, the whole card is clickable and navigates here. The inner CTA
   * button still works independently (and may point at a different href, e.g.
   * checkout vs. detail page).
   */
  cardHref?: string;
  className?: string;
};

type CourseVariantProps = CommonProps & {
  variant?: "course";
  features: CourseCardFeature[];
  startsCaption: string;
};

type WorkshopVariantProps = CommonProps & {
  variant: "workshop";
  stats: CourseCardStat[];
  countdownTarget: Date | string | number;
  countdownEyebrow?: string;
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

  return (
    <motion.article
      variants={prefersReducedMotion ? undefined : containerVariants}
      {...motionProps}
      className={cn(
        "group/card relative flex w-[1308px] h-[362px] overflow-hidden rounded-[35px]",
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

      {/* Left half: hero photo */}
      <motion.div
        variants={prefersReducedMotion ? undefined : itemVariants}
        className="relative w-[447px] h-[362px] shrink-0"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="447px"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Right column: content */}
      <div className="relative flex-1 px-10 py-7">
        <motion.h3
          variants={prefersReducedMotion ? undefined : itemVariants}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.4, ease: "easeOut", delay: 0.06 }
          }
          className="font-heading font-bold text-h3 text-text-primary max-w-[520px]"
        >
          {title}
        </motion.h3>

        <motion.p
          variants={prefersReducedMotion ? undefined : itemVariants}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.4, ease: "easeOut", delay: 0.12 }
          }
          className="mt-4 max-w-[520px] font-sans font-normal text-subtext-2 text-text-secondary"
        >
          {description}
        </motion.p>

        {/* Middle row — variant-specific */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.4, ease: "easeOut", delay: 0.18 }
          }
          className="mt-8 flex gap-[15px]"
        >
          {isWorkshop
            ? props.stats.map((stat) => (
                <StatTile
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
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

        {/* Price — top-right */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.4, ease: "easeOut", delay: 0.18 }
          }
          className="absolute top-7 right-10 font-heading font-bold text-h4 leading-none text-text-primary"
        >
          {price}
        </motion.div>

        {/* CTA — bottom-left of right column */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.4, ease: "easeOut", delay: 0.24 }
          }
          className="absolute bottom-7 left-10 z-10"
        >
          <Button
            variant="mint"
            size="pill"
            render={<Link href={ctaHref} />}
          >
            {resolvedCtaLabel}
          </Button>
        </motion.div>

        {/* Bottom-right — variant-specific */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.4, ease: "easeOut", delay: 0.3 }
          }
          className="absolute bottom-7 right-10 z-10 pointer-events-none"
        >
          {isWorkshop ? (
            <CountdownWidget
              target={props.countdownTarget}
              eyebrow={props.countdownEyebrow ?? "Workshop starting in"}
            />
          ) : (
            <span className="font-heading font-bold text-subtext-2 text-text-primary">
              {props.startsCaption}
            </span>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
}

export { CourseCard };
