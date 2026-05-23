// TrainersMeetAll — "Meet our faculty" section with a responsive grid that scales the Figma
// mobile design: 1 col on mobile, 2 cols at sm, 3 cols at lg, 4 cols at xl.
import * as React from "react";

import { cn } from "@/lib/utils";
import { TrainerProfileCard } from "@/components/ui/trainer-profile-card";
import { facultyTrainers, type Trainer } from "@/data/trainers";

export type TrainersMeetAllProps = {
  eyebrow?: string;
  title?: string;
  trainers?: Trainer[];
  className?: string;
};

export function TrainersMeetAll({
  eyebrow = "MEET OUR FACULTY",
  title = "Teachers who walk the path.",
  trainers = facultyTrainers,
  className,
}: TrainersMeetAllProps) {
  return (
    <section
      className={cn(
        "w-full bg-surface-1 page-px py-14 sm:py-20 lg:py-24",
        className,
      )}
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <p
            className={cn(
              "text-mini font-medium uppercase text-text-tertiary",
              "tracking-[0.16em]",
            )}
          >
            {eyebrow}
          </p>
          <h2
            className={cn(
              "font-heading italic font-normal text-text-secondary",
              "text-[24px] leading-[1.15] sm:text-[32px] lg:text-[40px]",
              "max-w-[640px]",
            )}
          >
            {title}
          </h2>
        </div>

        <div
          className={cn(
            "mt-10 sm:mt-12 grid gap-4 sm:gap-5 lg:gap-6",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          )}
        >
          {trainers.map((t) => (
            <TrainerProfileCard
              key={t.slug}
              name={t.name}
              role={t.role}
              years={t.years}
              city={t.city}
              image={t.image}
              slug={t.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
