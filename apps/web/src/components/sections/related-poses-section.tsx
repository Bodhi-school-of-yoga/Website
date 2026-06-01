// RelatedPosesSection — grid of related pose cards shown at the foot of a
// pose detail page.
import * as React from "react";

import { PoseCard } from "@/components/ui/pose-card";
import { RevealItem } from "@/components/ui/reveal-item";
import { cn } from "@/lib/utils";
import { type YogaPose, getCategoryLabel, posePath } from "@/data/yoga-poses";

export type RelatedPosesSectionProps = {
  poses: YogaPose[];
  className?: string;
};

export function RelatedPosesSection({ poses, className }: RelatedPosesSectionProps) {
  if (poses.length === 0) return null;

  return (
    <section className={cn("w-full bg-surface-2 py-16 lg:py-24", className)}>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 page-px">
        <div className="flex flex-col gap-3">
          <span className="text-mini uppercase tracking-widest text-text-brand">
            Keep Exploring
          </span>
          <h2 className="font-heading text-h2 text-text-primary">
            Related Poses
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
          {poses.map((pose) => (
            <RevealItem key={pose.slug}>
              <PoseCard
                href={posePath(pose)}
                name={pose.name}
                sanskrit={pose.sanskrit}
                categoryLabel={getCategoryLabel(pose.categorySlug)}
                categorySlug={pose.categorySlug}
                difficulty={pose.difficulty}
                image={pose.image}
                imageAlt={pose.name}
              />
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}
