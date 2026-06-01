"use client";

// YogaPosesListSection — filterable grid of yoga-pose cards for /yoga-poses.
// Category filtering re-mounts the visible cards with a tw-animate-css
// `animate-in` entrance (CSS-driven) so newly shown tiles always animate —
// framer whileInView would strand re-filtered items at opacity 0.
import * as React from "react";

import { PoseCard } from "@/components/ui/pose-card";
import { cn } from "@/lib/utils";
import {
  type PoseCategory,
  type YogaPose,
  getCategoryLabel,
  posePath,
} from "@/data/yoga-poses";

export type YogaPosesListSectionProps = {
  poses: YogaPose[];
  categories: PoseCategory[];
  className?: string;
  /** Pull the grid up to overlap the bottom of the preceding hero band. */
  overlapHero?: boolean;
};

const ALL = "all";

export function YogaPosesListSection({
  poses,
  categories,
  className,
  overlapHero = false,
}: YogaPosesListSectionProps) {
  const [active, setActive] = React.useState<string>(ALL);

  // Honour a `#category-slug` hash (e.g. from a detail-page breadcrumb) so the
  // matching category is pre-selected on arrival.
  React.useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && categories.some((c) => c.slug === hash)) setActive(hash);
  }, [categories]);

  const filtered =
    active === ALL ? poses : poses.filter((p) => p.categorySlug === active);

  const tabs = [{ slug: ALL, label: "All Poses" }, ...categories.map((c) => ({
    slug: c.slug,
    label: c.label,
  }))];

  return (
    <section
      className={cn(
        "w-full pb-20",
        overlapHero
          ? "relative z-10 -mt-20 sm:-mt-24 lg:-mt-[120px] bg-transparent"
          : "bg-surface-1 pt-12",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 page-px">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const isActive = tab.slug === active;
            return (
              <button
                key={tab.slug}
                type="button"
                onClick={() => setActive(tab.slug)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full border px-5 py-2 text-body-sm font-semibold transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
                  isActive
                    ? "border-brand-primary bg-brand-primary text-text-inverse"
                    : "border-border-3 bg-surface-1 text-text-secondary hover:border-brand-primary hover:text-text-brand",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          // `key` re-mounts the grid on filter change so every visible card
          // replays its entrance animation.
          key={active}
          className="grid grid-cols-1 gap-[26px] sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((pose, i) => (
            <div
              key={pose.slug}
              className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500"
              style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
            >
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
