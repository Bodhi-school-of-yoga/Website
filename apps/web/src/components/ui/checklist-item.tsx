import * as React from "react";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface ChecklistItemProps {
  label: string;
  tone?: "pill" | "plain";
  className?: string;
}

function ChecklistItem({ label, tone = "pill", className }: ChecklistItemProps) {
  if (tone === "plain") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Check size={14} strokeWidth={3} className="shrink-0 text-brand-shade" />
        <span className="text-body-sm text-text-inverse">{label}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        "w-full rounded-[14px] border border-border-1 bg-surface-1 px-[17px] py-[14px]",
        "shadow-[0_1px_2px_rgba(0,0,0,0.02)]",
        className,
      )}
    >
      <span
        className={cn(
          "flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[11px]",
          "border border-brand-shade bg-brand-primary text-text-inverse",
        )}
      >
        <Check size={13} strokeWidth={3} />
      </span>
      <span className="text-body-sm text-text-secondary">{label}</span>
    </div>
  );
}

export { ChecklistItem };
