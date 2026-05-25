"use client";

// FounderQuoteSection — two-column band with founder quote + attribution on the left and portrait image on the right.


import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import Image from "next/image";

export type FounderQuoteSectionProps = {
  eyebrow?: string;
  quoteLead?: string;
  quoteAccent?: string;
  quoteTrail?: string;
  attribution?: string;
  className?: string;
};

const HOUSE_EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-80px 0px -80px 0px" } as const;

export function FounderQuoteSection({
  eyebrow = "Our practice",
  quoteLead = "When a woman is empowered through yoga, her entire family, community, and ",
  quoteAccent = "future generations benefit. ",
  quoteTrail = "",
  attribution = "—Acharya Ashok, Founder",
  className,
}: FounderQuoteSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const rootVariants: Variants = {
    hidden: {},
    visible: {
      transition: prefersReducedMotion
        ? {}
        : { staggerChildren: 0.08, delayChildren: 0 },
    },
  };

  const fadeInUpSoft: Variants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: HOUSE_EASE,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: HOUSE_EASE,
      },
    },
  };


  return (
    <section
      className={cn(
        "w-full bg-white py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-[1340px] gap-12 page-px",
          "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:justify-between lg:items-center lg:gap-32",
        )}
      >
        <div className="flex flex-col gap-6">
          <p className="text-mini uppercase text-text-brand">{eyebrow}</p>
          <blockquote className="flex flex-col gap-3">
            <p className="font-heading text-h4 text-brand-dark">
              <span>{quoteLead}</span>
              <span className="text-text-brand">{quoteAccent}</span>
              <span>{quoteTrail}</span>
            </p>
            <cite className="font-heading italic text-subtext-2 text-text-brand">
              {attribution}
            </cite>
          </blockquote>
        </div>

        <div className="flex flex-col gap-10 sm:gap-12 lg:max-w-[600px]">
         <Image
         src="/images/hero/founder.png"
         height="500"
         width="500"
         alt=""
         />
        </div>
      </div>
    </section>
  );
}
