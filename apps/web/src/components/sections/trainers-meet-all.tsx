// TrainersMeetAll — "Meet All Our Trainers" grid matching the Figma design:
// white card with thin border, circular portrait, name centered below.
import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { trainers as defaultTrainers, type Trainer } from "@/data/trainers";

export type TrainersMeetAllProps = {
  eyebrow?: string;
  title?: string;
  trainers?: Trainer[];
  className?: string;
};

export function TrainersMeetAll({
  eyebrow = "The Team",
  title = "Meet All Our Trainers",
  trainers = defaultTrainers,
  className,
}: TrainersMeetAllProps) {
  return (
    <section
      className={cn(
        "w-full bg-surface-1 page-px py-14 sm:py-20 lg:py-24",
        className,
      )}
    >
      <div className="mx-auto max-w-[1413px]">
        <div className="flex flex-col gap-2">
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
              "text-h4 sm:text-h3 lg:text-[43px] lg:leading-[1.2]",
            )}
          >
            {title}
          </h2>
        </div>

        <div
          className={cn(
            "mt-10 sm:mt-12 grid gap-x-5 gap-y-7",
            "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7",
          )}
        >
          {trainers.map((t) => (
            <article
              key={t.slug}
              className={cn(
                "group flex flex-col items-center justify-start gap-5",
                "rounded-2xl border border-border-2 bg-surface-1",
                "px-4 py-5",
                "motion-safe:transition-all motion-safe:duration-200",
                "motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_36px_-22px_rgba(10,79,69,0.25)]",
              )}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-full border border-border-2">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 14vw"
                  className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="text-center text-[15px] font-semibold leading-tight text-text-secondary">
                {t.name}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
