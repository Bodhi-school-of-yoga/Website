"use client";

// HeroSection — homepage hero. Desktop layout is anchored to the 1920px Figma
// design (node 1:32). All horizontal positions, image size, and the watermark
// are expressed in vw of 1920 (see .hero-1920 utility in globals.css) so the
// design holds at 1920 and compresses proportionally on smaller desktops.
// Typography uses Bodhi tokens (text-h1 / text-hero-eyebrow / text-hero-sub)
// which scale through --u-display / --u-text, both anchored at 1920.
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
  {
    eyebrow:"Yoga Therapies",
    label:"Looking for relief from lifestyle diseases",
    href:"",
    buttonColor: "#009877",

  }
];

const DEFAULTS = {
  eyebrow: "बोधि  ·  The awakening",
  headlineLead: "Yoga for Self. ",
  headlineAccent: "Yoga for Teaching.",
  subcopy:
    "Discover a premium yoga and wellness experience offering teacher training, regular practice, and therapy sessions through immersive online and offline programs.",
  photoSrc: "/images/hero/foreground.png",
  photoAlt: "A student in seated meditation pose at Bodhi studio.",
  watermark: "बोधि",
  offerLabel: "what do we offer",
};

export function HeroSection({
  eyebrow = DEFAULTS.eyebrow,
  headlineLead = DEFAULTS.headlineLead,
  headlineAccent = DEFAULTS.headlineAccent,
  subcopy = DEFAULTS.subcopy,
  photoSrc = DEFAULTS.photoSrc,
  photoAlt = DEFAULTS.photoAlt,
  watermark = DEFAULTS.watermark,
  offerLabel = DEFAULTS.offerLabel,
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
      <HeroDesktop
        eyebrow={eyebrow}
        headlineLead={headlineLead}
        headlineAccent={headlineAccent}
        subcopy={subcopy}
        photoSrc={photoSrc}
        photoAlt={photoAlt}
        watermark={watermark}
        offerLabel={offerLabel}
        offers={offers}
      />
      <HeroMobile
        eyebrow={eyebrow}
        headlineLead={headlineLead}
        headlineAccent={headlineAccent}
        subcopy={subcopy}
        photoSrc={photoSrc}
        photoAlt={photoAlt}
        offerLabel={offerLabel}
        offers={offers}
      />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Desktop (lg+) — 1920-anchored layout.
// ---------------------------------------------------------------------------

type DesktopProps = Required<
  Pick<
    HeroSectionProps,
    | "eyebrow"
    | "headlineLead"
    | "headlineAccent"
    | "subcopy"
    | "photoSrc"
    | "photoAlt"
    | "watermark"
    | "offerLabel"
    | "offers"
  >
>;

function HeroDesktop({
  eyebrow,
  headlineLead,
  headlineAccent,
  subcopy,
  photoSrc,
  photoAlt,
  watermark,
  offerLabel,
  offers,
}: DesktopProps) {
  return (
    <div
      className={cn(
        "hero-1920",
        "relative hidden lg:block pt-[2rem]",
        "min-h-(--hero-min-h)",
      )}
    >
      <HeroWatermark text={watermark} />
      <HeroImage src={photoSrc} alt={photoAlt} />

      <div
        className={cn(
          "relative z-20",
          "pl-[12rem] pr-(--hero-gutter)",
          "pt-(--hero-text-pt) pb-12",
        )}
      >
        <HeroEyebrow text={eyebrow} />
        <HeroHeadline lead={headlineLead} accent={headlineAccent} />
        <HeroSubhead text={subcopy} />
        <HeroOfferRow label={offerLabel} offers={offers} />
      </div>
    </div>
  );
}

function HeroWatermark({ text }: { text: string }) {
  // Exact Figma spec (node 1:37): Fraunces 520px / 442px line-height (85%) /
  // -20.8px letter-spacing (-0.04em) / color #038F9F at 10% opacity.
  // Fraunces lacks Devanagari glyphs so the browser falls back to a system
  // Devanagari face — same behavior as Figma.
  return (
    <span
      aria-hidden
      lang="hi"
      className={cn(
        "pointer-events-none absolute z-0 select-none whitespace-nowrap",
        "left-(--hero-watermark-x) top-[10rem]",
        "font-normal not-italic",
        "leading-[0.85] tracking-[-0.04em]",
        "text-(length:--hero-watermark-w)",
        "text-(--color-brand-teal) opacity-10",
      )}
      style={{
        fontFamily: 'Fraunces, "Noto Sans Devanagari", system-ui, sans-serif',
      }}
    >
      {text}
    </span>
  );
}

function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-10",
        "-bottom-18 -right-32",
        " h-[80vh] w-[80vw] ",
      )}
    >
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="vw"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}

function HeroEyebrow({ text }: { text: string }) {
  return (
    <p
      className={cn(
        "uppercase whitespace-nowrap font-semibold text-xs",
        "text-hero-eyebrow",
        "text-(--color-text-brand-emerald)",
      )}
    >
      {text}
    </p>
  );
}

function HeroHeadline({ lead, accent }: { lead: string; accent: string }) {
  return (
    <h1
      className={cn(
        "mt-[1.46vw]",                       // 28 / 1920
        "max-w-(--hero-headline-w)",
        "font-heading text-hero-headline",
      )}
    >
      <span className="text-text-primary">{lead}</span>
      <br/>
      <span className="text-text-brand">{accent}</span>
    </h1>
  );
}

function HeroSubhead({ text }: { text: string }) {
  return (
    <p
      className={cn(
        "mt-[1.30vw]",                       // 25 / 1920
        "max-w-(--hero-sub-w)",
        "text-hero-sub",
        "text-(--color-text-subdued)",
      )}
    >
      {text}
    </p>
  );
}

function HeroOfferRow({
  label,
  offers,
}: {
  label: string;
  offers: HeroOfferChip[];
}) {
  return (
    <div className="relative z-30 mt-24">
      <p
        className={cn(
          "mb-4 uppercase",
          "text-xs font-semibold",
          "text-(--color-text-brand-emerald)",
        )}
      >
        {label}
      </p>
      <ul
        className={cn(
          "grid grid-cols-4",
          "gap-(--hero-chips-gap)",
          "max-w-(--hero-chips-max-w)",
        )}
      >
        {offers.map((offer) => (
          <li key={offer.label}>
            <HeroOfferChipCard offer={offer} variant="desktop" />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile / tablet (< lg) — stacked flow, tokens compressed by --u-text.
// ---------------------------------------------------------------------------

type MobileProps = Omit<DesktopProps, "watermark">;

function HeroMobile({
  eyebrow,
  headlineLead,
  headlineAccent,
  subcopy,
  photoSrc,
  photoAlt,
  offerLabel,
  offers,
}: MobileProps) {
  return (
    <div className="relative lg:hidden">
      <div
        className={cn(
          "mx-auto w-full max-w-[720px]",
          "px-5 sm:px-8",
          "pt-16 pb-10 sm:pt-20",
        )}
      >
        <p
          className={cn(
            "uppercase",
            "text-hero-eyebrow",
            "text-[color:var(--color-text-brand-emerald)]",
          )}
        >
          {eyebrow}
        </p>

        <h1
          className={cn(
            "mt-4 font-heading",
            "text-h5 leading-[1.15]",
            "sm:text-h4 sm:leading-[1.1]",
            "md:text-h3",
          )}
        >
          <span className="text-text-primary">{headlineLead}</span>
          <span className="text-text-brand">{headlineAccent}</span>
        </h1>

        <p
          className={cn(
            "mt-5",
            "text-subtext-1",
            "text-[color:var(--color-text-subdued)]",
          )}
        >
          {subcopy}
        </p>

        <div className="relative mt-8 aspect-[4/5] w-full overflow-hidden rounded-[24px]">
          <Image
            src={photoSrc}
            alt={photoAlt}
            fill
            priority 
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="mt-10">
          <p
            className={cn(
              "mb-4 uppercase",
              "text-hero-eyebrow",
              "text-[color:var(--color-text-brand-emerald)]",
            )}
          >
            {offerLabel}
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {offers.map((offer) => (
              <li key={offer.label}>
                <HeroOfferChipCard offer={offer} variant="mobile" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Offer chip — matches Figma workshop card (node 1:611): rounded white card
// with eyebrow + title and a 44px circular arrow button.
// ---------------------------------------------------------------------------

function HeroOfferChipCard({
  offer,
  variant,
}: {
  offer: HeroOfferChip;
  variant: "desktop" | "mobile";
}) {
  const isDesktop = variant === "desktop";

  return (
    <Link
      href={offer.href}
      className={cn(
        // layout
        "group flex items-center justify-between gap-3",
        isDesktop
          ? "h-[var(--hero-chip-h)] min-h-[80px] px-[var(--hero-chip-px)]"
          : "min-h-[88px] px-[22px] py-3",
        // shape + surface
        "rounded-[1.3rem]",
        "bg-surface-1 border border-[color:rgba(123,123,123,0.20)]",
        "shadow-[var(--shadow-chip)]",
        // motion
        "transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.18)]",
        // focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
      )}
    >
      <div className="flex min-w-0 flex-col gap-[2px]">
        <span
          className={cn(
            "uppercase whitespace-nowrap font-semibold text-sm",
            isDesktop ? "text-hero-chip-eyebrow" : "text-hero-eyebrow",
            "text-[color:var(--color-text-brand-emerald)]",
          )}
        >
          {offer.eyebrow}
        </span>
        <span
          className={cn(
            "text-text-primary text-[16px] font-semibold",
            isDesktop ? "text-hero-chip-title" : "text-subtext-3 leading-tight",
          )}
        >
          {offer.label}
        </span>
      </div>

      <span
        aria-hidden
        className={cn(
          "shrink-0 flex items-center justify-center rounded-full",
          isDesktop
            ? "w-[var(--hero-chip-btn)] h-[var(--hero-chip-btn)] min-w-[36px] min-h-[36px]"
            : "h-11 w-11",
          "text-text-inverse transition-transform duration-300",
          "group-hover:translate-x-0.5",
        )}
        style={{ backgroundColor: offer.buttonColor }}
      >
        <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
      </span>
    </Link>
  );
}
