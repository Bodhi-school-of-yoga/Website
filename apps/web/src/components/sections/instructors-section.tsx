// InstructorsSection — horizontal scroll of instructor profile cards on a course or program page.
import * as React from "react";

import { cn } from "@/lib/utils";
import { InstructorCard } from "@/components/ui/instructor-card";
import { ScrollNextButton } from "@/components/ui/scroll-next-button";

export type Instructor = {
  name: string;
  role: string;
  avatar: string;
};

export type InstructorsSectionProps = {
  eyebrow: string;
  heading: string;
  instructors: Instructor[];
  nextHref: string;
  className?: string;
};

export function InstructorsSection({
  eyebrow,
  heading,
  instructors,
  nextHref,
  className,
}: InstructorsSectionProps) {
  return (
    <section
      className={cn("w-full bg-surface-1 py-20 sm:py-24 lg:py-28", className)}
    >
      <div className="mx-auto flex max-w-[1340px] flex-col gap-10 page-px lg:gap-12">
        <header className="flex flex-col gap-3">
          <p className="text-mini uppercase text-text-brand">{eyebrow}</p>
          <h2 className="font-heading text-h2 text-text-secondary">{heading}</h2>
        </header>

        <div className="flex items-end justify-between gap-4">
          <div className="overflow-x-auto">
            <ul className="flex gap-4 sm:gap-6">
              {instructors.map((instructor) => (
                <li key={instructor.name} className="shrink-0">
                  <InstructorCard
                    name={instructor.name}
                    role={instructor.role}
                    avatar={instructor.avatar}
                  />
                </li>
              ))}
            </ul>
          </div>

          <ScrollNextButton
            href={nextHref}
            ariaLabel="Next instructor"
            className="shrink-0"
          />
        </div>
      </div>
    </section>
  );
}
