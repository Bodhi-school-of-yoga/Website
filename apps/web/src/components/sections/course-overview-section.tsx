import * as React from "react";

import { cn } from "@/lib/utils";

export type CourseOverviewSectionProps = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  className?: string;
};

export function CourseOverviewSection({
  eyebrow,
  heading,
  paragraphs,
  className,
}: CourseOverviewSectionProps) {
  return (
    <section
      className={cn(
        "w-full bg-background py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1340px] flex-col gap-8 px-6 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-4">
          <p className="text-mini font-heading uppercase tracking-widest text-text-brand">
            {eyebrow}
          </p>
          <h2 className="font-heading text-h2 font-semibold text-text-secondary">
            {heading}
          </h2>
        </header>

        <div className="flex max-w-3xl flex-col gap-5">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-subtext-2 text-text-tertiary"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
