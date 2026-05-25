// CurriculumSection — collapsible syllabus cards listing modules and topics for a course.
import * as React from "react";

import { cn } from "@/lib/utils";
import { SyllabusCard } from "@/components/ui/syllabus-card";
import { ScrollNextButton } from "@/components/ui/scroll-next-button";

export type CurriculumSectionProps = {
  eyebrow: string;
  heading: string;
  items: Array<{ title: string; body: string }>;
  nextHref: string;
  className?: string;
};

export function CurriculumSection({
  eyebrow,
  heading,
  items,
  nextHref,
  className,
}: CurriculumSectionProps) {
  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-[1340px] page-px">
        <header className="mb-10 flex flex-col gap-4">
          <p className="font-heading text-mini uppercase tracking-widest text-text-brand">
            {eyebrow}
          </p>
          <h2 className="font-heading text-h2 font-semibold text-text-secondary">
            {heading}
          </h2>
        </header>

        <div className="flex items-end gap-6">
          <div className="min-w-0 flex-1 overflow-x-auto">
            <div className="flex gap-4 pb-2">
              {items.map((item, index) => (
                <SyllabusCard key={index} title={item.title} body={item.body} />
              ))}
            </div>
          </div>

          <ScrollNextButton
            href={nextHref}
            ariaLabel="Next syllabus item"
            className="mb-2 shrink-0"
          />
        </div>
      </div>
    </section>
  );
}
