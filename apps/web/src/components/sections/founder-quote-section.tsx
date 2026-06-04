"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";

import { cn } from "@/lib/utils";

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
  eyebrow = "Our Philosophy",
  quoteLead = "When a woman is empowered through yoga, her entire family, community, and ",
  quoteAccent = "future generations benefit. ",
  quoteTrail = "",
  attribution = "—Acharya Ashok, Founder",
  className,
}: FounderQuoteSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: prefersReducedMotion
        ? {}
        : { staggerChildren: 0.12, delayChildren: 0 },
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
        "w-full bg-white py-12 sm:py-16 md:py-20 lg:py-28",
        className,
      )}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className={cn(
          "mx-auto grid max-w-[1200px] gap-8 sm:gap-10 page-px",
          "md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-12 lg:gap-20",
        )}
      >
        {/* Text column */}
        <motion.div variants={fadeInUp} className="order-2 flex flex-col gap-4 sm:gap-6 md:order-1">
          <p className="text-mini uppercase text-text-brand">{eyebrow}</p>
          <blockquote className="flex flex-col gap-3">
            <p className="font-heading text-[clamp(1.25rem,2.5vw+0.5rem,2.25rem)] leading-[1.3] text-brand-dark">
              <span>{quoteLead}</span>
              <span className="text-text-brand">{quoteAccent}</span>
              <span>{quoteTrail}</span>
            </p>
            <cite className="font-heading italic text-subtext-2 text-text-brand">
              {attribution}
            </cite>
          </blockquote>
        </motion.div>

        {/* Image column — BGring rotates behind Founder */}
        <motion.div
          variants={fadeInUp}
          className="relative order-1 flex items-center justify-center aspect-square max-w-[280px] sm:max-w-[360px] md:max-w-[500px] mx-auto md:order-2"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 70,
              ease: "linear",
            }}
            className="absolute inset-[-16%] md:inset-[-20%] z-0"
          >
            <Image
              src="/BGring.svg"
              fill
              alt=""
              className="object-contain  "/>
          </motion.div>

          <Image
            src="/Founder.png"
            height={500}
            width={260}
            alt="Acharya Ashok, Founder"
            className="relative z-10 rounded-lg object-cover max-h-[200px] sm:max-h-[280px] md:max-h-[400px] w-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
