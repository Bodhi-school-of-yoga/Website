import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export type ListingHeroProps = {
  backgroundImage: string;
  backgroundAlt?: string;
  eyebrow?: string;
  breadcrumb?: string;
  headline: string;
  headlineAccent?: string;
  subtitle: string;
  resultCount?: string;
  className?: string;
};

export function ListingHero({
  backgroundImage,
  backgroundAlt = "",
  eyebrow,
  breadcrumb,
  headline,
  headlineAccent,
  subtitle,
  resultCount,
  className,
}: ListingHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        "min-h-[360px] sm:min-h-[420px] lg:min-h-[460px]",
        "flex items-center justify-center",
        "py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <Image
        src={backgroundImage}
        alt={backgroundAlt}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/80"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center sm:px-8">
        {eyebrow ? (
          <p className="text-mini uppercase tracking-widest text-text-inverse/80">
            {eyebrow}
          </p>
        ) : breadcrumb ? (
          <p className="text-body-sm text-text-inverse/70">{breadcrumb}</p>
        ) : null}

        <h1 className="mt-4 font-heading text-h1 text-text-inverse">
          {headline}
          {headlineAccent ? (
            <>
              {" "}
              <span className="text-brand-shade">{headlineAccent}</span>
            </>
          ) : null}
        </h1>

        <p className="mt-6 mx-auto max-w-2xl text-body-md text-text-inverse/80">
          {subtitle}
        </p>

        {resultCount ? (
          <p className="mt-6 text-mini uppercase text-text-inverse/70">
            {resultCount}
          </p>
        ) : null}
      </div>
    </section>
  );
}
