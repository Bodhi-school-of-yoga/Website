// AboutHero — full-width hero band for the About page with headline and CTA links.
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

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
  return (
    <section
      className={cn(
        "w-full bg-brand-lite",
        "mt-[88px]",
        "py-20 sm:py-24 lg:py-28 2xl:py-32",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[960px] flex-col items-center page-px text-center">
        {eyebrow ? (
          <p className="text-mini uppercase text-text-brand">{eyebrow}</p>
        ) : null}

        <h1
          className={cn(
            eyebrow ? "mt-4" : "",
            "font-heading text-text-primary font-black",
            "text-h5 sm:text-h4 lg:text-h1 max-w-[600px]",
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
