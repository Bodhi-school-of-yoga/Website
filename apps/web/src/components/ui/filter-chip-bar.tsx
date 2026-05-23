"use client";

// FilterChipBar — horizontal scrollable row of filter chips with animated active indicator.

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface FilterChipBarProps {
  tabs?: string[];
  activeIndex?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}

const DEFAULT_TABS = ["All", "Online", "Offline"];

function FilterChipBar({
  tabs = DEFAULT_TABS,
  activeIndex,
  defaultIndex = 0,
  onChange,
  className,
}: FilterChipBarProps) {
  const isControlled = activeIndex !== undefined;
  const [internalIndex, setInternalIndex] = React.useState(defaultIndex);
  const currentIndex = isControlled ? activeIndex : internalIndex;

  const handleClick = (index: number) => {
    if (!isControlled) {
      setInternalIndex(index);
    }
    onChange?.(index);
  };

  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex gap-2 rounded-full bg-surface-1 p-1",
        className,
      )}
    >
      {tabs.map((tab, index) => {
        const isActive = index === currentIndex;
        return (
          <button
            key={`${tab}-${index}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleClick(index)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-mini uppercase tracking-wide transition-transform transition-colors active:scale-[0.98]",
              isActive
                ? "text-text-primary"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="video-filter-active-indicator"
                className="absolute inset-0 bg-surface-2 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : null}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}

export { FilterChipBar };
