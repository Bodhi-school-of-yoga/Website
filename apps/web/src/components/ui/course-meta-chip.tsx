import * as React from "react";

import { cn } from "@/lib/utils";

interface CourseMetaChipProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

function CourseMetaChip({ icon, label, className }: CourseMetaChipProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        "w-[110px] h-[104px]",
        "bg-surface-1 border border-border-3 rounded-[17px] opacity-[0.82]",
        "shrink-0",
        className
      )}
    >
      <span className="text-text-brand">{icon}</span>
      <span className="font-sans font-semibold text-body-sm text-text-secondary text-center px-2">
        {label}
      </span>
    </div>
  );
}

export { CourseMetaChip };
