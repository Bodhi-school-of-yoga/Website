"use client";

// PreRequisitesSection — animated image-and-checklist block listing required prior knowledge for a course.
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
      

      

      <div className="relative mx-auto max-w-[1200px] page-px">
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

        
      </div>
    </section>
  );
}
