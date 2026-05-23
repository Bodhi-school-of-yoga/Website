"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type CourseSectionNavItem = {
  label: string;
  href: string;
  active?: boolean;
};

export type CourseSectionNavProps = {
  items: CourseSectionNavItem[];
  className?: string;
};

export function CourseSectionNav({ items, className }: CourseSectionNavProps) {
  const [activeHref, setActiveHref] = React.useState<string | null>(() => {
    const initial = items.find((item) => item.active);
    return initial?.href ?? items[0]?.href ?? null;
  });

  React.useEffect(() => {
    const targets = items
      .map((item) => {
        if (!item.href.startsWith("#")) return null;
        const id = item.href.slice(1);
        const el = typeof document !== "undefined" ? document.getElementById(id) : null;
        return el ? { href: item.href, el } : null;
      })
      .filter(
        (t): t is { href: string; el: HTMLElement } => t !== null,
      );

    if (targets.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;
          visibility.set(href, entry.intersectionRatio);
        }
        let bestHref: string | null = null;
        let bestRatio = -1;
        for (const [href, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestHref = href;
          }
        }
        if (bestHref && bestRatio > 0) setActiveHref(bestHref);
      },
      {
        rootMargin: "-160px 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const { el } of targets) observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      className={cn(
        "sticky top-[88px] z-30 w-full bg-surface-1/95 backdrop-blur",
        "border-b border-border-1",
        "sm:top-[92px]",
        className,
      )}
    >
      <ul className="mx-auto flex max-w-[1340px] items-center gap-8 overflow-x-auto page-px py-4 sm:gap-12 lg:gap-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap text-subtext-2 font-medium transition-colors",
                  isActive
                    ? "rounded-[29px] bg-brand-shade px-5 py-2.5 text-brand-teal-deep"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
