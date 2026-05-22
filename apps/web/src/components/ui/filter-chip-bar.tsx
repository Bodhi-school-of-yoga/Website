"use client";

import * as React from "react";

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
        "inline-flex gap-2 rounded-full bg-surface-2 p-1",
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
              "rounded-full px-4 py-1.5 text-mini uppercase tracking-wide transition-colors",
              isActive
                ? "bg-brand-primary text-text-inverse"
                : "bg-transparent text-text-secondary hover:text-text-primary",
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export { FilterChipBar };
