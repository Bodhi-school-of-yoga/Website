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

export type ClosingCtaSectionProps = {
  eyebrow?: string;
  /** Plain text shown before the italic accent (e.g. "Begin where"). */
  headingLead: string;
  /** Italic mint accent fragment at the end of the heading (e.g. "you are."). */
  headingAccent: string;
  subhead: string;
  primaryCta: { label: string; href: string };
  cards: ClosingCtaCard[];
  className?: string;
};

export function ClosingCtaSection({
  eyebrow = "Bodhi",
  headingLead,
  headingAccent,
  subhead,
  primaryCta,
  cards,
  className,
}: ClosingCtaSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-brand-dark px-6 pb-20 pt-24 text-white",
        "sm:px-10 sm:pt-28 lg:px-16 lg:pb-24 lg:pt-32",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl text-center">
        {eyebrow && (
          <p className="font-serif text-subtext-3 italic text-white/90">
            {eyebrow}
          </p>
        )}

        <h2 className="mt-4 font-heading text-h4 sm:text-h3 lg:text-h2 2xl:text-h1">
          {headingLead}{" "}
          <span className="font-serif italic font-light text-brand-shade">
            {headingAccent}
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-balance text-subtext-1 text-white/70">
          {subhead}
        </p>

        <div className="mt-9">
          <Link
            href={primaryCta.href}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full",
              "bg-brand-shade px-7 py-3.5 text-body-md font-semibold",
              "text-brand-dark transition-all duration-200",
              "hover:brightness-105 hover:shadow-[0_12px_36px_-12px_rgba(142,224,206,0.55)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-shade focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark",
            )}
          >
            {primaryCta.label}
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-5 sm:mt-20 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className={cn(
              "group/cta-card flex h-full flex-col justify-between gap-8",
              "rounded-[2rem] border border-white/[0.12] bg-white/[0.10] p-7 backdrop-blur-sm",
              "transition-colors duration-300 hover:bg-white/[0.14]",
            )}
          >
            <div className="space-y-3">
              <h3 className="font-heading text-subtext-3 leading-tight text-white">
                {card.title}
              </h3>
              <p className="text-body-md text-white/65">{card.body}</p>
            </div>

            <Link
              href={card.href}
              className={cn(
                "inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2.5",
                "text-body-sm font-semibold text-brand-green-deep",
                "transition-transform duration-200 group-hover/cta-card:translate-x-0.5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark",
              )}
            >
              {card.ctaLabel}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
