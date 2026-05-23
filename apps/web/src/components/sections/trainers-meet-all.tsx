// TrainersMeetAll — full grid of all trainer profile cards on the Trainers page.
import * as React from "react";

import { cn } from "@/lib/utils";
import { TrainerCard } from "@/components/ui/trainer-card";

export type Trainer = {
  name: string;
  portrait: string;
};

export type TrainersMeetAllProps = {
  eyebrow?: string;
  title?: string;
  trainers?: Trainer[];
  className?: string;
};

const ROW: Trainer[] = [
  { name: "Muskan Jain", portrait: "/images/trainers/muskan-jain.png" },
  { name: "Swetanga nandan", portrait: "/images/trainers/swetangana-nandan.png" },
  { name: "Sneha Shankar", portrait: "/images/trainers/sneha-shankar.png" },
  { name: "VijayaRaghavan", portrait: "/images/trainers/vijayaraghavan.png" },
  { name: "Prajakta Jadhav", portrait: "/images/trainers/prajakta-jadhav.png" },
  { name: "Atheesh Kumar", portrait: "/images/trainers/atheesh-kumar.png" },
];

const DEFAULT_TRAINERS: Trainer[] = [...ROW, ...ROW];

export function TrainersMeetAll({
  eyebrow = "The Team",
  title = "Meet All Our Trainers",
  trainers = DEFAULT_TRAINERS,
  className,
}: TrainersMeetAllProps) {
  return (
    <section
      className={cn(
        "w-full bg-surface-1 page-px py-16 sm:py-20 lg:py-24",
        className,
      )}
    >
      <div className="mx-auto max-w-[1340px]">
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
              "text-h4 sm:text-h3 lg:text-[44px] lg:leading-[1.2]",
            )}
          >
            {title}
          </h2>
        </div>

        <div
          className={cn(
            "mt-10 grid gap-4 sm:gap-5",
            "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
          )}
        >
          {trainers.map((t, i) => (
            <TrainerCard key={`${t.name}-${i}`} name={t.name} portrait={t.portrait} />
          ))}
        </div>
      </div>
    </section>
  );
}
