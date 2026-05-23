"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type HeroOfferChip = {
  eyebrow: string;
  label: string;
  href: string;
  buttonColor: string;
};

export type HeroSectionProps = {
  eyebrow?: string;
  headlineLead?: string;
  headlineAccent?: string;
  subcopy?: string;
  photoSrc?: string;
  photoAlt?: string;
  watermark?: string;
  offerLabel?: string;
  offers?: HeroOfferChip[];
  className?: string;
};

const DEFAULT_OFFERS: HeroOfferChip[] = [
  {
    eyebrow: "yoga teacher training",
    label: "I want to teach Yoga & Pillate",
    href: "/teacher-courses/online",
    buttonColor: "#008498",
  },
  {
    eyebrow: "daily yoga classes",
    label: "I want to learn Yoga & Pillate",
    href: "/contact",
    buttonColor: "#0d9800",
  },
  {
    eyebrow: "wellness workshops",
    label: "Looking for short Workshops",
    href: "/workshops",
    buttonColor: "#009877",
  },
];

export function HeroSection({
  eyebrow = "बोधि  ·  The awakening",
  headlineLead = "A school for teachers and a ",
  headlineAccent = "home for seekers.",
  subcopy = "Bodhi is a yoga teacher training institute and practice studio. We train future teachers, host workshops in health and wellness, and hold daily classes online and in person.",
  photoSrc = "/images/hero/foreground.png",
  photoAlt = "A student in seated meditation pose at Bodhi studio.",
  watermark = "बोधि",
  offerLabel = "what do we offer",
  offers = DEFAULT_OFFERS,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        "bg-[linear-gradient(to_bottom,var(--color-brand-lite)_0%,#ffffff_100%)]",
        className,
      )}
    >
      {/* DESKTOP layout (lg+): photo + watermark absolutely positioned, text + chips in normal flow */}
      <div className="relative hidden min-h-[720px] lg:block xl:min-h-[780px] 2xl:min-h-[820px]">
        {/* Watermark — behind everything, sized to dominate the right side */}
        <span
          aria-hidden
          lang="hi"
          className={cn(
            "pointer-events-none absolute select-none font-heading font-normal italic",
            "right-[-2vw] top-[120px] z-0 leading-[0.82] tracking-[-0.04em] whitespace-nowrap",
            "text-[color:var(--color-text-brand)]/[0.13]",
            "text-[22rem] xl:text-[28rem] 2xl:text-[32rem]",
          )}
          style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
        >
          {watermark}
        </span>

        {/* Photo — anchored top-right, bleeds slightly past viewport right edge.
            Source PNG is 1625×968 with woman on the right half; object-position keeps her centered. */}
        <div
          className={cn(
            "pointer-events-none absolute right-[-1.5%] top-[110px] z-10",
            "w-[480px] xl:w-[560px] 2xl:w-[620px]",
          )}
          style={{ aspectRatio: "865 / 952" }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-l-[28px]">
            <Image
              src={photoSrc}
              alt={photoAlt}
              fill
              priority
              sizes="(min-width:1536px) 620px, (min-width:1280px) 560px, 480px"
              className="object-cover object-[68%_top]"
            />
          </div>
        </div>

        {/* Content column — text + chips, inset from left to match Figma x=308/1920 (~16%) */}
        <div className="relative z-20 pl-[clamp(32px,12vw,300px)] pr-[clamp(24px,4vw,80px)] pt-[clamp(120px,10vw,180px)] pb-6">
          <div className="max-w-[480px] xl:max-w-[620px] 2xl:max-w-[760px]">
            <p className="text-mini uppercase text-text-brand">{eyebrow}</p>
            <h1 className="mt-4 font-heading text-h3 xl:text-h2 2xl:text-h1">
              <span className="text-text-primary">{headlineLead}</span>
              <span className="text-text-brand">{headlineAccent}</span>
            </h1>
            <p className="mt-5 max-w-[440px] xl:max-w-[520px] 2xl:max-w-[600px] text-subtext-2 text-text-tertiary">
              {subcopy}
            </p>
          </div>

          {/* Chips — sit below text, max 1302px wide to match Figma */}
          <div className="relative z-30 mt-8 xl:mt-10">
            <p className="mb-4 text-mini uppercase text-text-brand">
              {offerLabel}
            </p>
            <ul className="grid max-w-[1100px] xl:max-w-[1200px] grid-cols-3 gap-3 xl:gap-4">
              {offers.map((offer) => (
                <li key={offer.label}>
                  <HeroOfferChipCard offer={offer} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET layout (< lg): stacked, watermark hidden, photo below text */}
      <div className="relative lg:hidden">
        <div className="mx-auto w-full max-w-[720px] px-5 sm:px-8 pt-16 pb-10 sm:pt-20">
          <p className="text-mini uppercase text-text-brand">{eyebrow}</p>
          <h1 className="mt-4 font-heading text-h5 leading-[1.15] sm:text-h4 sm:leading-[1.1] md:text-h3">
            <span className="text-text-primary">{headlineLead}</span>
            <span className="text-text-brand">{headlineAccent}</span>
          </h1>
          <p className="mt-5 text-subtext-1 text-text-tertiary">{subcopy}</p>

          <div className="relative mt-8 aspect-[4/5] w-full overflow-hidden rounded-[24px]">
            <Image
              src={photoSrc}
              alt={photoAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_top]"
            />
          </div>

          <div className="mt-10">
            <p className="mb-4 text-mini uppercase text-text-brand">
              {offerLabel}
            </p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {offers.map((offer) => (
                <li key={offer.label}>
                  <HeroOfferChipCard offer={offer} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroOfferChipCard({ offer }: { offer: HeroOfferChip }) {
  return (
    <Link
      href={offer.href}
      className={cn(
        "group flex h-[102px] items-center justify-between gap-3 rounded-[27px] bg-surface-1 px-[25px]",
        "border border-border-2 shadow-[0_28px_60px_-16px_rgba(180,180,180,0.35)]",
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.18)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
      )}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-mini uppercase text-text-brand">
          {offer.eyebrow}
        </span>
        <span className="text-subtext-3 leading-tight text-text-primary">
          {offer.label}
        </span>
      </div>
      <span
        aria-hidden
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-inverse transition-transform duration-300 group-hover:translate-x-0.5"
        style={{ backgroundColor: offer.buttonColor }}
      >
        <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
      </span>
    </Link>
  );
}
