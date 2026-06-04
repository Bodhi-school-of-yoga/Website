// AboutHero — full-width hero band for the About page with headline and CTA links.
"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePromoBanner } from "@/components/ui/use-promo-banner";

export type AboutHeroProps = {
  eyebrow?: string;
  headline?: string;
  subcopy?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

export function AboutHero({
  eyebrow = "Our Story",
  headline = "About Bodhi School of Yoga",
  subcopy = "Bodhi School of Yoga blends ancient wisdom with modern practice — a place to learn, heal, and lead.",
  ctaLabel = "Join our classes",
  ctaHref = "/classes",
  className,
}: AboutHeroProps) {
  const { visible: bannerVisible } = usePromoBanner();
  return (
    <section
      className={cn(
        "w-full bg-brand-lite",
        bannerVisible
          ? "pt-[140px] sm:pt-[148px] lg:pt-[160px]"
          : "pt-[96px] sm:pt-[104px] lg:pt-[116px]",
        "pb-12 sm:pb-16 md:pb-20 lg:pb-28 2xl:pb-32",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[960px] flex-col items-center page-px text-center">
        {eyebrow ? (
          <p className="text-mini uppercase text-text-brand">{eyebrow}</p>
        ) : null}

        <h1
          className={cn(
            eyebrow ? "mt-3 sm:mt-4" : "",
            "font-heading text-text-primary font-black",
            "text-[clamp(1.5rem,4vw+0.5rem,5.625rem)] leading-[1.15] max-w-[600px]",
          )}
        >
          {headline}
        </h1>

        {subcopy ? (
          <p className="mt-6 max-w-xl text-subtext-1 text-text-tertiary ">
            {subcopy}
          </p>
        ) : null}

        <Link
          href={ctaHref}
          className={cn(
            "mt-10 inline-flex w-fit items-center justify-center rounded-full px-7 py-3.5",
            "bg-brand-primary text-text-inverse",
            "text-body-md font-semibold",
            "shadow-sm transition-all duration-200",
            "hover:brightness-110 hover:shadow-md hover:shadow-brand-primary/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
