import * as React from "react";

import { cn } from "@/lib/utils";

interface StatTileProps {
  value: React.ReactNode;
  label: string;
  className?: string;
}

function StatTile({ value, label, className }: StatTileProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1",
        "w-[110px] h-[90px]",
        "bg-white border border-[#e2e2e2] rounded-[17px] opacity-[0.92]",
        "shrink-0",
        className
      )}
    >
      <span className="font-heading font-medium text-[25px] leading-none text-text-brand">
        {value}
      </span>
      <span className="font-heading font-medium text-[11px] uppercase tracking-[0.06em] text-[rgba(13,13,13,0.65)]">
        {label}
      </span>
    </div>
  );
}

export { StatTile };
