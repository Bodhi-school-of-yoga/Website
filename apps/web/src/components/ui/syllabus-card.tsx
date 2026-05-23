// SyllabusCard — expandable card listing a module's lessons in the course syllabus section.

import * as React from "react";

import { cn } from "@/lib/utils";

interface SyllabusCardProps {
  title: string;
  body: string;
  n?: string;
  className?: string;
}

function SyllabusCard({ title, body, n, className }: SyllabusCardProps) {
  return (
    <div
      className={cn(
        "flex w-full shrink-0 flex-col gap-2 rounded-lg border border-border-2 bg-surface-1 p-5",
        "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg",
        className
      )}
      style={{ minHeight: "148px" }}
    >
      {n ? (
        <span className="text-mini uppercase tracking-widest text-text-brand">
          {n}
        </span>
      ) : null}
      <p className="font-heading text-h5 font-semibold text-foreground">
        {title}
      </p>
      <p className="font-heading text-subtext-1 text-text-tertiary">{body}</p>
    </div>
  );
}

export { SyllabusCard };
