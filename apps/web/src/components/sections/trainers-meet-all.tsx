// TrainersMeetAll — responsive trainers grid with breakpoint-specific headers and roster sizes.
// Mobile shows the 7 faculty trainers; md+ shows the full 18-trainer roster.
import * as React from "react";

import { cn } from "@/lib/utils";
import { TrainerProfileCard } from "@/components/ui/trainer-profile-card";
import {
  trainers as allTrainers,
  facultyTrainers,
  type Trainer,
} from "@/data/trainers";

export type TrainersMeetAllProps = {
  eyebrowMobile?: string;
  titleMobile?: string;
  eyebrowDesktop?: string;
  titleDesktop?: string;
  className?: string;
};

const titleClasses = cn(
  "font-heading italic font-normal text-text-secondary",
  "text-[24px] leading-[1.15] sm:text-[32px] lg:text-[40px]",
  "max-w-[640px]",
);

const eyebrowClasses = cn(
  "text-mini font-medium uppercase text-text-tertiary",
  "tracking-[0.16em]",
);

function renderCard(t: Trainer, variant: "card" | "avatar" = "card") {
  return (
    <TrainerProfileCard
      key={t.slug}
      variant={variant}
      name={t.name}
      role={t.role}
      years={t.years}
      city={t.city}
      image={t.image}
      slug={t.slug}
    />
  );
}

export function TrainersMeetAll({
  eyebrowMobile = "Meet our faculty",
  titleMobile = "Teachers who walk the path.",
  eyebrowDesktop = "The Team",
  titleDesktop = "Meet All Our Trainers",
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
        <div className="md:hidden flex flex-col items-center gap-3 text-center">
          <p className={eyebrowClasses}>{eyebrowMobile}</p>
          <h2 className={titleClasses}>{titleMobile}</h2>
        </div>

        <div className="hidden md:flex flex-col items-center gap-3 text-center">
          <p className={eyebrowClasses}>{eyebrowDesktop}</p>
          <h2 className={titleClasses}>{titleDesktop}</h2>
        </div>

        <div
          className={cn(
            "mt-10 sm:mt-12 grid gap-4 sm:gap-5",
            "grid-cols-1 sm:grid-cols-2 md:hidden",
          )}
        >
          {facultyTrainers.map((t) => renderCard(t, "card"))}
        </div>

        <div
          className={cn(
            "mt-10 sm:mt-12 hidden md:grid gap-4 sm:gap-5 lg:gap-6",
            "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
          )}
        >
          {allTrainers.map((t) => renderCard(t, "avatar"))}
        </div>
      </div>
    </section>
  );
}
