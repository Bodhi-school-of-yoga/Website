import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ChecklistItem } from "@/components/ui/checklist-item";

export type CourseEligibilitySectionProps = {
  eyebrow: string;
  heading: string;
  items: string[];
  leftImage: string;
  rightImage: string;
  leftImageAlt?: string;
  rightImageAlt?: string;
  className?: string;
};

export function CourseEligibilitySection({
  eyebrow,
  heading,
  items,
  leftImage,
  rightImage,
  leftImageAlt = "",
  rightImageAlt = "",
  className,
}: CourseEligibilitySectionProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-brand-lite py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 hidden h-[330px] w-[235px] -translate-y-1/2 rotate-[-6.81deg] overflow-hidden rounded-[18px] shadow-card lg:block xl:left-12"
      >
        <Image
          src={leftImage}
          alt={leftImageAlt}
          fill
          sizes="235px"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 hidden h-[355px] w-[273px] -translate-y-1/2 rotate-[6.5deg] overflow-hidden rounded-[16px] shadow-card lg:block xl:right-12"
      >
        <Image
          src={rightImage}
          alt={rightImageAlt}
          fill
          sizes="273px"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-[1340px] px-6 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[560px] flex-col items-center gap-8 text-center">
          <header className="flex flex-col items-center gap-4">
            <p className="text-mini font-heading uppercase tracking-widest text-text-brand">
              {eyebrow}
            </p>
            <h2 className="font-heading text-h2 font-semibold text-text-secondary">
              {heading}
            </h2>
          </header>

          <ul className="flex w-full flex-col gap-[10px]">
            {items.map((item, index) => (
              <li key={index}>
                <ChecklistItem label={item} className="text-left" />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:hidden">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] shadow-card">
            <Image
              src={leftImage}
              alt={leftImageAlt}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] shadow-card">
            <Image
              src={rightImage}
              alt={rightImageAlt}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
