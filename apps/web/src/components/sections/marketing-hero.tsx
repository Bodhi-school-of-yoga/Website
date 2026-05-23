// MarketingHero — compact marketing hero used on landing pages with background image, headline, and CTA.
import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export type MarketingHeroProps = {
  eyebrow: string;
  headline: string;
  subtitle: string;
  backgroundImage: string;
  backgroundAlt?: string;
  className?: string;
};

/**
 * MarketingHero — bright, full-bleed image-band hero used by the
 * /online-courses and /offline-courses landing pages (Figma 1:1547, 1:4756).
 *
 * Design choice: per the build plan this is the BRIGHT variant — no overlay
 * tint is applied. Foreground text uses `text-text-inverse` so it stays
 * legible over arbitrary brand photography (the safer default per spec).
 * For the dark-overlay variant see `ListingHero` (T3).
 */
export function MarketingHero({
  eyebrow,
  headline,
  subtitle,
  backgroundImage,
  backgroundAlt = "",
  className,
}: MarketingHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        "py-16 md:py-20 lg:py-28 xl:py-32",
        className,
      )}
    >
      <Image
        src={backgroundImage}
        alt={backgroundAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center page-px text-center">
        <p className="text-mini uppercase tracking-widest text-text-brand">
          {eyebrow}
        </p>

        <h1 className="mt-4 font-heading text-h2 text-text-inverse">
          {headline}
        </h1>

        <p className="mt-6 text-subtext-1 text-text-inverse">{subtitle}</p>
      </div>
    </section>
  );
}
