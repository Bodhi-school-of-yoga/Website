import * as React from "react";

import { cn } from "@/lib/utils";

export type HighlightCardProps = {
  icon: React.ReactNode;
  title: string;
  body: string;
  className?: string;
};

export function HighlightCard({ icon, title, body, className }: HighlightCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3.5 rounded-2xl border border-border-2 bg-surface-1",
        "px-5 py-5 shadow-card",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center",
          "size-[52px] rounded-2xl bg-brand-lite text-text-brand",
        )}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-0.5">
        <p className="font-heading text-[20px] font-bold text-text-secondary leading-snug">
          {title}
        </p>
        <p className="text-sm text-text-tertiary leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
}
