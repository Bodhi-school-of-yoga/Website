"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { ChecklistItem } from "@/components/ui/checklist-item";

export type PreRequisitesSectionProps = {
  eyebrow: string;
  heading: string;
  items: string[];
  leftImage: string;
  rightImage: string;
  leftImageAlt?: string;
  rightImageAlt?: string;
  className?: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function PreRequisitesSection({
  eyebrow,
  heading,
  items,
  leftImage,
  rightImage,
  leftImageAlt = "",
  rightImageAlt = "",
  className,
}: PreRequisitesSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-brand-lite py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-4 top-[18%] hidden h-[380px] w-[280px] -translate-y-1/2 overflow-hidden rounded-[18px] shadow-[0_24px_60px_-20px_rgba(0,62,34,0.25)] lg:block xl:left-12"
        initial={{ opacity: 0, x: reduce ? 0 : -40, rotate: -6.81 }}
        whileInView={{ opacity: 1, x: 0, rotate: -6.81 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reduce ? undefined : { rotate: -3, scale: 1.02 }}
      >
        <Image
          src={leftImage}
          alt={leftImageAlt}
          fill
          sizes="280px"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-4 bottom-[18%] hidden h-[400px] w-[300px] translate-y-1/2 overflow-hidden rounded-[18px] shadow-[0_24px_60px_-20px_rgba(0,62,34,0.25)] lg:block xl:right-12"
        initial={{ opacity: 0, x: reduce ? 0 : 40, rotate: 6.5 }}
        whileInView={{ opacity: 1, x: 0, rotate: 6.5 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        whileHover={reduce ? undefined : { rotate: 3, scale: 1.02 }}
      >
        <Image
          src={rightImage}
          alt={rightImageAlt}
          fill
          sizes="300px"
          className="object-cover"
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1340px] page-px">
        <motion.div
          className="mx-auto flex max-w-[640px] flex-col items-center gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px" }}
          variants={containerVariants}
        >
          <motion.header
            className="flex flex-col items-center gap-4"
            variants={itemVariants}
          >
            <p className="text-mini font-heading uppercase tracking-widest text-text-brand">
              {eyebrow}
            </p>
            <h2 className="font-heading text-h2 font-semibold text-text-secondary">
              {heading}
            </h2>
          </motion.header>

          <motion.ul
            className="flex w-full flex-col gap-[10px]"
            variants={containerVariants}
          >
            {items.map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                whileHover={
                  reduce
                    ? undefined
                    : { y: -2, transition: { duration: 0.2 } }
                }
              >
                <ChecklistItem
                  label={item}
                  className="text-left transition-shadow duration-200 hover:shadow-[0_8px_24px_-12px_rgba(0,62,34,0.18)]"
                />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:hidden">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] shadow-[0_24px_60px_-20px_rgba(0,62,34,0.18)]">
            <Image
              src={leftImage}
              alt={leftImageAlt}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] shadow-[0_24px_60px_-20px_rgba(0,62,34,0.18)]">
            <Image
              src={rightImage}
              alt={rightImageAlt}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
