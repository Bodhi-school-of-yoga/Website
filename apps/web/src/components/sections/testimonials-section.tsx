import * as React from "react";

import {
  TestimonialCard,
  type TestimonialCardProps,
} from "@/components/ui/testimonial-card";
import { cn } from "@/lib/utils";

export type TestimonialItem = Omit<
  TestimonialCardProps,
  "showDecorativeQuote" | "priority"
> & {
  id?: string;
};

export type TestimonialsSectionProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  testimonials: TestimonialItem[];
  className?: string;
  /** First-card avatar gets eager loading when above the fold. */
  priorityFirst?: boolean;
};

export function TestimonialsSection({
  eyebrow = "A Path to Wellness",
  heading,
  description,
  testimonials,
  className,
  priorityFirst = false,
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        "w-full bg-background py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl page-px">
        <header className="mx-auto mb-14 max-w-2xl text-center">
          {eyebrow && (
            <p className="text-mini uppercase text-text-brand">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 font-heading text-h4 sm:text-h3 lg:text-h2 text-text-secondary">
            {heading}
          </h2>
          {description && (
            <p className="mt-3 text-subtext-1 text-text-tertiary">
              {description}
            </p>
          )}
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={item.id ?? `${item.authorName}-${index}`}
              quote={item.quote}
              authorName={item.authorName}
              authorMeta={item.authorMeta}
              avatarSrc={item.avatarSrc}
              avatarAlt={item.avatarAlt}
              showDecorativeQuote={index > 0}
              priority={priorityFirst && index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
