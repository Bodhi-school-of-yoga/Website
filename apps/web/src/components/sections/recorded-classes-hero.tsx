"use client";

// RecordedClassesHero — hero section for the recorded classes listing page with course-count and category filters.
import * as React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import Link from "next/link";
import { SimpleBreadcrumb, type BreadcrumbItemData as BreadcrumbItem } from "@/components/ui/breadcrumb";
import { StatTile } from "@/components/ui/stat-tile";
import { CountdownWidget } from "@/components/ui/countdown-widget";
import {
  RecordedClassPricingCard,
  type RecordedClassPricingCardProps,
} from "@/components/recorded-class/recorded-class-pricing-card";
import { cn } from "@/lib/utils";

type HeroStat = { value: React.ReactNode; label: string };

type RecordedClassesHeroProps = {
  backgroundImage: string;
  backgroundAlt?: string;
  breadcrumb: BreadcrumbItem[];
  titleLines: [string, string?];
  lede: string;
  stats?: HeroStat[];
  startsAt?: string | Date;
  countdownEyebrow?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  pricing: RecordedClassPricingCardProps;
  onCtaClick?: () => void;
  className?: string;
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function RecordedClassesHero({
  backgroundImage,
  backgroundAlt = "",
  breadcrumb,
  titleLines,
  lede,
  stats,
  startsAt,
  countdownEyebrow = "Workshop starting in",
  primaryCtaLabel,
  primaryCtaHref = "#reserve",
  pricing,
  onCtaClick,
  className,
}: RecordedClassesHeroProps) {
  const [titleLine1, titleLine2] = titleLines;
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden text-text-inverse",
        "min-h-[760px] lg:min-h-[993px]",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
      </motion.div>

      <div className="relative mx-auto max-w-[1340px] page-px pt-32 pb-20 lg:pt-[221px] lg:pb-[290px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_340px] lg:gap-[122px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-[636px]"
          >
            <motion.div variants={itemVariants}>
              <SimpleBreadcrumb items={breadcrumb} tone="inverse" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-[11px] text-h1 text-text-inverse"
            >
              {titleLine1}
              {titleLine2 ? (
                <>
                  <br />
                  {titleLine2}
                </>
              ) : null}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-3 max-w-[597px] text-body-md text-text-inverse/80"
            >
              {lede}
            </motion.p>

            {startsAt ? (
              <>
                <motion.div variants={itemVariants} className="mt-8 lg:mt-9">
                  <CountdownWidget
                    target={startsAt}
                    eyebrow={countdownEyebrow}
                    tone="dark"
                    align="start"
                  />
                </motion.div>
                {primaryCtaLabel ? (
                  <motion.div variants={itemVariants} className="mt-6">
                    <Link
                      href={primaryCtaHref}
                      onClick={onCtaClick ? (e) => { e.preventDefault(); onCtaClick(); } : undefined}
                      className={cn(
                        "inline-flex h-12 items-center justify-center rounded-full px-8",
                        "bg-brand-primary text-text-inverse",
                        "font-sans font-semibold text-body-md",
                        "transition-all duration-150",
                        "hover:brightness-110 hover:shadow-md active:scale-[0.98]",
                      )}
                    >
                      {primaryCtaLabel}
                    </Link>
                  </motion.div>
                ) : null}
              </>
            ) : stats ? (
              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-nowrap gap-3 lg:mt-9"
              >
                {stats.map((s, i) => (
                  <StatTile
                    key={i}
                    tone="glass"
                    value={s.value}
                    label={s.label}
                  />
                ))}
              </motion.div>
            ) : null}
          </motion.div>

          <div className="w-full lg:w-[440px]">
            <RecordedClassPricingCard {...pricing} />
          </div>
        </div>
      </div>
    </section>
  );
}

export { RecordedClassesHero };
export type { RecordedClassesHeroProps };
