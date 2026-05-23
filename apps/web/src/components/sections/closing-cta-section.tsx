import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type ClosingCtaCard = {
  title: string;
  body: string;
  ctaLabel: string;
  href: string;
};

export type ClosingCtaTheme = "dark" | "light";

export type ClosingCtaSectionProps = {
  eyebrow?: string;
  /** Plain text shown before the italic accent (e.g. "Begin where"). */
  headingLead: string;
  /** Italic mint accent fragment at the end of the heading (e.g. "you are."). */
  headingAccent: string;
  subhead: string;
  primaryCta: { label: string; href: string };
  /** Optional 3-up cards below the CTA. */
  cards?: ClosingCtaCard[];
  /** Visual theme. `dark` (default): white text on brand-dark. `light`: dark text on mint-cream + white cards. */
  theme?: ClosingCtaTheme;
  className?: string;
};

export function ClosingCtaSection({
  eyebrow = "Bodhi",
  headingLead,
  headingAccent,
  subhead,
  primaryCta,
  cards,
  theme = "dark",
  className,
}: ClosingCtaSectionProps) {
  const showCards = Array.isArray(cards) && cards.length > 0;
  const isLight = theme === "light";

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden nav-px",
        "pt-14 sm:pt-20 lg:pt-28",
        showCards ? "pb-16 sm:pb-20 lg:pb-24" : "pb-12 sm:pb-16 lg:pb-20",
        isLight ? "bg-mint-cream text-text-secondary" : "bg-brand-dark text-text-inverse",
        className,
      )}
    >
      <div className="mx-auto max-w-[1240px] text-center">
        {eyebrow && (
          <p
            className={cn(
              "font-heading italic font-light leading-none",
              "text-[20px] sm:text-[24px] lg:text-[32px]",
              isLight ? "text-text-secondary" : "text-text-inverse",
            )}
          >
            {eyebrow}
          </p>
        )}

        <h2
          className={cn(
            "mt-3 sm:mt-[15px] font-heading font-normal leading-[1.1] tracking-tight",
            "text-[40px] sm:text-[64px] md:text-[80px] lg:text-[90px]",
            isLight ? "text-text-secondary" : "text-text-inverse",
          )}
        >
          {headingLead}{" "}
          <span
            className={cn(
              "font-heading italic font-light",
              isLight ? "text-brand-mid" : "text-brand-shade",
            )}
          >
            {headingAccent}
          </span>
        </h2>

        <p
          className={cn(
            "mx-auto mt-5 sm:mt-6 max-w-3xl text-balance leading-snug",
            "text-[15px] sm:text-[16px] md:text-subtext-2",
            isLight ? "text-text-tertiary" : "text-text-inverse/65",
          )}
        >
          {subhead}
        </p>

        <div className="mt-7 sm:mt-8">
          <Link
            href={primaryCta.href}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full",
              "font-semibold tracking-[0.28px]",
              "px-[22px] py-[13px] text-[13.5px]",
              "sm:px-[23px] sm:py-[15px] sm:text-[14px]",
              "transition-all duration-200",
              isLight
                ? "bg-brand-mid text-text-inverse hover:brightness-105 hover:shadow-[0_12px_36px_-12px_rgba(39,175,145,0.45)] focus-visible:ring-brand-mid focus-visible:ring-offset-mint-cream"
                : "bg-brand-shade text-brand-dark hover:brightness-105 hover:shadow-[0_12px_36px_-12px_rgba(142,224,206,0.55)] focus-visible:ring-brand-shade focus-visible:ring-offset-brand-dark",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            )}
          >
            {primaryCta.label}
          </Link>
        </div>
      </div>

      {showCards && (
        <div className="mx-auto mt-16 grid max-w-6xl gap-5 sm:mt-20 md:grid-cols-3">
          {cards!.map((card) => (
            <article
              key={card.title}
              className={cn(
                "group/cta-card flex h-full flex-col justify-between gap-8 p-7 rounded-[2rem]",
                "transition-colors duration-300",
                isLight
                  ? "border border-[rgba(126,126,126,0.18)] bg-surface-1 hover:bg-surface-0"
                  : "border border-text-inverse/[0.12] bg-text-inverse/[0.10] backdrop-blur-sm hover:bg-text-inverse/[0.14]",
              )}
            >
              <div className="space-y-3">
                <h3
                  className={cn(
                    "font-heading text-subtext-3 leading-tight",
                    isLight ? "text-text-secondary" : "text-text-inverse",
                  )}
                >
                  {card.title}
                </h3>
                <p
                  className={cn(
                    "text-body-md",
                    isLight ? "text-text-tertiary" : "text-text-inverse/65",
                  )}
                >
                  {card.body}
                </p>
              </div>

              <Link
                href={card.href}
                className={cn(
                  "inline-flex w-fit items-center gap-1.5 rounded-full px-5 py-2.5",
                  "text-body-sm font-semibold",
                  "transition-transform duration-200 group-hover/cta-card:translate-x-0.5",
                  isLight
                    ? "bg-mint-soft text-brand-green-deep focus-visible:ring-brand-mid focus-visible:ring-offset-mint-cream"
                    : "bg-surface-1 text-brand-green-deep focus-visible:ring-surface-1 focus-visible:ring-offset-brand-dark",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                )}
              >
                {card.ctaLabel}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
