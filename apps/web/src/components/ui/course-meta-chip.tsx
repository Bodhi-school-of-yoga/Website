// CourseMetaChip — compact inline pill showing a course metadata item (duration, level, language, etc.).

import * as React from "react";

import { cn } from "@/lib/utils";

interface CourseMetaChipProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

function CourseMetaChip({ icon, label, className }: CourseMetaChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        "px-3.5 py-1.5 rounded-full",
        "bg-surface-2 border border-border-1/40",
        "[&_svg]:h-[18px] [&_svg]:w-[18px] [&_svg]:shrink-0",
        className,
      )}
    >
      <span className="text-text-brand">{icon}</span>
      <span className="font-sans font-medium text-body-sm text-text-secondary whitespace-nowrap">
        {label}
      </span>
    </span>
  );
}

export { CourseMetaChip };
