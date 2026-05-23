import * as React from "react";

import { cn } from "@/lib/utils";

export type PillarItem = {
  title: string;
  body: string;
  iconLetter?: string;
};

export type AboutPillarsSectionProps = {
  eyebrow?: string;
  headlineWords?: string[];
  pillars?: PillarItem[];
  className?: string;
};

const DEFAULT_PILLARS: PillarItem[] = [
  {
    title: "Healing",
    body: "Therapeutic yoga rooted in tradition. Restore breath, body, and mind through guided practice.",
  },
  {
    title: "Expert",
    body: "Trained by master teachers with decades of practice. Every session grounded in lineage and craft.",
  },
  {
    title: "Community",
    body: "A global community of students and teachers across 15+ countries — practising daily, growing together.",
  },
];

const DEFAULT_HEADLINE_WORDS = ["Healing", "Expert", "Community"];

export function AboutPillarsSection({
  eyebrow = "A path to wellness",
  headlineWords = DEFAULT_HEADLINE_WORDS,
  pillars = DEFAULT_PILLARS,
  className,
}: AboutPillarsSectionProps) {
  return (
    <section
      id="pillars"
      className={cn(
        "w-full bg-surface-1 py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl page-px">
        <header className="mb-12 flex flex-col items-center gap-4 text-center lg:mb-16">
          <span className="text-mini uppercase tracking-wide text-text-brand">
            {eyebrow}
          </span>
          <h2
            className={cn(
              "font-heading text-text-primary",
              "text-h4 sm:text-h3 lg:text-h2 2xl:text-h1",
            )}
          >
            {headlineWords.map((word, index) => (
              <React.Fragment key={`${word}-${index}`}>
                {word}
                <span className="text-text-brand">.</span>
                {index < headlineWords.length - 1 ? " " : null}
              </React.Fragment>
            ))}
          </h2>
        </header>

        <ul
          className={cn(
            "grid grid-cols-1 gap-6",
            "lg:grid-cols-3 lg:gap-8",
          )}
        >
          {pillars.map((pillar) => {
            const iconLetter = pillar.iconLetter ?? pillar.title.charAt(0);
            return (
              <li
                key={pillar.title}
                className={cn(
                  "flex flex-col gap-5 rounded-[28px] border border-border-2 bg-surface-1 p-7 shadow-card",
                  "sm:p-8",
                )}
              >
                <div
                  aria-hidden
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-brand-lite font-heading text-h5 text-text-brand"
                >
                  {iconLetter}
                </div>
                <h3 className="font-heading text-subtext-3 text-text-primary">
                  {pillar.title}
                </h3>
                <p className="text-body-sm text-text-tertiary">{pillar.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
