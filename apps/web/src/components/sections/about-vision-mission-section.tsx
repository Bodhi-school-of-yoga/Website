// AboutVisionMissionSection — side-by-side vision and mission cards on the About page.
import * as React from "react";

import { cn } from "@/lib/utils";

export type VisionMissionCard = {
  eyebrow: string;
  body: string | string[];
};

export type AboutVisionMissionSectionProps = {
  vision?: VisionMissionCard;
  mission?: VisionMissionCard;
  className?: string;
};

const DEFAULT_VISION: VisionMissionCard = {
  eyebrow: "Our Vision",
  body:
    "A world where yoga is practised quietly, daily, by anyone — not as performance but as a craft for living well. We build the teachers and the spaces that make this possible.",
};

const DEFAULT_MISSION: VisionMissionCard = {
  eyebrow: "Our Mission",
  body:
    "To train, support, and gather teachers and students of practice to keep the lineage alive through honest study, careful teaching, and lasting community.",
};

export function AboutVisionMissionSection({
  vision = DEFAULT_VISION,
  mission = DEFAULT_MISSION,
  className,
}: AboutVisionMissionSectionProps) {
  return (
    <section
      id="vision"
      className={cn(
        "w-full bg-surface-1 py-12 sm:py-16 md:py-20 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-[1200px] page-px">
        <div
          className={cn(
            "grid grid-cols-1 gap-6",
            "lg:grid-cols-2 lg:gap-8",
          )}
        >
          <article
            className={cn(
              "flex flex-col justify-start gap-3 sm:gap-4 rounded-[20px] sm:rounded-[28px] bg-brand-teal p-6 sm:p-8 text-text-inverse",
              "lg:p-10",
            )}
          >
            <h2
              className={cn(
                "font-heading font-bold text-text-inverse",
                "text-[clamp(1.375rem,3vw+0.25rem,3.25rem)] leading-[1.2]",
              )}
            >
              {vision.eyebrow}
            </h2>
            {(Array.isArray(vision.body) ? vision.body : [vision.body]).map(
              (paragraph, idx) => (
                <p
                  key={idx}
                  className="text-body-md leading-relaxed text-text-inverse/85"
                >
                  {paragraph}
                </p>
              ),
            )}
          </article>

          <article
            className={cn(
              "flex flex-col justify-start gap-3 sm:gap-4 rounded-[20px] sm:rounded-[28px] border border-border-2 bg-brand-lite p-6 sm:p-8 text-text-primary",
              "lg:p-10",
            )}
          >
            <h2
              className={cn(
                "font-heading font-bold text-text-primary",
                "text-[clamp(1.375rem,3vw+0.25rem,3.25rem)] leading-[1.2]",
              )}
            >
              {mission.eyebrow}
            </h2>
            {(Array.isArray(mission.body) ? mission.body : [mission.body]).map(
              (paragraph, idx) => (
                <p
                  key={idx}
                  className="text-body-md leading-relaxed text-text-tertiary"
                >
                  {paragraph}
                </p>
              ),
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
