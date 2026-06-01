"use client";

// WorkshopsListSection — list of upcoming workshop cards with per-card scroll reveal.
import * as React from "react";

import {
  CourseCard,
  type CourseCardFeature,
  type CourseCardImage,
} from "@/components/ui/course-card";
import { RevealItem } from "@/components/ui/reveal-item";
import { cn } from "@/lib/utils";

export type WorkshopListItem = {
  id: string;
  image: CourseCardImage;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  taxNote?: string;
  features: CourseCardFeature[];
  startsCaption?: string;
  countdownTarget?: Date | string | number;
  countdownEyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
  cardHref?: string;
};

export type WorkshopsListSectionProps = {
  workshops: WorkshopListItem[];
  className?: string;
  /**
   * When true, the list pulls up to overlap the bottom of the preceding hero
   * band (matches Figma 1:3968 where the list container starts at y=435 inside
   * a 565-tall hero — a 130px overlap). The section becomes `relative` and
   * sits on top of the hero via z-index.
   */
  overlapHero?: boolean;
};

export function WorkshopsListSection({
  workshops,
  className,
  overlapHero = false,
}: WorkshopsListSectionProps) {
  return (
    <section
      className={cn(
        "w-full pb-12",
        overlapHero
          ? "relative z-10 -mt-20 sm:-mt-24 lg:-mt-[130px] bg-transparent"
          : "bg-surface-1 pt-12",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[30px] page-px">
        {workshops.map((workshop) => (
          <RevealItem key={workshop.id}>
            <CourseCard
              variant="course"
              image={workshop.image}
              title={workshop.title}
              description={workshop.description}
              price={workshop.price}
              originalPrice={workshop.originalPrice}
              taxNote={workshop.taxNote}
              features={workshop.features}
              startsCaption={workshop.startsCaption}
              countdownTarget={workshop.countdownTarget}
              countdownEyebrow={workshop.countdownEyebrow}
              ctaLabel={workshop.ctaLabel ?? "Book spot now"}
              ctaHref={workshop.ctaHref}
              cardHref={workshop.cardHref}
              className="w-full max-w-[1308px] mx-auto"
            />
          </RevealItem>
        ))}
      </div>
    </section>
  );
}
