"use client";

// WorkshopsComingSoonSection — full-width stacked list of workshop cards in a
// "coming soon" state. Each card shows the workshop photo, title, description,
// mode/language chips, price, an "announced soon" caption, and a disabled
// "Coming Soon" button. Matches Figma node 1059:1343 ("Our Workshops").

import * as React from "react";
import Image from "next/image";
import { Calendar, Globe, Languages } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type ComingSoonWorkshop = {
  id: string;
  title: string;
  description?: string;
  /** Optional price label. When omitted, no price is shown (pricing hidden for now). */
  price?: string;
  image: { src: string; alt: string };
  mode: string;
  language: string;
  /** Bottom-left caption. Defaults to "Date will be announced soon". */
  caption?: string;
  /** Disabled-button label. Defaults to "Coming Soon". */
  ctaLabel?: string;
};

export type WorkshopsComingSoonSectionProps = {
  workshops: ComingSoonWorkshop[];
  /** Pull the list up into the bottom of the listing hero, matching the design. */
  overlapHero?: boolean;
  className?: string;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex h-10 items-center gap-2 rounded-full border border-[#e2e2e2] bg-surface-1 px-4 text-[13px] font-semibold text-text-secondary">
      <span className="text-text-tertiary" aria-hidden="true">
        {icon}
      </span>
      {label}
    </span>
  );
}

export function WorkshopsComingSoonSection({
  workshops,
  overlapHero = false,
  className,
}: WorkshopsComingSoonSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative z-10 pb-20 lg:pb-28",
        overlapHero ? "-mt-16 sm:-mt-20 lg:-mt-[120px]" : "pt-12 lg:pt-16",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 lg:gap-[30px] page-px">
        {workshops.map((w) => {
          const caption = w.caption ?? "Date will be announced soon";
          const ctaLabel = w.ctaLabel ?? "Coming Soon";

          return (
            <motion.article
              key={w.id}
              variants={prefersReducedMotion ? undefined : cardVariants}
              initial={prefersReducedMotion ? undefined : "hidden"}
              whileInView={prefersReducedMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.25 }}
              className={cn(
                "flex w-full flex-col overflow-hidden rounded-[28px] sm:rounded-[35px]",
                "border border-border-3/60 bg-surface-1",
                "sm:flex-row",
              )}
            >
              {/* Left: workshop photo */}
              <div className="relative h-[200px] sm:h-auto w-full shrink-0 sm:w-[280px] md:w-[340px] lg:w-[420px] sm:self-stretch">
                <Image
                  src={w.image.src}
                  alt={w.image.alt}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Right: content */}
              <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-heading font-bold leading-tight text-text-primary text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] tracking-[-0.4px] max-w-[640px]">
                    {w.title}
                  </h3>
                  {w.price ? (
                    <span className="shrink-0 font-heading font-bold text-text-primary text-[18px] lg:text-[22px] tracking-[-0.4px]">
                      {w.price}
                    </span>
                  ) : null}
                </div>

                {w.description ? (
                  <p className="mt-3 max-w-[781px] font-sans text-[14px] lg:text-[15px] leading-[24px] text-text-secondary">
                    {w.description}
                  </p>
                ) : null}

                <div className="mt-4 flex flex-wrap items-center gap-[9px]">
                  <Chip icon={
                    <Image
                      src="/icon/web.svg"
                      alt="Globe icon"
                      height={18}
                      width={18}
                      className="h-[18px] w-[18px]"
                    />
                  } label={w.mode} />
                  <Chip icon={
                    <Image
                      src="/icon/eng.svg"
                      alt="Language icon"
                      height={18}
                      width={18}
                      className="h-[18px] w-[18px]"
                    />
                  } label={w.language} />
                </div>

                <div className="flex-1" />

                <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="inline-flex items-center gap-2 font-heading font-medium text-[14px] lg:text-[15px] tracking-[-0.2px] text-text-primary">
                    <Calendar className="h-[18px] w-[18px] text-text-tertiary" strokeWidth={1.75} aria-hidden="true" />
                    {caption}
                  </span>
                  <span
                    aria-disabled="true"
                    className="inline-flex h-11 w-full items-center justify-center rounded-[23px] border border-black/10 bg-surface-2 px-6 text-[14px] sm:text-[15px] font-semibold text-text-teal-dark sm:w-auto sm:min-w-[200px] lg:min-w-[241px]"
                  >
                    {ctaLabel}
                  </span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
