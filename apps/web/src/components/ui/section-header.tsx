"use client";

// SectionHeader — animated eyebrow + heading + subheading block used at the top of sections.

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
};

const viewport = { once: true, amount: 0.2 } as const;

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        isCenter ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-mini uppercase tracking-wider text-text-brand",
            "mb-2",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <motion.h2
        className="text-h3 text-text-primary"
        initial={fadeInUp.initial}
        whileInView={fadeInUp.whileInView}
        viewport={viewport}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {title}
      </motion.h2>

      {subtitle ? (
        <motion.p
          className={cn(
            "text-body-sm text-text-tertiary mt-3 max-w-2xl",
            isCenter && "mx-auto",
          )}
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          viewport={viewport}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
