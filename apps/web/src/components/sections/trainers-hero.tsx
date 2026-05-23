// TrainersHero — mint hero band that scales the Figma mobile design across all breakpoints.
// Devanagari + middle-dot + English eyebrow, italic Fraunces headline, brand-green pill CTA.
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type TrainersHeroProps = {
  eyebrowDevanagari?: string;
  eyebrowEnglish?: string;
  headline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

export function TrainersHero({
  eyebrowDevanagari = "बोधि",
  eyebrowEnglish = "Our Trainers",
  headline = "Our Trainers",
  body = "Yoga is not just a series of poses and techniques. It is a lifestyle to be pursued day in and day out. In this, our teachers lead by example.",
  ctaLabel = "Join our classes",
  ctaHref = "/classes",
  className,
}: TrainersHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-brand-lite",
        "pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24",
        className,
      )}
    >
      <div className="relative mx-auto flex w-full max-w-[860px] flex-col items-center page-px text-center">
        <p
          className={cn(
            "text-mini uppercase tracking-[0.16em]",
            "text-text-tertiary",
          )}
        >
          <span lang="hi">{eyebrowDevanagari}</span>
          <span aria-hidden="true"> · </span>
          <span>{eyebrowEnglish}</span>
        </p>

        <h1
          className={cn(
            "mt-3 sm:mt-4 font-heading font-light italic text-text-brand-deep",
            "text-[44px] leading-[1.05] sm:text-[64px] lg:text-[88px]",
          )}
        >
          {headline}
        </h1>

        <p
          className={cn(
            "mt-4 sm:mt-5 max-w-[640px] text-text-primary",
            "text-body-md sm:text-subtext-1 leading-[1.6]",
          )}
        >
          {body}
        </p>

        <Link
          href={ctaHref}
          className={cn(
            "mt-6 sm:mt-7 inline-flex items-center justify-center rounded-full",
            "bg-brand-primary text-text-inverse",
            "px-[22px] py-[12px] sm:px-6 sm:py-[14px]",
            "text-body-sm font-semibold",
            "transition-all duration-200",
            "hover:brightness-105 hover:shadow-[0_12px_36px_-12px_rgba(0,152,119,0.4)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-lite",
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
