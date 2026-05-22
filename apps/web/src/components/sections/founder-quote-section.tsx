import * as React from "react";

import { cn } from "@/lib/utils";

export type FounderQuoteSectionProps = {
  eyebrow?: string;
  quoteLead?: string;
  quoteAccent?: string;
  quoteTrail?: string;
  attribution?: string;
  paragraphs?: string[];
  className?: string;
};

const DEFAULT_PARAGRAPHS = [
  "Bodhi is built on a simple idea. Yoga is not a workout, a wellness trend, or a credential. It is a steady, repeatable practice that, over time, returns you to yourself.",
  "We teach in the lineage of classical hatha and ashtanga, with grounding in the Yoga Sūtras of Patañjali and the Haṭha Pradīpikā. Our teachers come from working practice — not just certification — and our students leave with a discipline they can carry into a class, a clinic, or a quiet morning at home.",
];

export function FounderQuoteSection({
  eyebrow = "Our practice",
  quoteLead = "The mat is a place to ",
  quoteAccent = "meet yourself ",
  quoteTrail = "honestly, daily, and without performance.",
  attribution = "— Acharya, founder",
  paragraphs = DEFAULT_PARAGRAPHS,
  className,
}: FounderQuoteSectionProps) {
  return (
    <section
      className={cn(
        "w-full bg-background py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-[1340px] gap-12 px-6 sm:px-8 lg:px-10",
          "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-24",
        )}
      >
        <div className="flex flex-col gap-6">
          <p className="text-mini uppercase text-text-brand">{eyebrow}</p>
          <blockquote className="flex flex-col gap-3">
            <p className="font-heading text-h4 text-brand-dark">
              <span>{quoteLead}</span>
              <span className="text-text-brand">{quoteAccent}</span>
              <span>{quoteTrail}</span>
            </p>
            <cite className="font-serif italic text-subtext-2 text-text-brand">
              {attribution}
            </cite>
          </blockquote>
        </div>

        <div className="flex flex-col gap-10 sm:gap-12 lg:max-w-[600px]">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-subtext-1 leading-[1.7] text-text-tertiary"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
