"use client";

import * as React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { StatTile } from "@/components/ui/stat-tile";
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
  stats: HeroStat[];
  pricing: RecordedClassPricingCardProps;
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
  pricing,
  className,
}: RecordedClassesHeroProps) {
  const [titleLine1, titleLine2] = titleLines;
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden text-text-inverse",
        "min-h-[760px] lg:min-h-[900px]",
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

      <div className="relative mx-auto max-w-[1920px] page-px pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-[636px]"
          >
            <motion.div variants={itemVariants}>
              <Breadcrumb items={breadcrumb} tone="inverse" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-3 text-h1 text-text-inverse"
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
              className="mt-10 max-w-[597px] text-body-md text-text-inverse/80 lg:mt-32"
            >
              {lede}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-3 lg:mt-9"
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
          </motion.div>

          <div className="w-full lg:w-[340px]">
            <RecordedClassPricingCard {...pricing} />
          </div>
        </div>
      </div>
    </section>
  );
}

export { RecordedClassesHero };
export type { RecordedClassesHeroProps };
