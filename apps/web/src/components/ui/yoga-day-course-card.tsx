// YogaDayCourseCard — the International Yoga Day course card.
//
// Matches Figma node 691:1561 (Bodhi landing-page handoff): a white rounded-3xl
// card — image top, then title → price row (faint ₹ + bold amount + pink
// "50% off" badge + strikethrough original) → dot-separated meta → divider →
// instructor row ("JD" avatar + BY + name) → solid green "View Program" button.
//
// This is intentionally a campaign-specific card and NOT the shared ProgramCard
// (which is used on the home page + course routes and orders meta-before-price,
// hides the instructor, and uses a footer-reveal CTA). Building a dedicated card
// keeps the shared primitive untouched.
//
// The discount badge defaults to the central YOGA_DAY_OFFER config so every card
// on the page shows the same campaign discount. Tokens only, no inline hex.
//
// Motion: house hover-lift on the card + image zoom on group hover, and the CTA
// carries the cta-press-lift pattern. `motion-reduce:` guards all of it.

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Globe, Languages } from "lucide-react";

import { cn } from "@/lib/utils";

export type YogaDayCourseFeature = {
  icon?: React.ReactNode;
  label: string;
};

export type YogaDayCourseInstructor = {
  name: string;
  initials: string;
  avatar?: string;
};

export type YogaDayCourseCardProps = {
  title: string;
  /** Live/offer price, pre-formatted (verbatim Figma: "₹4,999"). */
  price: string;
  /** Strikethrough original, pre-formatted (verbatim Figma: "₹9,99"). */
  originalPrice?: string;
  /** Discount badge copy (e.g. "50% off"); omit to hide the badge. */
  discountLabel?: string;
  features: YogaDayCourseFeature[];
  instructor: YogaDayCourseInstructor;
  imageSrc: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Pass true for the first card to prioritise its image. */
  priority?: boolean;
  className?: string;
};

// Fallback meta icon when a feature doesn't carry its own.
function resolveFeatureIcon(label: string): React.ReactNode {
  if (/week|day|month|hour/i.test(label)) {
    return <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />;
  }
  if (/online|live|studio|offline/i.test(label)) {
    return <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />;
  }
  return <Languages className="h-3.5 w-3.5" strokeWidth={1.75} />;
}

// Render a formatted price with the currency symbol faint and the amount bold,
// matching the Figma price treatment (₹ at 50% opacity, 4,999 bold).
function PriceAmount({ value }: { value: string }) {
  const symbol = value.match(/^\D+/)?.[0] ?? "";
  const amount = value.slice(symbol.length);
  return (
    <span className="flex items-baseline font-heading leading-none text-text-secondary">
      <span className="text-[26px] font-normal opacity-50">{symbol}</span>
      <span className="text-[28px] font-extrabold tracking-tight">{amount}</span>
    </span>
  );
}

export function YogaDayCourseCard({
  title,
  price,
  originalPrice,
  discountLabel,
  features,
  instructor,
  imageSrc,
  imageAlt = "",
  ctaLabel = "View Program",
  ctaHref = "#",
  priority = false,
  className,
}: YogaDayCourseCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border-1 bg-surface-0",
        "shadow-card transition-[transform,box-shadow] duration-200 ease-in-out",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:transform-none",
        className,
      )}
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "412 / 234" }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:group-hover:transform-none"
          priority={priority}
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 px-6 pb-5 pt-6">
        {/* Title + price */}
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-h5 font-semibold leading-tight text-text-secondary">
            {title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <PriceAmount value={price} />
            {originalPrice && (
              <span className="font-sans text-[14px] text-text-secondary/50 line-through">
                {originalPrice}
              </span>
            )}
            {discountLabel && (
              <span className="ml-auto inline-flex items-center rounded bg-accent-pink/90 px-2 py-0.5 font-sans text-[12px] font-medium text-text-inverse">
                {discountLabel}
              </span>
            )}
          </div>
        </div>

        {/* Meta — dot-separated */}
        {features.length > 0 && (
          <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            {features.map((f, i) => (
              <React.Fragment key={`${f.label}-${i}`}>
                <li className="flex items-center gap-1.5 font-sans text-[12px] font-medium tracking-[0.12px] text-text-tertiary">
                  <span className="flex size-3.5 shrink-0 items-center justify-center text-brand-primary">
                    {f.icon ?? resolveFeatureIcon(f.label)}
                  </span>
                  <span className="whitespace-nowrap">{f.label}</span>
                </li>
                {i < features.length - 1 && (
                  <li
                    aria-hidden="true"
                    className="size-[3px] shrink-0 rounded-full bg-warm/50"
                  />
                )}
              </React.Fragment>
            ))}
          </ul>
        )}

        {/* Divider */}
        <div aria-hidden="true" className="h-px w-full bg-brand-primary/10" />

        {/* Instructor + CTA */}
        <div className="mt-auto flex flex-col gap-5 pt-1">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-2">
              {instructor.avatar ? (
                <Image
                  src={instructor.avatar}
                  alt={instructor.name}
                  width={40}
                  height={40}
                  className="size-full object-cover"
                />
              ) : (
                <span className="font-heading text-[13px] font-bold text-brand-primary">
                  {instructor.initials}
                </span>
              )}
            </span>
            <span className="flex flex-col">
              <span className="font-sans text-[10px] uppercase tracking-[0.8px] text-text-tertiary">
                By
              </span>
              <span className="font-sans text-[14px] font-medium text-text-secondary">
                {instructor.name}
              </span>
            </span>
          </div>

          <Link
            href={ctaHref}
            aria-label={`${ctaLabel}: ${title}`}
            className={cn(
              "group/cta inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border-1 bg-brand-primary px-6 py-3.5",
              "font-sans text-[13px] font-medium text-text-inverse",
              "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out",
              "motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] hover:brightness-105",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
            )}
          >
            <span>{ctaLabel}</span>
            <ArrowRight
              className="size-3.5 transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5 motion-reduce:transition-none motion-reduce:transform-none"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
