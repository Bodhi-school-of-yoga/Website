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
  marqueeTerms?: string[];
  className?: string;
};

const DEFAULT_OFFERS: HeroOfferChip[] = [
  {
    eyebrow: "yoga teacher training",
    label: "I want to teach Yoga & Pillate",
    href: "/teacher-training",
    buttonColor: "#008498",
  },
  {
    eyebrow: "daily yoga classes",
    label: "I want to learn Yoga & Pillate",
    href: "/classes",
    buttonColor: "#0d9800",
  },
  {
    eyebrow: "wellness workshops",
    label: "Looking for short Workshops",
    href: "/workshops",
    buttonColor: "#009877",
  },
];

const DEFAULT_MARQUEE = [
  "Yama",
  "Niyama",
  "Āsana",
  "Prāṇāyāma",
  "Pratyāhāra",
  "Dhāraṇā",
  "Dhyāna",
  "Samādhi",
];

export function HeroSection({
  eyebrow = "बोधि  ·  The awakening",
  headlineLead = "A school for teachers and a ",
  headlineAccent = "home for seekers.",
  subcopy = "Bodhi is a yoga teacher training institute and practice studio. We train future teachers, host workshops in health and wellness, and hold daily classes online and in person.",
  photoSrc = "/images/hero/hero-photo.jpg",
  photoAlt = "A student in a yoga posture inside Bodhi studio.",
  watermark = "बोधि",
  offerLabel = "what do we offer",
  offers = DEFAULT_OFFERS,
  marqueeTerms = DEFAULT_MARQUEE,
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
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-[88px] hidden h-[calc(100%-88px)] w-[48%] overflow-hidden rounded-l-[32px] lg:block"
      >
        <div className="relative h-full w-full">
          <Image
            src={photoSrc}
            alt=""
            fill
            priority
            sizes="48vw"
            className="object-cover object-[center_top]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-brand-lite/40" />
        </div>
      </div>

      <span
        aria-hidden
        lang="hi"
        className={cn(
          "pointer-events-none absolute select-none",
          "right-[-2vw] top-[18%] hidden font-serif font-normal italic text-[color:var(--color-text-brand)]/10",
          "leading-none tracking-[-0.04em] lg:block",
          "text-[clamp(180px,24vw,420px)]",
        )}
        style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
      >
        {watermark}
      </span>

      <div className="relative mx-auto max-w-[1340px] px-6 pb-24 pt-[104px] sm:px-8 lg:px-10 lg:pb-32 lg:pt-[128px]">
        <div className="max-w-2xl lg:max-w-[820px]">
          <p className="text-mini uppercase text-text-brand">{eyebrow}</p>

          <h1 className="mt-5 font-heading text-h4 sm:text-h3 lg:text-h2 2xl:text-h1">
            <span className="text-text-primary">{headlineLead}</span>
            <span className="text-text-brand">{headlineAccent}</span>
          </h1>

          <p className="mt-6 max-w-[560px] text-subtext-1 text-text-tertiary">
            {subcopy}
          </p>
        </div>

        <div className="relative z-10 mt-16 lg:mt-28">
          <p className="mb-5 text-center text-mini uppercase text-text-brand">
            {offerLabel}
          </p>
          <ul className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.label}>
                <HeroOfferChipCard offer={offer} />
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:hidden">
          <div className="relative mt-16 aspect-[4/3] w-full overflow-hidden rounded-[28px]">
            <Image
              src={photoSrc}
              alt={photoAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <HeroMarquee terms={marqueeTerms} />
    </section>
  );
}

function HeroOfferChipCard({ offer }: { offer: HeroOfferChip }) {
  return (
    <Link
      href={offer.href}
      className={cn(
        "group flex items-center justify-between gap-4 rounded-[27px] bg-surface-1 p-[14px] pl-7",
        "border border-border-2 shadow-card",
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-12px_rgba(0,0,0,0.18)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="text-mini uppercase text-text-brand">
          {offer.eyebrow}
        </span>
        <span className="text-subtext-3 leading-tight text-text-primary">
          {offer.label}
        </span>
      </div>
      <span
        aria-hidden
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-2 text-text-inverse transition-transform duration-300 group-hover:translate-x-0.5"
        style={{ backgroundColor: offer.buttonColor }}
      >
        <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
      </span>
    </Link>
  );
}

function HeroMarquee({ terms }: { terms: string[] }) {
  const track = [...terms, ...terms];
  return (
    <div
      aria-hidden
      className={cn(
        "relative w-full overflow-hidden border-y border-white/20",
        "bg-surface-1/70 backdrop-blur-2xl",
      )}
    >
      <div className="flex w-max animate-hero-marquee items-center gap-24 px-8 py-5">
        {track.map((term, i) => (
          <span
            key={`${term}-${i}`}
            lang="sa"
            className="shrink-0 font-serif text-subtext-2 italic text-text-secondary"
            style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
          >
            {term}
          </span>
        ))}
      </div>
    </div>
  );
}
