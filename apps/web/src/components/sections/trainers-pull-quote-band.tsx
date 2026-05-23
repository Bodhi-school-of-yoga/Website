// TrainersPullQuoteBand — dark-green band with a giant italic Fraunces quote glyph, body quote, and attribution.
import * as React from "react";

import { cn } from "@/lib/utils";

export type TrainersPullQuoteBandProps = {
  quote?: string;
  attribution?: string;
  className?: string;
};

export function TrainersPullQuoteBand({
  quote = "Yoga is not just a series of poses and techniques. It is a lifestyle to be pursued day in and day out. In this, our teachers lead by example.",
  attribution = "— The Bodhi Faculty",
  className,
}: TrainersPullQuoteBandProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-brand-green-deep text-text-inverse",
        className,
      )}
    >
      {/* Mobile: single oversized opening-quote glyph anchored top-left */}
      <div className="relative mx-auto flex h-[354px] w-full max-w-[1100px] flex-col page-px py-12 md:hidden">
        <span
          aria-hidden="true"
          className={cn(
            "font-heading italic font-normal leading-none select-none pointer-events-none",
            "text-[80px]",
            "text-text-cyan/35",
          )}
        >
          &ldquo;
        </span>

        <p
          className={cn(
            "mt-4 font-heading italic font-normal",
            "text-[22px] leading-[1.3]",
            "text-text-inverse",
          )}
        >
          {quote}
        </p>

        <p
          className={cn(
            "mt-6 font-medium uppercase tracking-[0.16em]",
            "text-mini",
            "text-text-mint-pale",
          )}
        >
          {attribution}
        </p>
      </div>

      {/* Desktop / tablet: paired-glyph centered layout */}
      <div className="relative mx-auto hidden max-w-[1100px] flex-col items-start page-px py-12 sm:py-16 md:flex lg:py-20">
        <span
          aria-hidden="true"
          className={cn(
            "font-heading italic font-normal leading-[0.8] select-none pointer-events-none",
            "text-[80px] sm:text-[120px] lg:text-[160px]",
            "text-text-mint-pale",
          )}
        >
          &ldquo;
        </span>

        <p
          className={cn(
            "mt-2 sm:mt-4 max-w-[820px] font-heading italic font-normal",
            "text-[22px] leading-[1.3] sm:text-[28px] lg:text-[34px] lg:leading-[1.35]",
            "text-text-inverse",
          )}
        >
          {quote}
        </p>

        <p
          className={cn(
            "mt-6 sm:mt-8 font-medium",
            "text-[13px] sm:text-[14px] lg:text-body-md",
            "text-text-mint-pale",
          )}
        >
          {attribution}
        </p>
      </div>
    </section>
  );
}
