"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface CourseTab {
  label: string;
  sectionId: string;
}

export interface CourseTabBarProps {
  tabs: CourseTab[];
  className?: string;
}

export function CourseTabBar({ tabs, className }: CourseTabBarProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const barRef = React.useRef<HTMLDivElement>(null);

  // Track which section is in view
  React.useEffect(() => {
    const ids = tabs.map((t) => t.sectionId);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const idx = ids.indexOf(visible[0].target.id);
          if (idx !== -1) setActiveIndex(idx);
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [tabs]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    const el = document.getElementById(tabs[index].sectionId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={barRef}
      className={cn(
        "sticky top-[72px] z-30 border-b border-border-1 bg-surface-0",
        className,
      )}
    >
      <div className="page-px mx-auto max-w-[1200px] py-3 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          aria-label="Course sections"
          className="inline-flex gap-1 sm:gap-2 rounded-full bg-surface-1 p-1 w-max"
        >
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={tab.sectionId}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleClick(index)}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-[13px] sm:px-5 sm:py-2 sm:text-[15px] font-medium transition-colors active:scale-[0.98] whitespace-nowrap",
                  isActive
                    ? "text-text-primary font-semibold"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="course-tab-active-indicator"
                    className="absolute inset-0 rounded-full bg-[#8FE0CF]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
