// TrainersFounderSection — featured founder bio with portrait and narrative copy on the Trainers page (desktop only, ≥lg).
import * as React from "react";
import Image from "next/image";

import { founder } from "@/data/founder";
import { cn } from "@/lib/utils";

export type TrainersFounderSectionProps = {
  eyebrow?: string;
  name?: string;
  pullQuote?: string;
  paragraphs?: string[];
  portrait?: string;
  portraitAlt?: string;
  className?: string;
};

export function TrainersFounderSection({
  eyebrow = founder.eyebrow,
  name = founder.name,
  pullQuote = founder.pullQuote,
  paragraphs = founder.paragraphs,
  portrait = "/trainers/ashok-vankineni.png",
  portraitAlt = founder.portraitAlt,
  className,
}: TrainersFounderSectionProps) {
  return (
    <section
      className={cn(
        "hidden w-full bg-surface-1 page-px py-16 sm:py-20 lg:block lg:py-24",
        className,
      )}
    >
      <div
        className={cn(
          "relative mx-auto max-w-[1340px] overflow-hidden",
          "rounded-[24px] sm:rounded-[28px] lg:rounded-[36px]",
          "border border-border-3/40 bg-surface-1",
          "grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]",
        )}
      >
        <div className="flex flex-col gap-5 px-8 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <p
            className={cn(
              "text-mini font-semibold uppercase",
              "text-text-teal-deep",
              "tracking-[0.075em]",
            )}
          >
            {eyebrow}
          </p>

          <h2
            className={cn(
              "font-heading font-bold text-text-secondary",
              "text-h4 sm:text-h3 lg:text-[42px] lg:leading-[1.2]",
            )}
          >
            {name}
          </h2>

          <p
            className={cn(
              "text-subtext-1 text-brand-primary",
              "leading-[1.6]",
            )}
          >
            &ldquo;{pullQuote}&rdquo;
          </p>

          <div className="flex flex-col gap-4 text-body-md text-text-tertiary leading-[1.6]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="relative min-h-[320px] bg-brand-lite sm:min-h-[420px] lg:min-h-full">
          <Image
            src={portrait}
            alt={portraitAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
