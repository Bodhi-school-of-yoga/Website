"use client";

// WorkshopDetailHero — top-of-page hero for a workshop detail page with image, date, location, and register CTA.
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, User } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { BookingCard, type BookingCardChip } from "@/components/ui/booking-card";
import { CountdownWidget } from "@/components/ui/countdown-widget";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type WorkshopDetailHeroProps = {
  backgroundImage: string;
  backgroundAlt?: string;
  breadcrumb: BreadcrumbItem[];
  titleAccent: string;
  title: string;
  subtitle: string;
  startsAt: string | Date;
  countdownEyebrow?: string;
  attendees?: number;
  primaryCtaLabel: string;
  primaryCtaHref?: string;
  onCtaClick?: () => void;
  booking: {
    eyebrow?: string;
    price: string;
    currency?: string;
    priceStrike?: string;
    saveNote?: string;
    chips: BookingCardChip[];
    ctaLabel: string;
    ctaHref?: string;
    onCtaClick?: () => void;
    guaranteeNote?: string;
  };
  className?: string;
};

export function WorkshopDetailHero({
  backgroundImage,
  backgroundAlt = "",
  breadcrumb,
  titleAccent,
  title,
  subtitle,
  startsAt,
  countdownEyebrow = "Workshop starting in",
  attendees = 1,
  primaryCtaLabel,
  primaryCtaHref = "#reserve",
  onCtaClick,
  booking,
  className,
}: WorkshopDetailHeroProps) {
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
  const titleVariants = makeItemVariants(12, 0.32);
  const subtitleVariants = makeItemVariants(10, 0.28);
  const countdownVariants = makeItemVariants(10, 0.3);
  const ctaVariants = makeItemVariants(10, 0.3);
  const bookingVariants = makeItemVariants(14, 0.36);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        "min-h-[760px] sm:min-h-[820px] lg:min-h-[880px]",
        "flex items-start",
        "pt-44 pb-12 sm:pt-48 sm:pb-14 lg:pt-56 lg:pb-16",
        className,
      )}
    >
      <Image
        src={backgroundImage}
        alt={backgroundAlt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/60" />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1340px] flex-col items-stretch gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-12 page-px"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Left column — content */}
        <div className="flex w-full max-w-[640px] flex-col gap-10 lg:gap-12">
          <div className="flex flex-col gap-4">
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
                        className="transition-colors hover:text-text-inverse"
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
                    {!isLast ? (
                      <span aria-hidden="true" className="text-text-inverse/50">
                        /
                      </span>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </motion.nav>

            <motion.h1
              variants={titleVariants}
              className="font-heading font-bold text-text-inverse text-[2.75rem] leading-[1.05] sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[4.5rem]"
            >
              <span className="text-brand-shade">{titleAccent}</span>{" "}
              {title}
            </motion.h1>

            <motion.p
              variants={subtitleVariants}
              className="max-w-[640px] text-body-md text-text-inverse/65 sm:text-[1.25rem] sm:leading-[1.5]"
            >
              {subtitle}
            </motion.p>
          </div>

          <motion.div variants={countdownVariants}>
            <CountdownWidget
              target={startsAt}
              eyebrow={countdownEyebrow}
              tone="dark"
              align="start"
            />
          </motion.div>

          <motion.div
            variants={ctaVariants}
            className="flex flex-wrap items-center gap-3"
          >
            <div
              className={cn(
                "inline-flex h-12 items-center gap-2 rounded-full px-5",
                "border border-white/30 bg-white/15 backdrop-blur-md",
                "text-text-inverse text-body-sm font-medium",
              )}
            >
              <User className="h-4 w-4" strokeWidth={2} />
              <span>
                {attendees} user{attendees === 1 ? "" : "s"}
              </span>
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </div>

            {onCtaClick ? (
              <button
                type="button"
                onClick={onCtaClick}
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-full px-8",
                  "bg-brand-shade text-text-secondary",
                  "font-sans font-semibold text-body-sm uppercase tracking-[1px]",
                  "transition-all duration-150",
                  "hover:bg-brand-shade/85 active:scale-[0.98]",
                )}
              >
                {primaryCtaLabel} →
              </button>
            ) : (
              <Link
                href={primaryCtaHref}
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-full px-8",
                  "bg-brand-shade text-text-secondary",
                  "font-sans font-semibold text-body-sm uppercase tracking-[1px]",
                  "transition-all duration-150",
                  "hover:bg-brand-shade/85 active:scale-[0.98]",
                )}
              >
                {primaryCtaLabel} →
              </Link>
            )}
          </motion.div>
        </div>

        {/* Right column — booking card */}
        <motion.div
          variants={bookingVariants}
          className="flex w-full justify-start lg:w-auto lg:flex-shrink-0 lg:justify-end"
        >
          <BookingCard {...booking} />
        </motion.div>
      </motion.div>
    </section>
  );
}
