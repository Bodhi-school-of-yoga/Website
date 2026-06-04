// TrainersDepartmentHeads — grid of department head profile cards on the Trainers page (desktop only).
import * as React from "react";

import { cn } from "@/lib/utils";
import {
  DepartmentHeadCard,
  type DepartmentHeadTone,
} from "@/components/ui/department-head-card";
import {
  departmentHeads,
  type DepartmentHead,
} from "@/data/department-heads";

export type TrainersDepartmentHeadsProps = {
  eyebrow?: string;
  title?: string;
  heads?: DepartmentHead[];
  className?: string;
};

const TONES: DepartmentHeadTone[] = ["mint", "dark", "lime"];

export function TrainersDepartmentHeads({
  eyebrow = "Leadership",
  title = "Core Team",
  heads = departmentHeads,
  className,
}: TrainersDepartmentHeadsProps) {
  return (
    <section
      className={cn(
        "w-full bg-surface-1 py-10 sm:py-14 md:py-16 lg:py-24",
        className,
      )}
    >
      <div className="mx-auto max-w-[1200px] page-px">
        <div className="flex flex-col gap-3">
          <p
            className={cn(
              "text-mini font-semibold uppercase",
              "text-text-teal-deep",
              "tracking-[0.16em]",
            )}
          >
            {eyebrow}
          </p>
          <h2
            className={cn(
              "font-heading font-bold text-text-secondary",
              "text-[clamp(1.375rem,3vw+0.25rem,2.75rem)] leading-[1.2]",
            )}
          >
            {title}
          </h2>
        </div>

        <div
          className={cn(
            "mt-8 sm:mt-10 grid gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12",
            "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
          )}
        >
          {heads.map((h, i) => (
            <DepartmentHeadCard
              key={h.slug}
              name={h.name}
              role={h.role}
              portrait={h.image}
              portraitAlt={h.name}
              tone={TONES[i % TONES.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
