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
        "w-full bg-white py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className={cn(
          "mx-auto grid max-w-[1200px] gap-12 page-px",
          "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-32",
        )}
      >
        {/* Text column */}
        <motion.div variants={fadeInUp} className="order-2 flex flex-col gap-6 lg:order-1">
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
        </motion.div>

        {/* Image column — BGring rotates behind Founder */}
        <motion.div
          variants={fadeInUp}
          className=" hidden md:block relative order-1 flex items-center justify-center aspect-square max-w-[500px] mx-auto lg:order-2"
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
            className="relative z-10 rounded-lg object-cover max-h-[210px] md:max-h-[400px] w-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
