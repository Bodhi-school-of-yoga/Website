import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ChecklistItem } from "@/components/ui/checklist-item";

export type EligibilitySectionProps = {
  eyebrow: string;
  heading: string;
  image: string;
  items: string[];
  className?: string;
};

export function EligibilitySection({
  eyebrow,
  heading,
  image,
  items,
  className,
}: EligibilitySectionProps) {
  return (
    <section
      className={cn(
        "w-full bg-background py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-[1340px] page-px">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left: instructor portrait */}
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-lg",
              "aspect-[3/4] bg-surface-1",
              "lg:w-[44%] lg:max-w-[520px] lg:shrink-0",
            )}
          >
            <Image
              src={image}
              alt={heading}
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover"
            />
          </div>

          {/* Right: heading + checklist */}
          <div className="flex flex-1 flex-col gap-8">
            <header className="flex flex-col gap-4">
              <p className="text-mini font-heading uppercase tracking-widest text-text-brand">
                {eyebrow}
              </p>
              <h2 className="font-heading text-h2 font-semibold text-text-secondary">
                {heading}
              </h2>
            </header>

            <ul className="flex flex-col gap-3">
              {items.map((item, index) => (
                <li key={index}>
                  <ChecklistItem label={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
