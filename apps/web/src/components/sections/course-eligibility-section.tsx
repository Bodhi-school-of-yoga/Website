// CourseEligibilitySection — two-column layout: checklist on the left, image on the right.
import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ChecklistItem } from "@/components/ui/checklist-item";

export type CourseEligibilitySectionProps = {
  eyebrow: string;
  heading: string;
  items: string[];
  leftImage?: string;
  rightImage: string;
  leftImageAlt?: string;
  rightImageAlt?: string;
  className?: string;
};

export function CourseEligibilitySection({
  eyebrow,
  heading,
  items,
  rightImage,
  rightImageAlt = "",
  className,
}: CourseEligibilitySectionProps) {
  return (
    <section
      className={cn(
        "w-full bg-brand-lite py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-[1200px] page-px">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — eyebrow, heading, checklist */}
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-3">
              <p className="text-mini font-heading uppercase tracking-widest text-text-brand">
                {eyebrow}
              </p>
              <h2 className="font-heading text-h3 font-semibold text-text-secondary lg:text-h2">
                {heading}
              </h2>
            </header>

            <ul className="flex flex-col gap-[10px]">
              {items.map((item, index) => (
                <li key={index}>
                  <ChecklistItem label={item} />
                </li>
              ))}
            </ul>
          </div>

          {/* Right — image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:rounded-3xl">
            <Image
              src={rightImage}
              alt={rightImageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
