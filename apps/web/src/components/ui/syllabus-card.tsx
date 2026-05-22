import * as React from "react";

import { cn } from "@/lib/utils";

interface SyllabusCardProps {
  title: string;
  body: string;
  className?: string;
}

function SyllabusCard({ title, body, className }: SyllabusCardProps) {
  return (
    <div
      className={cn(
        "flex w-[294px] shrink-0 flex-col gap-2 rounded-lg border border-border-2 bg-surface-1 p-5",
        className
      )}
      style={{ minHeight: "148px" }}
    >
      <p className="font-heading text-h5 font-semibold text-foreground">
        {title}
      </p>
      <p className="font-heading text-subtext-1 text-text-tertiary">{body}</p>
    </div>
  );
}

export { SyllabusCard };
