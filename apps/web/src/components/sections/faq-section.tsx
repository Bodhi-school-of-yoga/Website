import * as React from "react";

import { cn } from "@/lib/utils";
import { FaqItem } from "@/components/ui/faq-item";

export type FaqItemData = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export type FaqSectionProps = {
  eyebrow: string;
  heading: string;
  items: FaqItemData[];
  className?: string;
};

export function FaqSection({ eyebrow, heading, items, className }: FaqSectionProps) {
  return (
    <section
      className={cn(
        "w-full bg-surface-0",
        "py-16 lg:py-24",
        className,
      )}
    >
      <div className="mx-auto max-w-4xl page-px">
        <div className="flex flex-col gap-3 mb-10">
          <p className="text-mini uppercase tracking-widest text-text-secondary">
            {eyebrow}
          </p>
          <h2 className="font-heading text-h2 text-text-primary">
            {heading}
          </h2>
        </div>

        <div>
          {items.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              defaultOpen={item.defaultOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
