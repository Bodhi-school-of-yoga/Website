"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export type CertificationBannerSectionProps = {
  eyebrow: string;
  heading: string;
  panelHeading: string;
  panelParagraphs: string[];
  className?: string;
};

export function CertificationBannerSection({
  eyebrow,
  heading,
  panelHeading,
  panelParagraphs,
  className,
}: CertificationBannerSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "w-full bg-surface-1 py-16 sm:py-20 lg:py-24",
        className,
      )}
    >
      <div className="mx-auto max-w-[1340px] page-px">
        <motion.header
          className="flex flex-col gap-3 mb-8 lg:mb-10"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-mini font-heading uppercase tracking-widest text-text-brand">
            {eyebrow}
          </p>
          <h2 className="font-heading text-h2 font-semibold text-text-secondary">
            {heading}
          </h2>
        </motion.header>

        <motion.div
          className={cn(
            "group relative isolate overflow-hidden rounded-[28px]",
            "bg-brand-green-darkest text-white",
            "px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12",
            "shadow-[0_24px_60px_-30px_rgba(0,62,34,0.55)]",
          )}
          initial={{ opacity: 0, y: reduce ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {/* Decorative glow that animates on hover */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full",
              "bg-brand-mid/25 blur-3xl",
              "transition-transform duration-700 ease-out",
              "group-hover:translate-x-4 group-hover:-translate-y-2",
            )}
          />
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -left-32 bottom-[-40%] h-80 w-80 rounded-full",
              "bg-brand-teal/20 blur-3xl",
              "transition-transform duration-700 ease-out",
              "group-hover:-translate-x-4 group-hover:translate-y-2",
            )}
          />

          <div className="relative max-w-3xl">
            <h3 className="font-heading text-[26px] sm:text-[30px] lg:text-[34px] leading-tight">
              {panelHeading}
            </h3>
            <div className="mt-4 flex flex-col gap-3 text-white/80 text-subtext-2 leading-relaxed">
              {panelParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
