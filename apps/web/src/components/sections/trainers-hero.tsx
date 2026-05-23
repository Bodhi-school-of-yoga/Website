import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type TrainersHeroProps = {
  backgroundImage?: string;
  backgroundAlt?: string;
  headline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

export function TrainersHero({
  backgroundImage = "/images/trainers/hero-bg.png",
  backgroundAlt = "",
  headline = "Our Trainers",
  body = "Yoga is not just a series of poses and techniques. It is a lifestyle to be pursued day in and day out. In this, our teachers lead by example.",
  ctaLabel = "Join our classes",
  ctaHref = "/classes",
  className,
}: TrainersHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        "min-h-[640px] sm:min-h-[760px] lg:min-h-[860px] 2xl:min-h-[910px]",
        "flex items-center justify-center",
        "pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28",
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

      <div aria-hidden="true" className="absolute inset-0 bg-black/[0.69]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1340px] flex-col items-center page-px text-center">
        <div className="flex w-full max-w-[603px] flex-col items-center gap-[14px]">
          <h1
            className={cn(
              "font-heading text-text-inverse",
              "text-h3 sm:text-h2 lg:text-h1",
            )}
          >
            {headline}
          </h1>

          <p
            className={cn(
              "text-subtext-1 text-text-inverse",
              "leading-[1.59]",
            )}
          >
            {body}
          </p>
        </div>

        <Link
          href={ctaHref}
          className={cn(
            "mt-[26px] inline-flex items-center justify-center rounded-full",
            "bg-brand-shade text-brand-green-deep",
            "px-[15px] py-[15px] min-w-[189px] h-[48px]",
            "text-body-sm font-semibold",
            "transition-all duration-200",
            "hover:brightness-105 hover:shadow-[0_12px_36px_-12px_rgba(142,224,206,0.55)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-shade/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
